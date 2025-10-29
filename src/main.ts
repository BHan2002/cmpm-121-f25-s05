// CMPM 121 Smelly Code Activity

// ==== Conatants and Types ==== //
const PROJECT_TITLE = "CMPM 121";

const IDS = {
  counter: "counter",
  increment: "increment",
  decrement: "dec",
  reset: "reset",
} as const;

type IdOf<T> = T[keyof T];

interface AppState {
  count: number;
}

// ===== Helpers (without DOM access) =====//
function computeDocumentTitle(count: number): string {
  return `Clicked ${count}`;
}
``;
function computeBackgroundColor(count: number): string {
  // odd = pink, even = lightblue
  return count % 2 ? "pink" : "lightblue";
}

// ===== DOM helpers ===== //
function el<T extends HTMLElement = HTMLElement>(id: IdOf<typeof IDS>): T {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Missing element: #${id}`);
  return node as T;
}

function onClick(id: IdOf<typeof IDS>, handler: () => void): void {
  el<HTMLButtonElement>(id).addEventListener("click", handler);
}

function renderAll(state: AppState): void {
  // Update number
  el<HTMLSpanElement>(IDS.counter).textContent = String(state.count);
  // Update title
  document.title = computeDocumentTitle(state.count);
  // Update background
  document.body.style.backgroundColor = computeBackgroundColor(state.count);
}

// ===== UI bootsrapping ===== //
function buildUI(): void {
  document.body.innerHTML = ` 
    <h1>${PROJECT_TITLE}</h1>
    <p>Counter: <span id="${IDS.counter}">0</span></p>
    <div>
      <button id="${IDS.increment}">Click Me!</button>
      <button id="${IDS.decrement}">Decrement</button>
      <button id="${IDS.reset}">Reset</button>
    </div>
  `;
}

// ===== Application ============================================================
function main(): void {
  // Encapsulate mutable state rather than a free global variable.
  const state: AppState = { count: 0 };

  buildUI();
  renderAll(state);

  onClick(IDS.increment, () => {
    state.count += 1;
    renderAll(state);
  });

  onClick(IDS.decrement, () => {
    state.count -= 1;
    renderAll(state);
  });

  onClick(IDS.reset, () => {
    state.count = 0;
    renderAll(state);
  });
}

// Defer startup until DOM is ready in case this script is loaded in <head>.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
