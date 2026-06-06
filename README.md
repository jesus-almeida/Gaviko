# Gaviko - Siempre Juntos 💗

> Una PWA hecha solo para Verónica y Gabriel.

<div align="center">

![Logo G&V](https://img.shields.io/badge/G%26V-GAVIKO-FF9EB8?style=for-the-badge&logo=heart&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Soportado-7A22FF?style=for-the-badge&logo=pwa&logoColor=white&labelColor=2F3437)

</div>

---

## Descripción

**Gaviko** es una aplicación web progresiva (PWA) personal, creada con mucho cariño por y para Verónica y Gabriel. El nombre nace de juntar **Ga**briel + **V**erón**i**ca + **ko** (una sílaba que inventamos porque nos gustó cómo sonaba 😂). Es nuestro rinconcito digital: un lugar con herramientas útiles para nuestro día a día, bonito y accesible desde cualquier dispositivo.

No es un producto público ni una app genérica — es algo **nuestro**. 💕

---

## Funcionalidades completadas ✅

### 1. Inicio 🏠

- Logo personalizado y mensaje de bienvenida
- Contador de tiempo juntos desde el **27 de noviembre de 2024, 10:00 AM** (años, meses, días, horas, minutos, segundos)
- Galería de fotos con placeholders (lista para añadir imágenes reales)
- Sección "Sobre nosotros" con mensaje personal
- Redes sociales separadas para Verónica y Gabriel (2 Instagram, 2 TikTok)
- Frases "Recuerda esto" con sombra y diseño destacado
- Footer con "Siempre Juntos" y "Para nosotros, con amor"

### 2. Calculadora de Pasajes 🚌

- Selección de días laborables (Lunes a Viernes) con opciones de asistencia por persona
- Configuración de tarifas de rutas (Ruta 10, 10-B, Universidad)
- Gastos adicionales con nombre y monto
- Cálculo semanal con desglose por persona
- Persistencia de totales, gastos y configuración en localStorage
- Botones condicionales: limpiar gastos (si hay), limpiar totales (si > 0)
- Animaciones al calcular, borrar elementos y desvanecer totales

### 3. Calculadora Básica 🧮

- Display de operación en curso (ej: "1 + 2")
- Botones: números, decimales, retroceso (⌫), limpiar (C), porcentaje (%)
- Operadores: ÷, ×, −, +
- Historial de operaciones con persistencia en localStorage
- Animaciones, modo responsive y paleta de colores

### 4. Tasas 💵

- Conversor de monedas: Dólar BCV, Euro, USDT, Personalizada
- Campo de monto con icono dinámico que cambia según la moneda
- Tasa personalizada con valor por defecto 1
- Conversión bidireccional (dólares ↔ bolívares)
- Tarjeta con última fecha hábil de actualización del dólar
- Modal de aviso (sección no terminada, faltan APIs) con animaciones
- Animaciones en cambio de moneda, icono y aparición de tasa personalizada

### 5. Ajustes ⚙️

- Modo oscuro/claro con toggle y persistencia
- Notificaciones: toggle desactivado por defecto, solicitud de permiso, botón de prueba
- Información de la app: versión, repositorio, desarrollador

---

## Características técnicas 🛠️

| Característica             | Descripción                                      |
| -------------------------- | ------------------------------------------------ |
| **SPA**                    | Navegación basada en hash con router modular     |
| **Mobile First**           | Diseño responsivo optimizado para móviles        |
| **PWA**                    | Instalable, funciona offline, Service Worker     |
| **Tema oscuro/claro**      | Variables CSS con transición suave               |
| **Persistencia**           | localStorage para historial, configuración, tema |
| **Notificaciones**         | API de Notification con permiso y prueba         |
| **Módulos ES6**            | Código modular con imports/exports               |
| **Arquitectura escalable** | Separación por componentes, páginas y servicios  |

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
│ ├── base/
│ │ ├── reset.css
│ │ ├── typography.css
│ │ ├── utilities.css
│ │ └── variables.css
│ ├── components/
│ │ ├── cards.css
│ │ └── navbar.css
│ ├── layouts/
│ │ └── main.css
│ └── pages/
│ ├── calculator.css
│ ├── home.css
│ ├── pasajes.css
│ ├── rates.css
│ └── settings.css
│
├── icons/
│ ├── apple-touch-icon.png
│ ├── favicon-96x96.png
│ ├── favicon.ico
│ ├── favicon.svg
│ ├── web-app-manifest-192x192.png
│ └── web-app-manifest-512x512.png
│
├── images/
│ ├── gallery/
│ └── logo.svg
│
├── js/
│ ├── components/
│ │ └── navbar.js
│ ├── core/
│ │ ├── app.js
│ │ ├── router.js
│ │ └── router-instance.js
│ ├── pages/
│ │ ├── calculator.js
│ │ ├── home.js
│ │ ├── pasajes.js
│ │ ├── rates.js
│ │ └── settings.js
│ └── services/
│ └── notifications.js
│
├── social/
│ ├── avatar.png
│ ├── og-image.png
│ └── social-400x400.png
│
├── sounds/
│
├── index.html
├── manifest.json
├── service-worker.js
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

- La app es **personal**, hecha por y para Verónica y Gabriel. Si alguien más la encuentra útil, qué bonito, pero no es nuestro objetivo. 😅
- El Service Worker ya funciona, así que la app se puede instalar y usar offline parcialmente desde ahora.
- Los datos de tasas de cambio requerirán internet para actualizarse.
- El diseño prioriza móvil, pero se ve bien en tablets y escritorio.

---

## Nota personal 💕

Este proyecto es un diario de aprendizaje y un regalo digital. Todo lo que está aquí lo hemos ido construyendo paso a paso, y aunque falte mucho, cada línea tiene cariño.

Gracias por existir, Mi Vica. 💗💕

---

<div align="center">

Hecho con 💗 por Verónica y Gabriel.

</div>
