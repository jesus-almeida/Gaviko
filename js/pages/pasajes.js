// ============================================
// PASAJES.JS
// Calculadora de pasajes semanal con persistencia
// de totales, botones condicionales y título.
// ============================================

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const TOTALS_KEY = "pasajes_totals";

let config = {};
let state = {};
let expenses = [];

export function renderPasajes() {
  return `
    <div class="pasajes-card">
      <div class="card-title"><i class="fas fa-bus"></i> Calculadora de Pasajes</div>
      <div id="daysContainer"></div>
    </div>

    <div class="pasajes-card">
      <h2>Gastos Adicionales</h2>
      <input type="text" id="extraName" placeholder="Descripción" class="mb-2">
      <input type="number" id="extraAmount" placeholder="Monto" class="mb-2">
      <button class="btn-secondary" id="addExpenseBtn">Agregar</button>
      <div id="expensesList" class="mt-3"></div>
      <button class="btn-outline mt-3 w-full hidden" id="clearExpensesBtn">
        <i class="fas fa-trash-alt"></i> Borrar todos los gastos
      </button>
    </div>

    <div class="pasajes-card config-panel" id="configPanel">
      <h2>Configuración de Tarifas</h2>
      <label>Ruta 10: <input type="number" id="ruta10" class="inputRuta" value=""> Bs.</label><br>
      <label>Ruta 10-B: <input type="number" id="ruta10b" class="inputRuta" value=""> Bs.</label><br>
      <label>Ruta Universidad: <input type="number" id="rutaUni" class="inputRuta" value=""> Bs.</label><br>
      <button class="btn-primary mt-3" id="saveConfigBtn">Guardar</button>
    </div>

    <div class="button-group">
      <button class="btn-secondary" id="toggleConfigBtn">Configuración</button>
      <button class="btn-primary" id="calculateBtn">Calcular Total</button>
    </div>

    <div class="total-card" id="totalCard">
  💰 Total semanal: <span id="totalAmount">0</span> Bs.<br>
  👩 Verónica: <span id="veronicaAmount">0</span> Bs.<br>
  👨 Gabriel: <span id="gabrielAmount">0</span> Bs.
  <button class="btn-secondary mt-2 hidden" id="clearTotalsBtn" style="margin-top:12px; width:100%;">Borrar totales</button>
</div>
  `;
}

export function initPasajes() {
  config = JSON.parse(localStorage.getItem("config")) || {
    ruta10: 140,
    ruta10b: 140,
    rutaUni: 70,
  };
  state = JSON.parse(localStorage.getItem("state")) || {};
  expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  if (!localStorage.getItem("state")) {
    state = {};
    days.forEach((day) => {
      state[day] = defaultState(day);
    });
    saveState();
  }

  renderDays();
  renderExpenses();
  loadSavedTotals();

  // Eventos
  document
    .getElementById("calculateBtn")
    ?.addEventListener("click", calculateTotal);
  document
    .getElementById("toggleConfigBtn")
    ?.addEventListener("click", toggleConfig);
  document
    .getElementById("saveConfigBtn")
    ?.addEventListener("click", saveConfig);
  document
    .getElementById("addExpenseBtn")
    ?.addEventListener("click", addExpense);
  document
    .getElementById("clearExpensesBtn")
    ?.addEventListener("click", clearAllExpenses);
  document
    .getElementById("clearTotalsBtn")
    ?.addEventListener("click", clearTotals);
}

// ========== Funciones auxiliares ==========

function defaultState(day) {
  return {
    veronica: day === "Viernes" ? "inces" : "both",
    gabriel: true,
  };
}

