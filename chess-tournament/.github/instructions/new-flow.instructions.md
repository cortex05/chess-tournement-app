---
applyTo: "src/screens/New/**"
description: "Use when editing the new tournament creation flow, its three phases, roster setup, or tournament bootstrapping logic. Covers parent-owned state, phase transitions, and localStorage writes started from the New screen."
---

# New Tournament Flow

- The parent screen is [src/screens/New/New.tsx](../../src/screens/New/New.tsx). Keep creation state owned there unless the task clearly requires a different boundary.
- The flow is phase-driven with string states: `FIRST`, `SECOND`, `THIRD`. Preserve that contract unless you update all phase transitions together.
- [src/screens/New/PhaseOne/PhaseOne.tsx](../../src/screens/New/PhaseOne/PhaseOne.tsx) selects tournament type and title.
- [src/screens/New/PhaseTwo/PhaseTwo.tsx](../../src/screens/New/PhaseTwo/PhaseTwo.tsx) manages roster and team assignment.
- [src/screens/New/PhaseThree/PhaseThree.tsx](../../src/screens/New/PhaseThree/PhaseThree.tsx) is the persistence boundary for creating and storing the tournament.

## Data Rules

- Tournament names are converted to uppercase for storage keys, but the route navigation uses the original title string.
- The saved tournament index is stored separately under the key exported from [src/data/keys.ts](../../src/data/keys.ts).
- Team tournaments persist `teams`; FFA persists an empty `teams` array. Do not assume both modes share the same payload shape beyond the shared tournament model.
- Reuse the domain classes from [src/utilities/utilities.ts](../../src/utilities/utilities.ts) when constructing new tournament objects.

## Editing Guidance

- Prefer adding validation close to the phase where the data is entered rather than patching it later in PhaseThree.
- Keep props explicit and typed. This area already uses prop drilling; avoid introducing hidden cross-component state.
- If you change persistence behavior in PhaseThree, verify the Saved screen and Tournament screen still load the new data correctly.
- If you touch roster or team structures, check compatibility with [src/types/types.ts](../../src/types/types.ts) and score/match logic in [src/utilities/functions.ts](../../src/utilities/functions.ts).

## Risks To Watch

- Duplicate tournament names can collide because storage is keyed by uppercase name.
- PhaseThree appends to the saved tournament key list without deduplication.
- FFA behavior is less complete than team behavior; do not infer parity without checking downstream consumers.