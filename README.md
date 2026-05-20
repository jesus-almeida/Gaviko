# Gaviko - Siempre Juntos 💗

> Una PWA hecha solo para Verónica y Gabriel.

<div align="center">

![Logo G&V](https://img.shields.io/badge/G%26V-GAVIKO-FF9EB8?style=for-the-badge&logo=heart&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-Supported-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

</div>

---

## Descripción

**Gaviko** es una aplicación web progresiva (PWA) personal, creada con mucho cariño por y para Verónica y Gabriel. El nombre nace de juntar **Ga**briel + **Ve**rónica + **ko** (una sílaba que inventamos porque nos gustó cómo sonaba 😂). Es nuestro rinconcito digital: un lugar con herramientas útiles para nuestro día a día, bonito y accesible desde cualquier dispositivo.

No es un producto público ni una app genérica — es algo **nuestro**. 💕

---

## Páginas planificadas 📄

### 1. Inicio 🏠

Página principal con presentación, acceso rápido a las secciones y detalles bonitos.

### 2. Calculadora de Pasajes 🚌

Para calcular costos de pasajes según distancia y tarifas. Ideal para cuando salimos o vamos a estudiar.

### 3. Tasas Venezuela 💵

Consulta de tasas de cambio actualizadas para Venezuela. Con actualización automática y —quizás después— historial.

### 4. Calculadora Básica 🧮

Una calculadora simple para operaciones del día a día: suma ➕, resta ➖, multiplicación ✖️ y división ➗. Y —quizás después— también le agregue historial.

### 5. Contador de Tiempo Juntos ⏳

El corazón de la app. Muestra el tiempo exacto que llevamos juntos desde el **27 de Noviembre de 2024 a las 10:00 AM**. 💗

---

## Tecnologías 🛠️

| Tecnología     | Uso                                             |
| -------------- | ----------------------------------------------- |
| **HTML5**      | Estructura de cada página                       |
| **CSS3**       | Estilos visuales y diseño responsivo            |
| **JavaScript** | Lógica, interacción y navegación                |
| **PWA**        | Instalable en el móvil y funcionamiento offline |

---

## Estado real del proyecto 🚧

Esto es un proyecto **en construcción**. La mayoría del contenido está en fase de scaffolding:

| Parte               | Estado                                |
| ------------------- | ------------------------------------- |
| `index.html`        | Esqueleto básico listo                |
| `pages/*.html`      | HTML vacíos, solo estructura          |
| `css/`              | Archivos creados pero vacíos          |
| `js/core/app.js`    | Solo registra el Service Worker       |
| `js/core/router.js` | Vacío — sin enrutamiento todavía      |
| `js/pages/`         | Todos vacíos                          |
| `js/services/`      | Vacíos                                |
| `js/utils/`         | Vacíos                                |
| `js/components/`    | Vacíos                                |
| `service-worker.js` | ✅ Funcional con estrategias de caché |
| `manifest.json`     | ✅ Configurado para PWA               |
| `icons/`            | ✅ Iconos listos                      |
| `images/`           | ✅ Logo y fondo hero listos           |

Básicamente la PWA se instala y el Service Worker funciona, pero las páginas aún no tienen contenido renderizado ni lógica.

---

## Estructura del proyecto 📁

```
Gaviko/
│
├── css/
│   ├── base/
│   │   ├── reset.css
│   │   ├── typography.css
│   │   ├── utilities.css
│   │   └── variables.css
│   ├── components/
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── footer.css
│   │   ├── loader.css
│   │   ├── modal.css
│   │   ├── navbar.css
│   │   └── toast.css
│   ├── layouts/
│   │   ├── container.css
│   │   ├── header.css
│   │   └── main.css
│   └── pages/
│       ├── basic-calculator.css
│       ├── calculator.css
│       ├── home.css
│       ├── rates.css
│       └── timer.css
│
├── icons/
│   ├── apple-touch-icon.png
│   ├── favicon-96x96.png
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── web-app-manifest-192x192.png
│   └── web-app-manifest-512x512.png
│
├── images/
│   ├── gallery/
│   ├── hero-bg.webp
│   └── logo.svg
│
├── js/
│   ├── components/
│   │   ├── loader.js
│   │   ├── navbar.js
│   │   └── toast.js
│   ├── config/
│   │   └── relationship.js
│   ├── core/
│   │   ├── app.js
│   │   ├── router.js
│   │   └── storage.js
│   ├── pages/
│   │   ├── basic-calculator.js
│   │   ├── calculator.js
│   │   ├── home.js
│   │   ├── rates.js
│   │   └── timer.js
│   ├── services/
│   │   ├── notifications.js
│   │   └── rates-api.js
│   └── utils/
│       ├── formatters.js
│       ├── helpers.js
│       └── validators.js
│
├── pages/
│   ├── basic-calculator.html
│   ├── calculator.html
│   ├── rates.html
│   └── timer.html
│
├── social/
│   ├── avatar.png
│   ├── og-image.png
│   └── social-400x400.png
│
├── sounds/
│   └── notification.mp3
│
├── index.html
├── manifest.json
├── service-worker.js
├── paleta.txt
└── README.md
```

---

## Instalación y ejecución 🚀

### Prerrequisitos

- Git
- Un servidor local (Python, Node o PHP)

### Pasos

1. **Clonar el repo**

```bash
git clone https://github.com/jesus-almeida/Gaviko.git
cd Gaviko
```

2. **Levantar un servidor local**

```bash
# Con Python
python -m http.server 8000

# Con Node
npx serve

# Con PHP
php -S localhost:8000
```

3. **Abrir en el navegador**

```
http://localhost:8000/index.html
```

---

## Instalación de la PWA en el móvil 📱

Como es una PWA, podemos instalarla en nuestros teléfonos como una app nativa.

### En Android (Chrome)

1. Abrir la app en Chrome
2. Tocar el menú de tres puntos (⋮)
3. Seleccionar **"Agregar a pantalla de inicio"** o **"Instalar app"**
4. Confirmar tocando **"Agregar"**

### En iOS (Safari)

1. Abrir la app en Safari
2. Tocar el icono de **compartir** (cuadro con flecha)
3. Desplazarse y seleccionar **"Agregar a pantalla de inicio"**
4. Tocar **"Agregar"** en la esquina superior derecha

### Beneficios

| Beneficio                | Descripción                            |
| ------------------------ | -------------------------------------- |
| Acceso rápido            | Icono directo en la pantalla de inicio |
| Sin App Store            | No necesita descargar de tiendas       |
| Funciona offline         | Se puede usar sin internet             |
| Peso ligero              | Ocupa muy poco espacio                 |
| Actualización automática | Siempre tiene la última versión        |

---

## Redes sociales 🌐

Si quieres seguirnos o saber más de nosotros:

### Verónica 💕

| Red       | Usuario                                                 |
| --------- | ------------------------------------------------------- |
| TikTok    | [@hurtadoveronica](https://tiktok.com/@hurtadoveronica) |
| Instagram | [@aandreaa739](https://instagram.com/aandreaa739)       |

### Gabriel 💗

| Red       | Usuario                                                   |
| --------- | --------------------------------------------------------- |
| TikTok    | [@jesusalmeida_24](https://tiktok.com/@jesusalmeida_24)   |
| Instagram | [@jesusalmeida_24](https://instagram.com/jesusalmeida_24) |

---

## Notas 📝

- La app es **personal**, hecha por y para Verónica y Gabriel. Si alguien más la encuentra útil, qué bonito, pero no es nuestro objetivo 😅
- El Service Worker ya funciona, así que la app se puede instalar y usar offline parcialmente desde ahora.
- Los datos de tasas de cambio requerirán internet para actualizarse.
- El diseño prioriza móvil, pero se ve bien en tablets y escritorio.

---

## Roadmap 🗺️

- [ ] Dar vida al index — diseño, contenido, fotos nuestras 💕
- [ ] Implementar el contador de tiempo juntos con nuestra fecha ⏳
- [ ] Construir la calculadora de pasajes 🚌
- [ ] Conectar tasas Venezuela con datos reales 💵
- [ ] Calculadora básica 🧮
- [ ] Modo oscuro 🌙
- [ ] Sonidos y notificaciones 🔔
- [ ] Galería de fotos 📸
- [ ] Publicar en GitHub Pages o Vercel para tenerla siempre online

---

## Nota personal 💕

Este proyecto es un diario de aprendizaje y un regalo digital. Todo lo que está aquí lo hemos ido construyendo paso a paso, y aunque falte mucho, cada línea tiene cariño.

Gracias por existir, Mi Vica. 💗💕

---

<div align="center">

Hecho con 💗 por Verónica y Gabriel.

</div>
