---
title: "Deno Finds a Way: Command Injection in a Compiled Deno Binary"
date: "2025-11-06"
competition: "National Cyber League — Fall 2025"
category: "Enumeration & Exploitation"
difficulty: "Easy"
summary: "A NOPASSWD sudo entry points at a Deno-compiled binary that embeds its own TypeScript source. The source concatenates user input straight into a shell command, so a single argument escalates to root."
tags: ["Linux", "Privilege Escalation", "Command Injection", "sudo", "Deno"]
---

> Flags are redacted. Flag format for this event was `SKY-XXXX-####`.

## Enumeration

The first thing to check on any Linux foothold is what you can run as someone else:

```bash
whoami      # demolicious
sudo -l     # (root) NOPASSWD: /usr/local/bin/searchFiles
```

A NOPASSWD sudo rule on a custom binary is a flashing light. The question is whether that binary can be coerced into doing something it should not.

## Binary analysis

`file` showed an ELF 64-bit PIE executable. The interesting part came from `strings`:

```bash
strings /usr/local/bin/searchFiles | less
```

Deno's "compile" feature bundles the script and runtime into a single executable, which means the **original TypeScript source is embedded in the binary**. Reading it revealed how user input was handled, and a first flag sat in a source comment.

## The vulnerability

The embedded source passed `Deno.args[0]` directly into a shell invocation with no sanitization, a textbook OS command injection (CWE-78):

```typescript
const input = Deno.args[0];
// input is concatenated into a bash command and executed
```

## Exploitation

Because the binary runs as root via sudo, terminating the intended command and chaining a new one reads anything:

```bash
sudo /usr/local/bin/searchFiles "flag.txt; cat /root/flag.txt"
```

The `;` ends the program's own command and the shell runs `cat /root/flag.txt` with root privileges.

## Takeaways

- "Compiled" does not mean "secret." Deno, Node (pkg/nexe), and PyInstaller binaries frequently carry their full source or bytecode inside; `strings` is step one.
- A NOPASSWD sudo entry on a custom binary should always be probed for injection and for the GTFOBins-style escapes the program might allow.
- The fix is the usual one: never build shell strings from untrusted input. Pass arguments as an array and avoid the shell entirely.
