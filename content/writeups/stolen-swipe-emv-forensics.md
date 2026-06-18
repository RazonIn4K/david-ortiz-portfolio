---
title: "Stolen Swipe: Spotting Magstripe Fraud in EMV and ATM Logs"
date: "2025-11-09"
competition: "National Cyber League — Fall 2025"
category: "Log Analysis"
difficulty: "Hard"
summary: "Correlating a chip log with an ATM log reconstructs full card numbers via the Luhn check digit, then EMV tag analysis separates legitimate chip use from fraudulent magstripe fallback and pinpoints where the fraud happened."
tags: ["Forensics", "Log Analysis", "EMV", "Luhn", "Fraud"]
---

> All cardholder names, account identifiers, and card numbers from the challenge data are redacted here. Flag format for this event was `SKY-XXXX-####`.

## The scenario

A card-skimming incident shipped with three artifacts: a customer list, an ATM transaction log, and an EMV chip log. The tasks were to reconstruct full card numbers, separate chip transactions from magstripe ones, and locate the fraudulent withdrawal.

## Reconstructing the card numbers

No single log held a complete Primary Account Number (PAN). The data was split:

1. The **EMV chip log** exposed the first 13 digits of each PAN.
2. The **ATM log** exposed the 14th and 15th digits.
3. Combining them gave 15 digits; the 16th is a **Luhn check digit**, the single value (0-9) that makes the whole number pass the mod-10 checksum.

```python
def luhn_check_digit(fifteen: str) -> int:
    s, parity = 0, len(fifteen) % 2
    for i, ch in enumerate(fifteen):
        d = int(ch)
        if i % 2 == parity:
            d *= 2
            if d > 9: d -= 9
        s += d
    return (10 - s % 10) % 10
```

Each reconstructed PAN was confirmed by validating the full 16 digits with Luhn. (Recovered values are not reproduced here.)

## Chip vs. magstripe

The fraud showed up as **magstripe fallback** on a chip card, which the EMV tags expose directly:

- Missing `9F36` (Application Transaction Counter): legitimate chip transactions always increment it; the suspect transactions had none.
- `AIP` value: chip transactions showed `0x3900`, while the fallback transactions showed `0x1800`.
- Authentication state: many of the suspect transactions were denied or flagged `INVALID_PIN`.

Those indicators isolated the victim card's fraudulent transactions from its normal activity.

## Locating the fraud

EMV stores the terminal's country in tag `9F1A`. The fraudulent record carried:

```
9F1A 02 0528
```

ISO 3166-1 numeric `528` is the **Netherlands**, which placed the withdrawal far from the cardholder's normal activity.

## Takeaways

- Reconstruction problems often hinge on a checksum. Luhn turns "15 known digits" into a single defensible answer.
- EMV tags are a forensic goldmine: `9F36`, `AIP`, and `9F1A` alone separate genuine chip use from skimmed fallback and geolocate the terminal.
- Correlating two partial logs beats trusting either one; the truth lived in the overlap.
