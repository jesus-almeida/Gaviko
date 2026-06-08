// ============================================
// RATES.JS
// Vista de Tasas con conversor, última fecha
// de actualización del dólar y modal animado.
// ============================================

const simulatedRates = {
  bcv: 35.0,
  euro: 40.0,
  usdt: 35.5,
  custom: 1,
};

let currentRate = simulatedRates.bcv;
let currentCurrency = "bcv";

export function renderTasas() {
  return `
    <div class="card">
      <div class="card-title"><i class="fas fa-dollar-sign"></i> Conversor de Moneda</div>
      <div class="converter-row">
        <label for="currencySelect">Moneda:</label>
        <select id="currencySelect">
          <option value="bcv">Dólar BCV</option>
          <option value="euro">Euro</option>
          <option value="usdt">USDT</option>
          <option value="custom">Personalizada</option>
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
      <button class="btn-reset" id="resetConverterBtn"><i class="fas fa-undo-alt"></i> Reiniciar</button>
    </div>

    <div class="card">
      <div class="card-title"><i class="fas fa-calendar-day"></i> Última actualización del dólar</div>
      <div class="date-display" id="dateDisplay"></div>
      <div class="day-display" id="dayDisplay"></div>
      <button class="btn-reset" id="refreshDateBtn"><i class="fas fa-sync-alt"></i> Actualizar</button>
    </div>

    <!-- Modal de aviso -->
    <div class="modal-overlay hidden" id="ratesModal">
      <div class="modal-card">
        <i class="fas fa-exclamation-triangle"></i>
        <p>La sección <strong>Tasas</strong> aún no está terminada. Faltan implementar APIs.</p>
        <button class="modal-close-btn" id="closeModalBtn">Cerrar</button>
      </div>
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

  // Elementos de fecha
  const dateDisplay = document.getElementById("dateDisplay");
  const dayDisplay = document.getElementById("dayDisplay");
  const refreshDateBtn = document.getElementById("refreshDateBtn");

  // Modal
  const modalOverlay = document.getElementById("ratesModal");
  const closeModalBtn = document.getElementById("closeModalBtn");

  // Mostrar modal al entrar (con animación)
  if (modalOverlay) {
    modalOverlay.classList.remove("hidden");
  }

  // Cerrar modal con botón
  closeModalBtn?.addEventListener("click", () => {
    modalOverlay.classList.add("hidden");
  });

  // Cerrar modal al hacer clic fuera del card
  modalOverlay?.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.add("hidden");
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
      modalOverlay.classList.add("hidden");
    }
  });

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
        case "usdt":
          currencyIcon.classList.add("fa-coins");
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
  currentRate = simulatedRates.bcv;
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
      currentRate = simulatedRates[currentCurrency];
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
    currencySelect.value = "bcv";
    currentCurrency = "bcv";
    currentRate = simulatedRates.bcv;
    customRateRow.classList.remove("active");
    usdInput.value = "1";
    customRateInput.value = "1";
    convertFromUsd();
    animateIcon("bcv");
  });

  // Actualizar fecha
  refreshDateBtn?.addEventListener("click", () => {
    updateLastUpdateDate(dateDisplay, dayDisplay);
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
  const lastUpdate = getLastBusinessDate();
  const optionsDate = { year: "numeric", month: "2-digit", day: "2-digit" };
  const optionsDay = { weekday: "long" };
  const formattedDate = lastUpdate.toLocaleDateString("es-VE", optionsDate); // "dd/mm/aaaa"
  const dayName = lastUpdate.toLocaleDateString("es-VE", optionsDay);
  // Capitalizar primera letra
  const dayCapitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1);
  dateEl.textContent = `${dayCapitalized}, ${formattedDate}`;
  dayEl.textContent = ""; // Podríamos dejarlo vacío o mostrar "Día hábil anterior"
}