function renderDays() {
  const container = document.getElementById("daysContainer");
  if (!container) return;
  container.innerHTML = "";
  days.forEach((day) => {
    if (!state[day]) state[day] = defaultState(day);
    const div = document.createElement("div");
    div.className = "day-card";
    div.innerHTML = `
      <h3>${day}</h3>
      <strong>Verónica:</strong>
      <select data-day="${day}" class="veronicaSelect">
        <option value="none">No asiste</option>
        <option value="inces">Solo INCES</option>
        <option value="uni">Solo Universidad</option>
        <option value="both">INCES + Universidad</option>
      </select>
      <br>
      <strong>Gabriel:</strong>
      <input type="checkbox" data-day="${day}" class="gabrielCheck">
    `;
    container.appendChild(div);
    div.querySelector(".veronicaSelect").value = state[day].veronica;
    div.querySelector(".gabrielCheck").checked = state[day].gabriel;
  });

  document.querySelectorAll(".veronicaSelect").forEach((select) => {
    select.addEventListener("change", (e) => {
      const day = e.target.dataset.day;
      state[day].veronica = e.target.value;
      saveState();
    });
  });
  document.querySelectorAll(".gabrielCheck").forEach((check) => {
    check.addEventListener("change", (e) => {
      const day = e.target.dataset.day;
      state[day].gabriel = e.target.checked;
      saveState();
    });
  });
}

function calculateDay(day) {
  let totalVeronica = 0,
    totalGabriel = 0;
  const d = state[day];
  if (d.veronica === "inces") totalVeronica += config.ruta10 * 2;
  else if (d.veronica === "uni")
    totalVeronica += config.ruta10b + config.rutaUni;
  else if (d.veronica === "both")
    totalVeronica += config.ruta10 * 2 + config.ruta10b + config.rutaUni;
  if (d.gabriel) totalGabriel += config.ruta10b + config.rutaUni;
  return {
    veronica: totalVeronica,
    gabriel: totalGabriel,
    total: totalVeronica + totalGabriel,
  };
}

function calculateTotal() {
  let total = 0,
    totalVeronica = 0,
    totalGabriel = 0;
  days.forEach((day) => {
    const res = calculateDay(day);
    total += res.total;
    totalVeronica += res.veronica;
    totalGabriel += res.gabriel;
  });
  const extras = expenses.reduce((acc, e) => acc + e.amount, 0);
  total += extras;
  localStorage.setItem(
    TOTALS_KEY,
    JSON.stringify({ total, veronica: totalVeronica, gabriel: totalGabriel }),
  );
  displayTotals(total, totalVeronica, totalGabriel);
}

function displayTotals(total, veronica, gabriel) {
  const totalSpan = document.getElementById("totalAmount");
  const veronicaSpan = document.getElementById("veronicaAmount");
  const gabrielSpan = document.getElementById("gabrielAmount");
  const clearBtn = document.getElementById("clearTotalsBtn");
  const totalCard = document.getElementById("totalCard");

  if (totalSpan) totalSpan.textContent = total;
  if (veronicaSpan) veronicaSpan.textContent = veronica;
  if (gabrielSpan) gabrielSpan.textContent = gabriel;

  // Mostrar/ocultar botón de limpiar totales
  if (clearBtn) {
    const showClear = total > 0 || veronica > 0 || gabriel > 0;
    clearBtn.classList.toggle("hidden", !showClear);
  }

  // Animación de la tarjeta (escala)
  if (totalCard) {
    totalCard.classList.remove("animate");
    void totalCard.offsetWidth;
    totalCard.classList.add("animate");
  }
}

function loadSavedTotals() {
  const saved = JSON.parse(localStorage.getItem(TOTALS_KEY));
  if (saved) {
    displayTotals(saved.total, saved.veronica, saved.gabriel);
  }
}

