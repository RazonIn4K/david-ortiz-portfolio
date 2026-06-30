---
title: "Brute Force: Finding the One Successful Login in an IIS Log"
date: "2025-11-07"
competition: "National Cyber League, Fall 2025"
category: "Log Analysis"
difficulty: "Medium"
summary: "Thousands of IIS access-log lines hide one credential-stuffing source. The fail-then-success status pattern reveals which account fell and whether the attacker completed their goal."
tags: ["Forensics", "Log Analysis", "IIS", "Incident Response"]
---

> Source IP addresses and account names from the challenge data are redacted here. Flag format for this event was `SKY-XXXX-####`.

## The data

The artifact was an IIS web-server access log of roughly thirteen thousand lines covering a banking-style application. Somewhere in it, one source brute-forced a login and then acted on it.

## Reading authentication through status codes

Brute force has a shape in access logs. A single source IP produces a long run of failed attempts followed by the one that works:

- Repeated `401 Unauthorized` on the login endpoint: the guesses that failed.
- A `301`/redirect (or `200`) on the same endpoint from the same IP right after: the guess that succeeded and moved the session forward.

Isolating the noisiest source and watching its status sequence flip from `401` to a success response identifies both the attacker's IP and the account that finally fell:

```bash
# group requests to the login endpoint by source and inspect the status sequence
grep "/login" access.log | awk '{print $1, $9}' | sort | uniq -c | sort -rn
```

## Did they finish the job?

Identifying the compromised account is only half the incident. The follow-up question was whether a transfer actually completed. Tracing the authenticated session's later requests (the money-movement endpoints and their status codes) showed how far the attacker got after logging in, which is the part that matters for impact.

## Takeaways

- Auth brute force is a status-code story: many failures, then one success, from one source.
- `uniq -c | sort -rn` on the source-IP column surfaces the outlier fast; the timeline does the rest.
- Always finish the narrative: a successful login is the start of the incident, not the end. Follow the session to assess real impact.
