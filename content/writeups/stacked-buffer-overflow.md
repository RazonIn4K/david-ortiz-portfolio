---
title: "Stacked: Static ELF Analysis and a Base64-Cookie Overflow"
date: "2025-11-05"
competition: "National Cyber League, Fall 2025"
category: "Reverse Engineering"
difficulty: "Medium"
summary: "Static analysis recovers an XOR-obfuscated flag and a length check that intentionally crashes the server to reveal it. The real puzzle is what 'number of A's' means once base64 is in the path."
tags: ["Reverse Engineering", "ELF", "Buffer Overflow", "XOR", "Base64"]
---

> Flags are redacted. Flag format for this event was `SKY-XXXX-####`.

## The target

A small HTTP server binary (`vuln-server`) authenticated requests with a base64 cookie and contained a buffer overflow in its `process_enc()` routine. The questions: what language is it, what input triggers the overflow, and what is the flag?

## Static analysis

The binary was not stripped, so symbols told the story:

```bash
file vuln-server          # ELF 64-bit, x86-64, dynamically linked, not stripped
nm vuln-server | grep -E "prepare_flag|handle_segv|process_enc"
```

The compiler marker (`GCC (Debian)`) plus C standard-library calls (`strcpy`, `strlen`, `printf`) and the absence of any C++ runtime symbols identified it as a **C** binary.

The flag was stored XOR-obfuscated in `.data` and decoded at runtime by `prepare_flag`, which XORs each byte with `0x55`:

```python
enc = bytes.fromhex("....")          # ENC_FLAG bytes from .data (redacted)
flag = bytes(b ^ 0x55 for b in enc)  # static recovery, no execution needed
```

## The overflow

Disassembling `process_enc` showed two paths gated by the decoded length:

- **< 128 bytes:** safe path, normal response.
- **>= 128 bytes:** an unchecked `strcpy` into an undersized buffer, immediately followed by an **intentional NULL dereference** that the registered `SIGSEGV` handler catches and uses to print the flag.

So the "exploit" is simply to reach the >= 128 branch.

## The actual trick

The question asked for the minimum number of "A" characters needed. The catch is the base64 layer:

- ASCII `'A'` is byte `0x41`.
- Base64 `'A'` decodes to the **value 0**.

The cookie value is base64, so typing `A` characters into the cookie produces zero bytes after decoding. 172 base64 `A`s decode to 129 zero bytes, which clears the `>= 128` check. The honest part of this solve was realizing my binary analysis was correct but my reading of the question was not, until I matched "A's" to the literal cookie text rather than the decoded payload.

## Takeaways

- Recover obfuscated constants statically before you ever run the target; a single XOR loop is faster to read than to trigger.
- Encoding boundaries change what "input" means. The same character is `0x41` or `0x00` depending on whether you are counting raw bytes or base64 text.
- Intentional crash-to-reveal handlers are common in challenge binaries; trace the signal handlers, not just `main`.
