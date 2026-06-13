// ============================================
// RATES.JS
// Vista de Tasas con conversor, última fecha
// de actualización del dólar.
// ============================================

import { fetchLiveRates, getCachedRates } from "../services/rates-api.js";

let liveRates = { bcv: 1, euro: 1, custom: 1 };
let currentRate = liveRates.bcv;
let currentCurrency = "bcv";
let lastFetchedAt = null;

export function renderTasas() {
  return `
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-dollar-sign"></i> Conversor de Moneda</div>
        <span id="rate-status" class="status-offline"></span>
      </div>
      <div class="converter-row">
        <label for="currencySelect">Moneda:</label>
        <select id="currencySelect">
          <option value="bcv">$ Dólar BCV</option>
          <option value="euro">€ Euro</option>
          <option value="custom">⚙ Personalizada</option>
        </select>
      </div>
      <div class="converter-row" id="customRateRow">
        <label for="customRateInput">Tasa (Bs):</label>
        <input type="number" id="customRateInput" placeholder="Ej. 38.5" step="any" min="0" value="1">
      </div>
      <div class="converter-row">
        <label for="usdInput"><i id="currencyIcon" class="fas fa-dollar-sign"></i></label>
        <input type="number" id="usdInput" placeholder="0.00" step="any" min="0" value="1">
      </div>
      <div class="converter-row">
        <label for="bsInput">Bs.</label>
        <input type="number" id="bsInput" placeholder="0.00" step="any" min="0">
      </div>
      <button class="btn-reload" id="resetConverterBtn" title="Reiniciar"><i class="fas fa-sync-alt"></i> Reiniciar</button>
    </div>

    <div class="card">
      <div class="card-title"><i class="fas fa-calendar-day"></i> Última actualización</div>
      <div class="date-display" id="dateDisplay"></div>
      <div class="day-display" id="dayDisplay"></div>
    </div>
  `;
}

export function initTasas() {
  // Elementos del conversor
  const currencySelect = document.getElementById("currencySelect");
  const customRateRow = document.getElementById("customRateRow");
  const customRateInput = document.getElementById("customRateInput");
  const usdInput = document.getElementById("usdInput");
  const bsInput = document.getElementById("bsInput");
  const resetConverterBtn = document.getElementById("resetConverterBtn");
  const currencyIcon = document.getElementById("currencyIcon");

  // Cargar tasas desde Supabase
  async function loadRates() {
    const resetBtn = document.getElementById("resetConverterBtn");
    resetBtn?.classList.add("spin");
    updateRateStatus(null); // Cargando...
    const { rates, isLive } = await fetchLiveRates();
    liveRates = { ...rates, custom: 1 };
    currentRate = liveRates[currentCurrency] || 0.01;
    updateRateStatus(isLive);
    updateLastUpdateDate(dateDisplay, dayDisplay);
    resetBtn?.classList.remove("spin");
    if (usdInput.value) convertFromUsd();
  }

  // Mostrar estado en vivo/offline
  function updateRateStatus(isLive) {
    const statusEl = document.getElementById("rate-status");
    if (!statusEl) return;
    // Reiniciar animación
    statusEl.classList.remove("status-animate");
    void statusEl.offsetWidth; // Forzar reflow para reiniciar la animación
    if (isLive === null) {
      statusEl.textContent = "Cargando...";
      statusEl.className = "status-loading";
    } else {
      statusEl.textContent = isLive ? "En vivo" : "Desconectado";
      statusEl.className = isLive ? "status-live" : "status-offline";
      statusEl.classList.add("status-animate");
    }
  }

  // Reiniciar inputs a 1 = tasa actual
  function resetInputs() {
    usdInput.value = "1";
    convertFromUsd();
    loadRates(); // Forzar actualización de tasas
  }

  // Cargar tasas al iniciar
  loadRates();

  // Elementos de fecha
  const dateDisplay = document.getElementById("dateDisplay");
  const dayDisplay = document.getElementById("dayDisplay");

  // Valores por defecto
  if (usdInput) usdInput.value = "1";
  if (customRateInput) customRateInput.value = "1";

  // Actualizar fecha
  updateLastUpdateDate(dateDisplay, dayDisplay);

  // Función para animar el cambio de icono
  function animateIcon(newCurrency) {
    if (!currencyIcon) return;
    // Desvanecer
    currencyIcon.style.opacity = "0";
    currencyIcon.style.transform = "scale(0.5)";
    setTimeout(() => {
      // Cambiar clase
      currencyIcon.className = "fas"; // reset
      switch (newCurrency) {
        case "bcv":
        case "custom":
          currencyIcon.classList.add("fa-dollar-sign");
          break;
        case "euro":
          currencyIcon.classList.add("fa-euro-sign");
          break;
      }
      // Mostrar de nuevo
      currencyIcon.style.opacity = "1";
      currencyIcon.style.transform = "scale(1)";
    }, 150);
  }

  // Establecer moneda inicial y calcular
  currencySelect.value = "bcv";
  currentCurrency = "bcv";
  currentRate = liveRates.bcv;
  // El icono se establece sin animación al inicio
  currencyIcon.className = "fas fa-dollar-sign";
  currencyIcon.style.transition = "opacity 0.15s, transform 0.15s";
  customRateRow.classList.remove("active");
  convertFromUsd();

  // Evento: cambio de moneda
  currencySelect?.addEventListener("change", (e) => {
    currentCurrency = e.target.value;
    if (currentCurrency === "custom") {
      customRateRow.classList.add("active");
      currentRate = parseFloat(customRateInput.value) || 0;
    } else {
      customRateRow.classList.remove("active");
      currentRate = liveRates[currentCurrency] || 0.01;
    }
    animateIcon(currentCurrency);
    if (usdInput.value) {
      convertFromUsd();
    } else {
      bsInput.value = "";
    }
  });

  // Evento: cambio en tasa personalizada
  customRateInput?.addEventListener("input", () => {
    if (currentCurrency === "custom") {
      currentRate = parseFloat(customRateInput.value) || 0;
      if (usdInput.value) {
        convertFromUsd();
      } else {
        bsInput.value = "";
      }
    }
  });

  // Evento: cambio en USD
  usdInput?.addEventListener("input", () => {
    convertFromUsd();
  });

  // Evento: cambio en Bs
  bsInput?.addEventListener("input", () => {
    convertFromBs();
  });

  // Reiniciar conversor
  resetConverterBtn?.addEventListener("click", () => {
    resetInputs();
  });
}

