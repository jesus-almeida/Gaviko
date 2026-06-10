// ============================================
// HOME.JS
// Vista de Inicio con contador, galería,
// frases y redes sociales.
// ============================================

// CONTADOR
const START_DATE = new Date("2024-11-27T10:00:00-04:00");
let counterInterval = null;
// Galeria
let currentLightboxIndex = 0;
let isAnimating = false;
let lightboxKeydownHandler = null;

const galleryImages = [
  {
    src: "./images/gallery/image0.jpeg",
    date: "2026-05-02",
  },
  {
    src: "./images/gallery/image1.jpeg",
    date: "2026-05-02",
  },
  {
    src: "./images/gallery/image2.jpeg",
    date: "2026-05-07",
  },
  {
    src: "./images/gallery/image3.jpeg",
    date: "2026-05-07",
  },
  {
    src: "./images/gallery/image4.jpeg",
    date: "2026-04-30",
  },
  {
    src: "./images/gallery/image5.jpeg",
    date: "2025-08-01",
  },
];

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
          <a href="https://instagram.com/aandreaa739" target="_blank" rel="noopener noreferrer" class="social-link" title="Instagram de Verónica">
            <i class="fab fa-instagram"></i>
            <span>@aandreaa739</span>
          </a>
          <a href="https://tiktok.com/@hurtadoveronica" target="_blank" rel="noopener noreferrer" class="social-link" title="TikTok de Verónica">
            <i class="fab fa-tiktok"></i>
            <span>@hurtadoveronica</span>
          </a>
        </div>
        <div class="social-group">
          <span class="social-label">Gabriel</span>
          <a href="https://instagram.com/jesusalmeida_24" target="_blank" rel="noopener noreferrer" class="social-link" title="Instagram de Gabriel">
            <i class="fab fa-instagram"></i>
            <span>@jesusalmeida_24</span>
          </a>
          <a href="https://tiktok.com/@jesusalmeida_24" target="_blank" rel="noopener noreferrer" class="social-link" title="TikTok de Gabriel">
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
  ensureLightbox();
  updateCounter();
  counterInterval = setInterval(updateCounter, 1000);
  buildGallery();
}

export function destroyHome() {
  if (counterInterval) {
    clearInterval(counterInterval);
    counterInterval = null;
  }

  if (lightboxKeydownHandler) {
    document.removeEventListener("keydown", lightboxKeydownHandler);
    lightboxKeydownHandler = null;
  }
}

function updateCounter() {
  const now = new Date();
  const start = new Date(START_DATE);

  if (now < start) {
    document.getElementById("counterDisplay").innerText =
      "¡La aventura está por comenzar!";
    return;
  }

  // Calcular años
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  // Ajustar días si es negativo
  if (days < 0) {
    // Obtener el último día del mes anterior al actual
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += previousMonth.getDate();
    months--;
  }

  // Ajustar meses si es negativo
  if (months < 0) {
    months += 12;
    years--;
  }

  // Calcular horas, minutos, segundos
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  // Ajustar segundos negativos
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  // Ajustar minutos negativos
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  // Ajustar horas negativas (si la hora de inicio fue más tarde en el día)
  if (hours < 0) {
    hours += 24;
    days--;
    if (days < 0) {
      const previousMonthDate = new Date(now.getFullYear(), now.getMonth(), 0);
      days += previousMonthDate.getDate();
      months--;
      if (months < 0) {
        months += 12;
        years--;
      }
    }
  }

  const pad = (n) => String(n).padStart(2, "0");

  const displayStr =
    `${years} año${years !== 1 ? "s" : ""}, ${months} mes${months !== 1 ? "es" : ""}, ${days} día${days !== 1 ? "s" : ""} ` +
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  document.getElementById("counterDisplay").innerText = displayStr;
}

