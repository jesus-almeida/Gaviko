# G&V

> Tu calculadora personal para pasajes y mucho más.

<div align="center">

![Logo G&V](https://img.shields.io/badge/G%26V-Calculator-FF6B6B?style=for-the-badge&logo=heart&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-Supported-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

</div>

---

## Descripcion del proyecto

**G&V** es una aplicacion web progresiva (PWA) disenada para facilitar el calculo de pasajes y consultas de tasas en Venezuela. Desarrollada con tecnologias web modernas, ofrece una experiencia rapida, responsiva y accesible desde cualquier dispositivo.

Esta aplicacion fue creada con amor para hacer mas facil el dia a dia de quienes necesitan calcular rapidamente costos de transporte y consultar tasas actualizadas.

---

## Caracteristicas principales

### 1. Inicio
Pagina principal con presentacion del proyecto, navegacion rapida a todas las secciones y animaciones fluidas.

### 2. Calculadora de Pasajes
Permite calcular rapidamente el costo de pasajes basado en la distancia y tarifas configurables. Ideal para estimar viajes en transporte publico.

### 3. Tasas Venezuela
Panel de consulta de tasas de cambio actuales para Venezuela. Actualizaciones automaticas y historial de tasas recientes.

### 4. Calculadora Basica
Calculadora clasica para operaciones matematicas basicas: suma, resta, multiplicacion y division.

### 5. Contador de Tiempo Juntos
Contador emocional que muestra el tiempo transcurrido desde una fecha especial (inicio de relacion/amistad), con cuenta regresiva para proximos eventos.

---

## Tecnologias utilizadas

| Tecnologia | Descripcion |
|------------|-------------|
| **HTML5** | Lenguaje de marcado para la estructura del contenido |
| **CSS3** | Hojas de estilo para el diseno visual |
| **JavaScript ES6+** | Logica de aplicacion y manipulacion del DOM |
| **PWA** | Aplicacion web progresiva con soporte offline |

### Caracteristicas tecnicas
- Arquitectura modular con separation of concerns
- SPA (Single Page Application) con sistema de enrutamiento
- Almacenamiento local con LocalStorage
- Notificaciones push
- Compatible con pantallas tactiles moviles

---

## Estructura del proyecto

```
GV-Calculator/
|
|-- .github/
|   |-- workflows/
|   |   |-- deploy.yml              # Pipeline CI/CD para deploy
|
|-- public/
|   |-- icons/                      # Iconos PWA (multiples tamanos)
|   |   |-- icon-72x72.png
|   |   |-- icon-96x96.png
|   |   |-- icon-128x128.png
|   |   |-- icon-144x144.png
|   |   |-- icon-152x152.png
|   |   |-- icon-192x192.png
|   |   |-- icon-384x384.png
|   |   |-- icon-512x512.png
|   |   |-- maskable-icon.png
|   |
|   |-- images/
|   |   |-- logo.svg                # Logo principal
|   |   |-- hero-bg.webp            # Imagen de fondo hero
|   |   |-- gallery/                # Galeria de imagenes
|   |
|   |-- sounds/
|       |-- notification.mp3         # Sonido de notificaciones
|
|-- src/
|   |
|   |-- css/
|   |   |-- base/                   # Estilos base
|   |   |   |-- reset.css           # Reset CSS normalize
|   |   |   |-- variables.css       # Variables CSS (colores, fuentes)
|   |   |   |-- typography.css      # Estilos tipograficos
|   |   |   |-- utilities.css       # Clases utilitarias
|   |   |
|   |   |-- components/             # Componentes reutilizables
|   |   |   |-- buttons.css         # Estilos de botones
|   |   |   |-- cards.css           # Estilos de tarjetas
|   |   |   |-- navbar.css          # Navegacion
|   |   |   |-- footer.css          # Pie de pagina
|   |   |   |-- loader.css          # Indicador de carga
|   |   |   |-- modal.css           # Ventanas modales
|   |   |   |-- toast.css           # Notificaciones toast
|   |   |
|   |   |-- layouts/                # Estructuras de layout
|   |   |   |-- header.css          # Encabezado
|   |   |   |-- main.css            # Contenedor principal
|   |   |   |-- container.css       # Contenedor responsivo
|   |   |
|   |   |-- pages/                  # Estilos por pagina
|   |       |-- home.css
|   |       |-- calculator.css
|   |       |-- rates.css
|   |       |-- basic-calculator.css
|   |       |-- timer.css
|   |
|   |-- js/
|   |   |-- config/
|   |   |   |-- relationship.js     # Configuracion de relacion
|   |   |
|   |   |-- core/                   # Nucleo de la aplicacion
|   |   |   |-- app.js              # Inicializacion principal
|   |   |   |-- router.js           # Sistema de rutas
|   |   |   |-- storage.js          # Manejo de LocalStorage
|   |   |
|   |   |-- utils/                  # Utilidades
|   |   |   |-- helpers.js          # Funciones helper
|   |   |   |-- formatters.js       # Formateadores de datos
|   |   |   |-- validators.js       # Validadores
|   |   |
|   |   |-- services/               # Servicios externos
|   |   |   |-- rates-api.js        # API de tasas
|   |   |   |-- notifications.js    # Servicio de notificaciones
|   |   |
|   |   |-- components/             # Componentes JS
|   |   |   |-- navbar.js           # Componente navbar
|   |   |   |-- toast.js            # Componente toast
|   |   |   |-- loader.js           # Componente loader
|   |   |
|   |   |-- pages/                  # Logica por pagina
|   |       |-- home.js
|   |       |-- calculator.js
|   |       |-- rates.js
|   |       |-- basic-calculator.js
|   |       |-- timer.js
|   |
|   |-- pages/                      # Plantillas HTML
|       |-- index.html
|       |-- calculator.html
|       |-- rates.html
|       |-- basic-calculator.html
|       |-- timer.html
|
|-- sw.js                           # Service Worker
|-- .gitignore
|-- package.json
|-- README.md
```

---

## Instalacion y ejecucion

### Prerrequisitos
- Node.js v18+ (opcional, solo si usas scripts npm)
- Git

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/usuario/gv-calculator.git
cd gv-calculator
```

2. **Ejecutar con servidor local**

Usando Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Usando Node.js:
```bash
npx serve
```

Usando PHP:
```bash
php -S localhost:8000
```

3. **Abrir en navegador**
```
http://localhost:8000/src/pages/index.html
```

---

## Instalacion de PWA en movil

La aplicacion puede instalarse en tu dispositivo movil como una app nativa:

### En Android (Chrome)

1. Abre la aplicacion en Chrome movil
2. Toca el menu de tres puntos (竖)
3. Selecciona **"Agregar a pantalla de inicio"** o **"Instalar app"**
4. Confirma tocando **"Agregar"**

### En iOS (Safari)

1. Abre la aplicacion en Safari
2. Toca el icono de **compartir** (cuadro con flecha)
3. Desplazate y selecciona **"Agregar a pantalla de inicio"**
4. Toca **"Agregar"** en la esquina superior derecha

### Beneficios de la PWA

| Beneficio | Descripcion |
|-----------|-------------|
| Acceso rapido | Icono en pantalla de inicio |
| Sin App Store | No requiere descargar de tiendas |
| Funciona offline | Funciona sin conexion a internet |
| Peso ligero | Solo unos pocos MB |
| Actualizaciones automaticas | Siempre tienes la ultima version |

---

## Notas importantes

- **Tasas de cambio**: Los datos de tasas se actualizan periodicamente. Se recomienda conexion a internet para obtener valores actualizados.

- **Configuracion personal**: El Contador de Tiempo Juntos permite personalizar la fecha de inicio en el archivo `src/js/config/relationship.js`.

- **Modo offline**: La aplicacion funciona parcialmente sin conexion, pero algunas funcionalidades requeriran internet.

- **Responsive design**: La interfaz esta optimizada para moviles, tablets y escritorio.

- **Accesibilidad**: El proyecto sigue las mejores practicas de accesibilidad web (WCAG).

---

## Roadmap / Futuro

- [ ] Agregar modo oscuro
- [ ] Soporte multiidioma (ingles/espanol)
- [ ] Historial de tasas con graficos
- [ ] Notificaciones push personalizadas
- [ ] Integracion con APIs de transporte
- [ ] Tests unitarios
- [ ] Documentacion API

---

## Contribuir

1. Haz un fork del proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-funcion`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcion'`)
4. Push a la rama (`git push origin feature/nueva-funcion`)
5. Abre un Pull Request

---

<div align="center">

Hecho con ❤️ para Gabi y Vero

</div>