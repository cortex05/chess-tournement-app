---
mode: ask
description: "Use when you want a manual verification plan for localStorage-backed tournament flows, including creation, saved list, tournament reload, and persistence checks."
---

# Verify Local Tournament Flow

Create a concise manual verification plan for this repository's `localStorage`-backed tournament flow.

Focus on these behaviors:

1. Creating a new tournament from [src/screens/New/New.tsx](../../src/screens/New/New.tsx).
2. Confirming the saved tournament index key from [src/data/keys.ts](../../src/data/keys.ts) is updated correctly.
3. Confirming the tournament payload itself is stored under the uppercase tournament name key.
4. Opening the Saved screen at [src/screens/Saved/Saved.tsx](../../src/screens/Saved/Saved.tsx) and verifying the new tournament appears.
5. Opening the tournament route handled by [src/screens/Tournament/Tournament.tsx](../../src/screens/Tournament/Tournament.tsx) and verifying the tournament hydrates after a refresh.
6. Calling out any additional checks needed if the change touches FFA handling, match scoring, or roster/team structure.

When you answer:

- Tailor the checklist to the files or feature I mention, if any.
- Prefer actionable browser and app steps over generic testing advice.
- Include expected `localStorage` keys and values at a high level, not raw dumps unless I ask.
- Mention known risk areas from [AGENTS.md](../../AGENTS.md) when they are relevant.