function ensureLightbox() {
  if (document.getElementById("lightbox")) return; // ya existe

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay hidden";
  overlay.id = "lightbox";
  overlay.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" id="lightboxClose"><i class="fas fa-times"></i></button>
      <button class="lightbox-prev" id="lightboxPrev"><i class="fas fa-chevron-left"></i></button>
      <button class="lightbox-next" id="lightboxNext"><i class="fas fa-chevron-right"></i></button>
      <img id="lightboxImg" src="" alt="Imagen ampliada">
      <div class="lightbox-caption" id="lightboxCaption"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Configurar eventos una sola vez
  document
    .getElementById("lightboxClose")
    .addEventListener("click", closeLightbox);
  document.getElementById("lightboxNext").addEventListener("click", nextImage);
  document.getElementById("lightboxPrev").addEventListener("click", prevImage);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
  });

  lightboxKeydownHandler = (e) => {
    if (overlay.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };
  document.addEventListener("keydown", lightboxKeydownHandler);
}

function buildGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  let html = "";
  galleryImages.forEach((img, index) => {
    html += `
      <div class="gallery-item" data-index="${index}">
        <img src="${img.src}" alt="Foto ${index + 1}" loading="lazy">
      </div>
    `;
  });
  grid.innerHTML = html;

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      const index = parseInt(item.getAttribute("data-index"));
      openLightbox(index);
    });
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  if (!lightbox || !lightboxImg || !lightboxCaption) return;

  // Preparar imagen y descripción
  lightboxImg.src = galleryImages[index].src;
  updateCaptionText(index); // solo cambia el texto, sin animación aún
  lightboxCaption.classList.remove("visible"); // invisible
  lightbox.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  // Forzar reflow para la imagen
  lightboxImg.classList.remove("active");
  void lightboxImg.offsetWidth;
  lightboxImg.classList.add("active");

  // Después de que la imagen empiece a aparecer, mostramos la fecha
  // Pequeño retraso para que se sincronice con la imagen
  setTimeout(() => {
    lightboxCaption.classList.add("visible");
  }, 50); // casi simultáneo, pero asegura que la transición se vea
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  if (!lightbox || !lightboxImg) return;
  if (isAnimating) return; // evitar múltiples cierres

  isAnimating = true;
  lightboxImg.classList.remove("active"); // inicia animación de salida

  // Esperar a que termine la transición para ocultar el overlay
  lightboxImg.addEventListener("transitionend", function handler() {
    lightbox.classList.add("hidden");
    document.body.style.overflow = "";
    isAnimating = false;
    lightboxImg.removeEventListener("transitionend", handler);
  });
}

function updateCaptionText(index) {
  const captionEl = document.getElementById("lightboxCaption");
  if (captionEl) {
    const imgDate = new Date(galleryImages[index].date + "T12:00:00-04:00");
    const formattedDate = imgDate.toLocaleDateString("es-VE", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    captionEl.textContent =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
}

function updateLightboxImage(direction = "next") {
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  if (!lightboxImg || !lightboxCaption || isAnimating) return;

  isAnimating = true;
  // Desvanecer imagen y fecha simultáneamente
  lightboxImg.classList.remove("active");
  lightboxCaption.classList.remove("visible");

  // Esperar a que termine la transición de la imagen
  lightboxImg.addEventListener("transitionend", function handler() {
    // Cambiar imagen
    lightboxImg.src = galleryImages[currentLightboxIndex].src;
    // Actualizar texto de la fecha (todavía invisible)
    updateCaptionText(currentLightboxIndex);
    // Forzar reflow y mostrar imagen
    void lightboxImg.offsetWidth;
    lightboxImg.classList.add("active");
    // Mostrar fecha con animación
    lightboxCaption.classList.add("visible");
    isAnimating = false;
    lightboxImg.removeEventListener("transitionend", handler);
  });
}

function nextImage() {
  if (isAnimating) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
  updateLightboxImage("next");
}

function prevImage() {
  if (isAnimating) return;
  currentLightboxIndex =
    (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightboxImage("prev");
}
