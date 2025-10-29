# CMPM 121 Counter App — Analysis & Refactor Report

This document explains what I found in `src/main.ts`, why those issues are
considered **code smells**, and how I refactored the code while preserving the original behavior.

## Summary of Original Behavior

- Renders a simple counter UI with **Increment**, **Decrement**, and **Reset** buttons.
- Displays the current count in a `<span id="counter">`.
- Sets the document title to `Clicked N` after updates.
- Changes the page background color based on parity of the count:
  - odd → `pink`
  - even → `lightblue`

## Code Smells Identified

1. **Unclear / cryptic names**
   - Variables like `c`, `a`, `b`, and `h` obscure intent.
2. **Magic strings / numbers**
   - Raw ids like `"increment"`, `"counter"`, and `"dec"` were scattered,
     as were string literals for colors and titles.
3. **Duplicated update logic**
   - Each button handler re‑implemented the same steps: update count, update text,
     update title, update background.
4. **Global mutable state**
   - Counter `c` lived as a global, increasing coupling and making testing harder.
5. **Mixed responsibilities (UI creation + update logic interleaved)**
   - Markup generation, event binding, and rendering were blended, making the program
     harder to read and extend.

## Refactoring Patterns Applied (Fowler)

- **Rename Variable**\
  Replaced `c`, `a`, `b`, `h` with descriptive names (`state.count`, `IDS.increment`, etc.).\
  _Benefit:_ readability and maintainability.

- **Replace Magic Number/Strings with Named Constants**\
  Introduced `PROJECT_TITLE` and an `IDS` map for DOM ids, and functions for derived strings.\
  _Benefit:_ a single source of truth; eliminates scattering.

- **Extract Function**\
  Pulled repeated update steps into `renderAll(state)` and pure helpers `computeDocumentTitle()` and
  `computeBackgroundColor()`.\
  _Benefit:_ DRY, easier to test and change in one place.

- **Encapsulate Variable**\
  Wrapped the counter in an `AppState` object local to `main()` instead of a global.\
  _Benefit:_ reduces coupling and accidental mutation from outside code.

## Resulting Structure

```c
src/
└─ main.ts
   - constants: PROJECT_TITLE, IDS
   - types: AppState
   - pure helpers: computeDocumentTitle, computeBackgroundColor
   - DOM helpers: el, onClick
   - rendering: renderAll
   - UI construction: buildUI
   - application entry: main + DOMContentLoaded guard
```
