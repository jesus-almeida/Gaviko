// ============================================
// HOME.JS
// Vista de Inicio con contador, galería,
// frases y redes sociales.
// ============================================

const START_DATE = new Date("2024-11-27T10:00:00-04:00");
let counterInterval = null;

export function renderHome() {
  return `
    <div class="card text-center">
      <img src="images/logo.svg" alt="Gaviko" class="home-logo">
      <p class="home-slogan">Nuestro rincón especial</p>
      <p class="text-muted">Bienvenidos a nuestra herramienta digital para acompañar el día a día.</p>
    </div>

    <div class="counter-card" id="counterCard">
      <div class="counter-start">Desde el 27 de noviembre de 2024...</div>
      <div class="counter-display" id="counterDisplay">Cargando...</div>
      <div class="counter-message">¡Y vamos por más!</div>
    </div>

    <div class="card">
      <div class="card-title"><i class="fas fa-images"></i> Nuestros momentos</div>
      <div class="gallery-grid" id="galleryGrid">
        <!-- Placeholders generados en JS -->
      </div>
    </div>

    <div class="card">
      <div class="card-title"><i class="fas fa-heart"></i> Sobre nosotros</div>
      <p class="about-text">
        Somos Verónica y Gabriel, un equipo que se ama y se apoya. Esta app es un reflejo de nuestro compromiso: construir juntos, día a día.
      </p>
    </div>

    <div class="card">
      <div class="card-title"><i class="fas fa-share-alt"></i> Redes Sociales</div>
      <div class="social-links">
        <div class="social-group">
          <span class="social-label">Verónica</span>
          <a href="https://instagram.com/aandreaa739" target="_blank" class="social-link" title="Instagram de Verónica">
            <i class="fab fa-instagram"></i>
            <span>@aandreaa739</span>
          </a>
          <a href="https://tiktok.com/@hurtadoveronica" target="_blank" class="social-link" title="TikTok de Verónica">
            <i class="fab fa-tiktok"></i>
            <span>@hurtadoveronica</span>
          </a>
        </div>
        <div class="social-group">
          <span class="social-label">Gabriel</span>
          <a href="https://instagram.com/jesusalmeida_24" target="_blank" class="social-link" title="Instagram de Gabriel">
            <i class="fab fa-instagram"></i>
            <span>@jesusalmeida_24</span>
          </a>
          <a href="https://tiktok.com/@jesusalmeida_24" target="_blank" class="social-link" title="TikTok de Gabriel">
            <i class="fab fa-tiktok"></i>
            <span>@jesusalmeida_24</span>
          </a>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><i class="fas fa-quote-right"></i> Recuerda</div>
      <div class="phrase-card">
        <div class="phrase-text">"Se feliz y siempre sonríe"</div>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="home-footer">
      <p class="footer-main">Siempre Juntos</p>
      <p class="footer-sub">Para nosotros, con amor</p>
    </div>
  `;
}

export function initHome() {
  updateCounter();
  counterInterval = setInterval(updateCounter, 1000);
  buildGallery();
}

export function destroyHome() {
  if (counterInterval) {
    clearInterval(counterInterval);
    counterInterval = null;
  }
}

function updateCounter() {
  const now = new Date();
  let diffMs = now - START_DATE;
  if (diffMs < 0) {
    document.getElementById("counterDisplay").innerText =
      "¡La aventura está por comenzar!";
    return;
  }
  let seconds = Math.floor(diffMs / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  let days = Math.floor(hours / 24);
  hours = hours % 24;
  const years = Math.floor(days / 365);
  days = days % 365;
  const months = Math.floor(days / 30);
  days = days % 30;
  const pad = (n) => String(n).padStart(2, "0");
  const displayStr =
    `${years} año${years !== 1 ? "s" : ""}, ${months} mes${months !== 1 ? "es" : ""}, ${days} día${days !== 1 ? "s" : ""} ` +
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  document.getElementById("counterDisplay").innerText = displayStr;
}

function buildGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  let html = "";
  for (let i = 1; i <= 6; i++) {
    html += `
      <div class="gallery-item">
        <i class="fas fa-camera-retro"></i>
        <span>Foto ${i}</span>
      </div>
    `;
  }
  grid.innerHTML = html;
}
