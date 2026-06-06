// ============================================
// ROUTER.JS
// Enrutador SPA basado en hash.
// Permite registrar vistas, navegar y ejecutar
// callbacks tras cada cambio de ruta.
// ============================================

export class Router {
  constructor() {
    this.routes = new Map();
    this._afterChangeCallback = null; // Callback post-cambio
    window.addEventListener("hashchange", () => this._handleRoute());
  }

  /**
   * Registra una ruta.
   * @param {string} routeName
   * @param {Function} renderFn - función que devuelve HTML
   */
  register(routeName, renderFn) {
    if (typeof renderFn !== "function") {
      console.error(`Router: ruta "${routeName}" sin función válida.`);
      return;
    }
    this.routes.set(routeName, renderFn);
  }

  /**
   * Establece un callback que se ejecutará después de cada cambio de ruta exitoso.
   * Recibe el nombre de la ruta como argumento.
   * @param {Function} callback
   */
  onRouteChange(callback) {
    this._afterChangeCallback = callback;
  }

  /**
   * Inicia el router: carga la ruta actual o redirige a 'inicio'.
   */
  init() {
    if (!window.location.hash) {
      window.location.hash = "#inicio";
      return;
    }
    this._handleRoute();
  }

  /**
   * Navega a una ruta.
   * @param {string} routeName
   */
  navigate(routeName) {
    window.location.hash = `#${routeName}`;
  }

  /**
   * Maneja el cambio de hash: renderiza la vista y dispara el callback.
   */
  _handleRoute() {
    const hash = window.location.hash.slice(1) || "inicio";
    const renderFn = this.routes.get(hash);

    if (!renderFn) {
      console.warn(
        `Router: ruta "${hash}" no encontrada. Redirigiendo a inicio.`,
      );
      this.navigate("inicio");
      return;
    }

    // Renderizar vista
    const mainContent = document.getElementById("mainContent");
    if (mainContent) {
      mainContent.innerHTML = renderFn();
    }

    // Emitir evento (para otros posibles usos)
    window.dispatchEvent(
      new CustomEvent("routechange", {
        detail: { route: hash },
      }),
    );

    // Ejecutar callback de post-cambio (para la navbar u otros)
    if (typeof this._afterChangeCallback === "function") {
      this._afterChangeCallback(hash);
    }
  }
}
