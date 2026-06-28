# AGENTS.md

## Purpose

Use this file as the default operating guide for AI coding agents working in this repository. Keep edits minimal, preserve existing patterns, and prefer root-cause fixes over cosmetic refactors.

## Project Snapshot

- Stack: Vite, React, TypeScript, React Router, MUI, CSS Modules.
- Entry routes are defined in [src/App.tsx](src/App.tsx).
- Tournament data is modeled with classes in [src/utilities/utilities.ts](src/utilities/utilities.ts) and TypeScript interfaces in [src/types/types.ts](src/types/types.ts).
- Persistence is local-only via `localStorage` using the key exported from [src/data/keys.ts](src/data/keys.ts).

## Commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build production bundle: `npm run build`
- Run lint: `npm run lint`
- Preview build: `npm run preview`

## Required Setup

- Read [README.md](README.md) before first run.
- Fresh clones may require creating [src/data/keys.ts](src/data/keys.ts) with a `LOCAL_TOURNAMENTS_KEY` export if that file is not already present.

## Architecture

- [src/screens/Home/Home.tsx](src/screens/Home/Home.tsx): landing screen.
- [src/screens/New/New.tsx](src/screens/New/New.tsx): three-phase tournament creation flow.
- [src/screens/Saved/Saved.tsx](src/screens/Saved/Saved.tsx): saved tournaments from `localStorage`.
- [src/screens/Tournament/Tournament.tsx](src/screens/Tournament/Tournament.tsx): active tournament flow.

### Creation Flow

- Phase components live under [src/screens/New](src/screens/New).
- Parent state is owned by [src/screens/New/New.tsx](src/screens/New/New.tsx) and passed down via props.

### Tournament Flow

- Round setup and active-round components live under [src/screens/Tournament/rounds](src/screens/Tournament/rounds).
- Match display and modal logic live under [src/screens/Tournament/rounds/matches](src/screens/Tournament/rounds/matches).
- Shared player presentation lives under [src/screens/Tournament/Players](src/screens/Tournament/Players).

## Working Conventions

- Use co-located CSS Modules for component styling. Most components follow `Component.tsx` + `Component.module.css`.
- Prefer typed props and explicit interfaces; follow shapes from [src/types/types.ts](src/types/types.ts).
- Keep state local to screens/components. This app does not use Redux, Zustand, or React Context for app state.
- Reuse the existing class-based domain models from [src/utilities/utilities.ts](src/utilities/utilities.ts) instead of introducing parallel plain-object shapes unless the task requires migration.
- Preserve existing route structure and naming unless the task explicitly changes navigation.

## Editing Guidance

- Make focused changes. Do not restructure the app unless necessary for the task.
- Keep new UI work consistent with the current stack: MUI components plus CSS Modules.
- Avoid adding new dependencies unless there is a clear need.
- Run `npm run lint` after edits when practical. Run `npm run build` for changes that affect routing, types, or shared utilities.

## Known Pitfalls

- Tournament storage is keyed by tournament name, so renaming or duplicating names can affect retrieval behavior.
- Some tournament logic mutates nested player match data in [src/utilities/functions.ts](src/utilities/functions.ts). Be careful when changing this area; prefer immutable updates if you are already refactoring the logic.
- Free-for-all support appears incomplete compared with team tournaments. Validate assumptions before extending FFA behavior.
- There are no committed automated tests in this repository. Manual verification and lint/build checks matter more here.
- [src/components/Modals/Modal.tsx](src/components/Modals/Modal.tsx) is an outlier that uses inline styles; most new UI should still follow the CSS Module pattern.

## Useful Entry Points

- [README.md](README.md)
- [src/App.tsx](src/App.tsx)
- [src/screens/New/New.tsx](src/screens/New/New.tsx)
- [src/screens/Tournament/Tournament.tsx](src/screens/Tournament/Tournament.tsx)
- [src/utilities/functions.ts](src/utilities/functions.ts)
- [src/utilities/utilities.ts](src/utilities/utilities.ts)
- [src/types/types.ts](src/types/types.ts)

## Agent Behavior

- Prefer small, reviewable patches.
- Do not silently change stored data shapes.
- If you touch persistence or round logic, explain the behavioral impact clearly.
- If a task requires broader conventions for one area, add a scoped instruction file instead of bloating this document.