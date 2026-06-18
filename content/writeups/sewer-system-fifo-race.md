---
title: "Sewer System: Exploiting a SUID Binary Through a FIFO Race"
date: "2025-11-08"
competition: "National Cyber League — Fall 2025"
category: "Enumeration & Exploitation"
difficulty: "Hard"
summary: "A SUID binary reads a protected file and leaks it through a predictable named pipe in /tmp. Winning the read/write race recovers the data with no real exploit code."
tags: ["Linux", "Privilege Escalation", "SUID", "Race Condition", "IPC"]
---

> Flags are redacted. Flag format for this event was `SKY-XXXX-####`.

## The setup

The challenge handed over a shell on a host with one suspicious program: a binary that "reads a protected file in the root directory." The goal was to recover the contents of that file as an unprivileged user.

## Recon

A directory listing tells most of the story:

```
-rwsr-xr-x 1 admin admin 14576 Oct  1 17:07 chal
```

The `s` in `-rwsr-xr-x` is the **SUID bit**. The binary is owned by `admin`, so it runs with `admin`'s privileges no matter who launches it. Running it printed messages about a FIFO and a path under `/tmp`:

```
reading /flag.txt
... mkfifo ... /tmp/data ...
```

Static and dynamic analysis confirmed the behavior without needing a decompiler:

```bash
strings chal | grep -E "flag|tmp|fifo"
strace ./chal 2>&1 | grep -E "mkfifo|open|read|write"
```

The trace showed the program calling `mkfifo("/tmp/data", 0666)`, opening `/flag.txt` with elevated rights, and writing the contents into the pipe.

## The vulnerability

This is an insecure-IPC / TOCTOU pattern:

1. The SUID binary reads a file the unprivileged user cannot.
2. It writes that privileged data into a **named pipe (FIFO)** at a **predictable, world-accessible path** in `/tmp`.
3. Nothing restricts who may read from that pipe.

The privilege boundary is crossed the moment admin-owned data lands in a pipe any user can open.

## Exploitation

A FIFO blocks until both a writer and a reader are attached, so the trick is to be the reader already waiting when the binary writes:

```bash
rm -f /tmp/data        # clear any stale pipe
./chal &               # writer runs in the background as admin
cat /tmp/data          # reader is already attached; it catches the data
```

Pre-creating the FIFO yourself fails (the binary errors with `File exists`), and running the binary to completion first fails too (the data is gone before you read). The working move is to start the writer and immediately attach the reader.

## Takeaways

- A SUID program is only as safe as everything it touches. Reading a protected file is fine; relaying it through a world-readable pipe is the bug.
- When auditing SUID binaries, always ask: what files does it open, how does it talk to other processes, and is there a timing window between create and use?
- The challenge name was the hint: sewers are pipes, and pipes meant FIFOs.