function convertFromUsd() {
  const usdInput = document.getElementById("usdInput");
  const bsInput = document.getElementById("bsInput");
  const usd = parseFloat(usdInput.value);
  if (isNaN(usd) || usd < 0) {
    bsInput.value = "";
    return;
  }
  if (currentRate > 0) {
    bsInput.value = (usd * currentRate).toFixed(2);
  } else {
    bsInput.value = "0.00";
  }
}

function convertFromBs() {
  const usdInput = document.getElementById("usdInput");
  const bsInput = document.getElementById("bsInput");
  const bs = parseFloat(bsInput.value);
  if (isNaN(bs) || bs < 0) {
    usdInput.value = "";
    return;
  }
  if (currentRate > 0) {
    usdInput.value = (bs / currentRate).toFixed(2);
  } else {
    usdInput.value = "0.00";
  }
}

/**
 * Calcula la última fecha hábil (lunes a viernes) anterior a hoy.
 * Si hoy es lunes, retrocede al viernes.
 * Si hoy es fin de semana, retrocede al viernes.
 */
function getLastBusinessDate() {
  const today = new Date();
  let lastBiz = new Date(today);
  // Retroceder un día inicialmente
  lastBiz.setDate(lastBiz.getDate() - 1);
  // Si es sábado (6) o domingo (0), retroceder hasta el viernes
  while (lastBiz.getDay() === 0 || lastBiz.getDay() === 6) {
    lastBiz.setDate(lastBiz.getDate() - 1);
  }
  // Si hoy es lunes (1), el día anterior es domingo, entonces retroceder hasta viernes
  // Ya está cubierto por el while, pero para mayor claridad:
  if (today.getDay() === 1) {
    // Retroceder directamente al viernes
    lastBiz.setDate(today.getDate() - 3);
  }
  return lastBiz;
}

function updateLastUpdateDate(dateEl, dayEl) {
  if (!dateEl || !dayEl) return;
  const { updatedAt } = getCachedRates();
  if (!updatedAt) {
    dateEl.textContent = "Sin datos";
    dayEl.textContent = "";
    return;
  }
  const optionsDate = { year: "numeric", month: "2-digit", day: "2-digit" };
  const optionsDay = { weekday: "long" };
  const formattedDate = updatedAt.toLocaleDateString("es-VE", optionsDate);
  const dayName = updatedAt.toLocaleDateString("es-VE", optionsDay);
  const dayCapitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1);
  dateEl.textContent = `${dayCapitalized}, ${formattedDate}`;
  dayEl.textContent = "";
}