function clearTotals() {
  const totalSpan = document.getElementById("totalAmount");
  const veronicaSpan = document.getElementById("veronicaAmount");
  const gabrielSpan = document.getElementById("gabrielAmount");
  const clearBtn = document.getElementById("clearTotalsBtn");

  if (!totalSpan || !veronicaSpan || !gabrielSpan) return;

  // Aplicar clase de fade a los números
  totalSpan.classList.add("fade-numbers");
  veronicaSpan.classList.add("fade-numbers");
  gabrielSpan.classList.add("fade-numbers");

  // Deshabilitar botón mientras se anima
  if (clearBtn) clearBtn.disabled = true;

  setTimeout(() => {
    // Limpiar almacenamiento y poner ceros
    localStorage.removeItem(TOTALS_KEY);
    totalSpan.textContent = "0";
    veronicaSpan.textContent = "0";
    gabrielSpan.textContent = "0";

    // Quitar clase de fade
    totalSpan.classList.remove("fade-numbers");
    veronicaSpan.classList.remove("fade-numbers");
    gabrielSpan.classList.remove("fade-numbers");

    // Ocultar botón de limpiar totales
    if (clearBtn) {
      clearBtn.classList.add("hidden");
      clearBtn.disabled = false;
    }

    // Re-animar tarjeta
    const totalCard = document.getElementById("totalCard");
    if (totalCard) {
      totalCard.classList.remove("animate");
      void totalCard.offsetWidth;
      totalCard.classList.add("animate");
    }
  }, 300);
}

function toggleConfig() {
  const panel = document.getElementById("configPanel");
  if (panel) {
    panel.classList.toggle("active");
    document.getElementById("ruta10").value = config.ruta10;
    document.getElementById("ruta10b").value = config.ruta10b;
    document.getElementById("rutaUni").value = config.rutaUni;
  }
}

function saveConfig() {
  config.ruta10 = Number(document.getElementById("ruta10").value);
  config.ruta10b = Number(document.getElementById("ruta10b").value);
  config.rutaUni = Number(document.getElementById("rutaUni").value);
  localStorage.setItem("config", JSON.stringify(config));
  toggleConfig();
}

function addExpense() {
  const name = document.getElementById("extraName").value.trim();
  const amount = Number(document.getElementById("extraAmount").value);
  if (!name || !amount) return;
  expenses.push({ name, amount });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  document.getElementById("extraName").value = "";
  document.getElementById("extraAmount").value = "";
  renderExpenses();
}

function deleteExpense(index) {
  const items = document.querySelectorAll(".expense-item");
  const item = items[index];
  if (!item) return;
  item.classList.add("removing");
  setTimeout(() => {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
  }, 200);
}

function clearAllExpenses() {
  const items = document.querySelectorAll(".expense-item");
  if (items.length === 0) return;

  // Deshabilitar botón para evitar múltiples clics
  const clearBtn = document.getElementById("clearExpensesBtn");
  if (clearBtn) clearBtn.disabled = true;

  // Aplicar clase de salida a todos los items
  items.forEach((item) => item.classList.add("removing"));

  // Esperar a que termine la animación y luego limpiar
  setTimeout(() => {
    expenses = [];
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses(); // Esto reinsertará la lista vacía y ocultará el botón
    if (clearBtn) clearBtn.disabled = false;
  }, 250); // mismo tiempo que la transición CSS
}

function renderExpenses() {
  const list = document.getElementById("expensesList");
  if (!list) return;
  list.innerHTML = "";
  expenses.forEach((e, i) => {
    const div = document.createElement("div");
    div.className = "expense-item";
    div.innerHTML = `
      <span>${e.name} - ${e.amount} Bs.</span>
      <button class="delete-btn" data-index="${i}">Borrar</button>
    `;
    list.appendChild(div);
  });
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (index !== undefined) deleteExpense(index);
    });
  });

  // Mostrar/ocultar botón "Borrar todos los gastos"
  const clearExpensesBtn = document.getElementById("clearExpensesBtn");
  if (clearExpensesBtn) {
    clearExpensesBtn.classList.toggle("hidden", expenses.length === 0);
  }
}

function saveState() {
  localStorage.setItem("state", JSON.stringify(state));
}
