---
title: "Uplink: From a scanf Overflow to system() via a Heap Task Overwrite"
date: "2026-06-13"
competition: "US Cyber Games, Season VI (2026)"
category: "Binary Exploitation"
difficulty: "100 pts"
summary: "Every modern mitigation is on, so control-flow hijacking is off the table. The path to system() is a data-only chain: an unbounded scanf corrupts a size field, which turns a later read() into a heap overwrite of the task the program is about to execute."
tags: ["Pwn", "Heap", "Buffer Overflow", "pwntools", "Ghidra"]
---

> Flag and live connection details are redacted. Exploitation was validated locally in a containerized replica.

## The binary

`checksec` on the provided ELF showed a fully hardened target:

```
Full RELRO · Stack canary · NX · PIE · SHSTK · IBT
```

That combination rules out the usual stack-smash-to-shellcode or simple return-address overwrite. The symbols were intact (`main_menu`, `run_diagnostics`, `view_telemetry`, ...) and the imports included `system`, `read`, `scanf`, and `malloc`, which hinted the intended path was **data corruption**, not control-flow hijack.

## The bug chain

Reversing `main_menu` in Ghidra revealed a stack layout where the operator callsign sits in a 16-byte buffer and a transmit size, `TX_SZ`, sits right after it at offset `+0x10`:

1. **Overwrite the size field.** Menu option 1 reads the callsign with an unbounded `scanf("%s")`. A 20-byte callsign overruns the 16-byte buffer and overwrites `TX_SZ`.
2. **Turn the bad size into a heap overflow.** `current_packet` is a `malloc(0x20)` heap buffer; `current_task` is the next relevant allocation. Menu option 3 uses the now-corrupted `TX_SZ` as the length for a `read()` into `current_packet`, so the oversized read spills out of the packet and overwrites `current_task`.
3. **Reach system().** `run_diagnostics` calls `system(current_task)` when an "enabled" flag at `current_task + 0x40` is non-zero. Shaping the overwrite so the task points at an attacker-controlled command with that flag set turns the diagnostic into command execution.

A `pwntools` script drives the menu in order (set oversized callsign, trigger the over-long read, fire diagnostics) and was validated against a local Docker/amd64 replica with a placeholder flag file.

## Takeaways

- Full mitigations do not mean "unexploitable." When canaries, NX, PIE, and CET block control-flow hijacking, look for **data-only** chains: corrupt a length, an index, a pointer, or a function argument.
- A one-field stack overflow (`scanf("%s")` into a size variable) became the primer for a heap overwrite two menu options later. Bugs compound across program state.
- Symbol-rich binaries reward reversing the data model, not just the call graph. The win here was understanding what `current_task` is and who calls `system()` on it.
