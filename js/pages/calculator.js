// ============================================
// BASIC-CALCULATOR.JS
// Calculadora con display de operación,
// botones reorganizados, porcentaje,
// retroceso y persistencia de historial.
// ============================================

let currentInput = "0";
let previousInput = null;
let operation = null;
let expression = "0";
let justComputed = false;
let displayEl = null;

const HISTORY_KEY = "calc_history";

const OPERATORS = {
  "÷": "/",
  "×": "*",
  "−": "-",
  "+": "+",
};

export function renderBasicCalculator() {
  return `
    <div class="card">
      <div class="card-title"><i class="fas fa-calculator"></i> Calculadora Básica</div>
      <div class="calc-display" id="calcDisplay">0</div>
      <div class="calculator-grid" id="calcButtons"></div>
    </div>
    <div class="card history-section">
      <div class="history-title"><i class="fas fa-history"></i> Historial</div>
      <ul class="history-list" id="historyList"></ul>
      <button class="clear-history-btn" id="clearHistoryBtn">Limpiar historial</button>
    </div>
  `;
}

export function initBasicCalculator() {
  displayEl = document.getElementById("calcDisplay");
  if (!displayEl) return;

  const grid = document.getElementById("calcButtons");
  if (!grid) return;

  // Nueva disposición de botones (4 columnas)
  const buttons = [
    "C",
    "⌫",
    "%",
    "÷",
    "7",
    "8",
    "9",
    "×",
    "4",
    "5",
    "6",
    "−",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  grid.innerHTML = "";

  buttons.forEach((btn) => {
    const btnEl = document.createElement("div");
    btnEl.className = "calc-btn";

    if (btn in OPERATORS || btn === "%") {
      btnEl.classList.add("operator");
    }

    if (btn === "=") btnEl.classList.add("equal");
    if (btn === "C") btnEl.classList.add("clear");
    if (btn === "⌫") btnEl.classList.add("backspace");

    // El 0 ocupa 2 columnas
    if (btn === "0") btnEl.classList.add("span-2");

    btnEl.innerText = btn;
    btnEl.addEventListener("click", () => handleButton(btn));
    grid.appendChild(btnEl);
  });

  resetCalculator();
  renderHistory();

  const clearBtn = document.getElementById("clearHistoryBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearHistory);
  }
}

function resetCalculator() {
  currentInput = "0";
  previousInput = null;
  operation = null;
  expression = "0";
  justComputed = false;
  updateDisplay();
}

function handleButton(value) {
  if (value >= "0" && value <= "9") {
    handleNumber(value);
  } else if (value === ".") {
    handleDecimal();
  } else if (value === "⌫") {
    handleBackspace();
  } else if (value === "C") {
    resetCalculator();
  } else if (value === "%") {
    handlePercentage();
  } else if (value === "=") {
    compute();
  } else {
    // Operadores: ÷ × − +
    handleOperator(value);
  }
}

function handleNumber(num) {
  if (justComputed) resetCalculator();
  if (currentInput === "0" || currentInput === "Error") currentInput = num;
  else currentInput += num;
  updateExpression();
}

function handleDecimal() {
  if (justComputed) resetCalculator();
  if (!currentInput.includes(".")) {
    currentInput += ".";
    updateExpression();
  }
}

function handleBackspace() {
  if (justComputed) resetCalculator();
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  updateExpression();
}

function handlePercentage() {
  if (currentInput === "Error" || justComputed) return;
  let num = parseFloat(currentInput);
  if (isNaN(num)) return;
  num = num / 100;
  currentInput = num.toString();
  updateExpression();
}

function handleOperator(op) {
  if (justComputed) {
    previousInput = parseFloat(currentInput);
    operation = op;
    currentInput = "0";
    justComputed = false;
    updateExpression();
    return;
  }

  if (operation !== null && currentInput !== "0") {
    computeIntermediate();
  }

  previousInput = parseFloat(currentInput);
  operation = op;
  currentInput = "0";
  updateExpression();
}

function computeIntermediate() {
  if (operation === null || previousInput === null) return;
  let curr = parseFloat(currentInput);
  if (isNaN(previousInput) || isNaN(curr)) {
    resetCalculator();
    return;
  }

  let result;
  switch (operation) {
    case "+":
      result = previousInput + curr;
      break;
    case "−":
      result = previousInput - curr;
      break;
    case "×":
      result = previousInput * curr;
      break;
    case "÷":
      result = curr === 0 ? "Error" : previousInput / curr;
      break;
    default:
      return;
  }

  if (result === "Error") {
    expression = "Error";
    currentInput = "Error";
  } else {
    currentInput = result.toString();
  }
  previousInput = null;
  operation = null;
  updateDisplay();
}

function compute() {
  if (operation === null) return;
  let curr = parseFloat(currentInput);
  if (isNaN(previousInput) || isNaN(curr)) {
    resetCalculator();
    return;
  }

  const exprString = `${previousInput} ${operation} ${curr}`;
  let result;

  switch (operation) {
    case "+":
      result = previousInput + curr;
      break;
    case "−":
      result = previousInput - curr;
      break;
    case "×":
      result = previousInput * curr;
      break;
    case "÷":
      result = curr === 0 ? "Error" : previousInput / curr;
      break;
    default:
      return;
  }

  if (result === "Error") {
    expression = "Error";
    currentInput = "Error";
  } else {
    addHistoryEntry(exprString, result);
    expression = result.toString();
    currentInput = result.toString();
  }

  previousInput = null;
  operation = null;
  justComputed = true;
  updateDisplay();
}

function updateExpression() {
  if (operation === null) {
    expression = currentInput;
  } else {
    expression = `${previousInput} ${operation} ${currentInput}`;
  }
  updateDisplay();
}

function updateDisplay() {
  if (displayEl) displayEl.innerText = expression || "0";
}

// ====== Historial ======
function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}
function saveHistory(h) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
}
function addHistoryEntry(expr, result) {
  const history = getHistory();
  history.unshift({ expression: `${expr} =`, result });
  if (history.length > 50) history.pop();
  saveHistory(history);
  renderHistory();
}
function deleteHistoryEntry(index) {
  const history = getHistory();
  history.splice(index, 1);
  saveHistory(history);
  renderHistory();
}
function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
}
function renderHistory() {
  const list = document.getElementById("historyList");
  if (!list) return;
  const history = getHistory();
  list.innerHTML = "";
  if (history.length === 0) {
    list.innerHTML = '<li class="history-item text-muted">Sin operaciones</li>';
    return;
  }
  history.forEach((entry, index) => {
    const li = document.createElement("li");
    li.className = "history-item";
    li.innerHTML = `
      <div>
        <span class="history-expression">${entry.expression}</span>
        <span class="history-result">${entry.result}</span>
      </div>
      <button class="history-delete" data-index="${index}">
        <i class="fas fa-times"></i>
      </button>
    `;
    li.querySelector(".history-delete").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteHistoryEntry(index);
    });
    list.appendChild(li);
  });
}
