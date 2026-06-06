import { Router } from "./router.js";
import { renderBasicCalculator } from "../pages/calculator.js";
import { renderPasajes } from "../pages/pasajes.js";
import { renderHome } from "../pages/home.js";
import { renderTasas } from "../pages/rates.js";
import { renderSettings } from "../pages/settings.js";

const router = new Router();

//REGISTRAR VISTAS

// Renderizar Inicio
router.register("inicio", renderHome);
// Renderizar Calculadora
router.register("calculadora", renderBasicCalculator);
// Renderizar Calculadora de Pasajes
router.register("pasajes", renderPasajes);
// Renderizar Tasas
router.register("tasa", renderTasas);
// Renderizar Ajustes
router.register("ajustes", renderSettings);

export default router;
