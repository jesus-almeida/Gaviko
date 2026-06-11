import { Router } from "./router.js";
import {
  renderBasicCalculator,
  initBasicCalculator,
} from "../pages/calculator.js";
import { renderPasajes, initPasajes } from "../pages/pasajes.js";
import { renderHome, initHome, destroyHome } from "../pages/home.js";
import { renderTasas, initTasas } from "../pages/rates.js";
import { renderSettings, initSettings } from "../pages/settings.js";

const router = new Router();

router.registerRoute("inicio", renderHome, initHome, destroyHome);
router.registerRoute("calculadora", renderBasicCalculator, initBasicCalculator);
router.registerRoute("pasajes", renderPasajes, initPasajes);
router.registerRoute("tasa", renderTasas, initTasas);
router.registerRoute("ajustes", renderSettings, initSettings);

export default router;
