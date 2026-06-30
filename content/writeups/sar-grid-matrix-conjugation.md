---
title: "SAR Grid: Breaking a Matrix-Conjugation Cipher over a Composite Modulus"
date: "2026-06-13"
competition: "US Cyber Games, Season VI (2026)"
category: "Cryptography"
difficulty: "100 pts"
summary: "A cipher hides each route as C = A⁻¹·M·A mod n. The training pairs leak a hidden prime factor through linear algebra, which collapses the problem from mod n to mod p and reveals the secret change of coordinates."
tags: ["Cryptography", "Linear Algebra", "Modular Arithmetic", "Python"]
---

> Flag redacted. This is a technique-focused write-up; no challenge flag value is reproduced.

## The cipher

Each route state was a 2x2 matrix mod `n`. Encryption applied a secret change of coordinates:

```
C = A⁻¹ · M · A  (mod n)
```

`A` is an unknown invertible 2x2 matrix. The archive provided **training routes** where both `M` and the ciphertext `C` were known; the live route was given only as encrypted matrices. Recover `A` (or enough of it), decrypt the live matrices, and read the flag out of them.

## The crack

Conjugation rearranges into a linear relation that removes the inverse:

```
C = A⁻¹ M A   →   A C = M A   →   M A − A C = 0
```

For each known `(M, C)` pair this is a homogeneous linear system in the four unknown entries of `A`, all taken **mod the composite `n`**. The key observation: solving that system over a composite modulus is where the structure leaks. Reducing the stacked equations to row echelon form produces **non-unit pivots**, and the GCDs they expose reveal a 256-bit prime factor `p` of `n`.

Once `p` is known, the whole problem simplifies:

1. Solve the nullspace of `M A − A C = 0` **mod p** to recover an invertible `A` mod p (the cofactor gives full rank).
2. Decrypt the live ciphertexts mod p instead of mod n: `M = A · C · A⁻¹ (mod p)`.
3. Each decrypted live matrix carries one 8-byte flag chunk in its top-left entry (`M[0][0]`), big-endian. Concatenating the chunks and truncating to the flag length reassembles the message.

The implementation is short with `numpy`/`sympy` for the modular linear algebra (matrix inverse mod p, nullspace, RREF), and the solver is reproducible end to end.

## Takeaways

- Conjugation ciphers look intimidating but linearize cleanly: moving the inverse to the other side turns `A⁻¹MA` into a solvable linear system.
- A composite modulus is a liability. The act of row-reducing over `n` surfaced a factor, and factoring the modulus collapsed the search from mod n to mod p.
- When the plaintext is structured (fixed-size chunks in a known matrix position), the last mile is just bookkeeping: decrypt, slice, concatenate, truncate.
