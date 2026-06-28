---
applyTo: "src/screens/Tournament/**"
description: "Use when editing the active tournament flow, round setup, match handling, tournament hydration from localStorage, or score display logic. Covers route-param loading, round state, and match update risks."
---

# Tournament Flow

- The entry point is [src/screens/Tournament/Tournament.tsx](../../src/screens/Tournament/Tournament.tsx).
- The route param `tourney` is read from the URL, uppercased for `localStorage` lookup, and used to hydrate the active tournament.
- `roundStart` controls whether the screen renders setup or active play.
- `matchHolder` is the per-round source of truth for rendered matches.
- `roundScore` is recalculated from persisted tournament data and updated during active round play.

## Structure

- [src/screens/Tournament/rounds/RoundSetUp/RoundSetUp.tsx](../../src/screens/Tournament/rounds/RoundSetUp/RoundSetUp.tsx) prepares pairings and transitions into active play.
- [src/screens/Tournament/rounds/RoundActive/RoundActive.tsx](../../src/screens/Tournament/rounds/RoundActive/RoundActive.tsx) executes the round and updates match outcomes.
- Match UI and modal logic live under [src/screens/Tournament/rounds/matches](../../src/screens/Tournament/rounds/matches).
- Shared player rendering for matches lives under [src/screens/Tournament/Players](../../src/screens/Tournament/Players).

## Editing Guidance

- Preserve the current hydration path unless the task explicitly changes persistence or routing.
- Treat FFA support as partial. Validate both FFA and TEAM assumptions before broad changes.
- Be careful with nested updates to player records. Match history logic in [src/utilities/functions.ts](../../src/utilities/functions.ts) currently mutates nested arrays.
- When modifying score or match behavior, verify the modal summary, round transitions, and refresh behavior from a saved tournament route.
- Prefer explicit null/undefined handling around loaded tournament data. This area currently assumes successful `localStorage` reads in several places.

## Risks To Watch

- A missing or malformed stored tournament can break `JSON.parse` or follow-up property access.
- Team score calculations assume exactly two teams with valid rosters.
- Changes to player shape or match shape can affect setup, active play, summary modal, and Saved preview flows at once.