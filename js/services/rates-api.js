// ============================================
// RATES-API.SERVICE
// Obtiene tasas reales de Supabase con caché offline.
// ============================================

const SUPABASE_URL = "https://fnvdkuhmdkwsnukwbshs.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZudmRrdWhtZGt3c251a3dic2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExODAzNTIsImV4cCI6MjA5Njc1NjM1Mn0.CgwfETaeDiSKnJ7B0c4B19lMs19Xct1Yzix0mjJX5f0";

/**
 * Obtiene las tasas de Supabase o devuelve caché/offline.
 * @returns {Promise<{rates: Object, isLive: boolean}>}
 */
export async function fetchLiveRates() {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/get_rates`, {
      headers: { Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    });

    if (!res.ok) throw new Error("API error");

    const data = await res.json();

    // Guardar en localStorage
    localStorage.setItem("live_rates", JSON.stringify(data.rates));
    localStorage.setItem("rates_updated_at", new Date().toISOString());

    return { rates: data.rates, isLive: true };
  } catch (error) {
    // Fallback a caché
    const cached = localStorage.getItem("live_rates");
    if (cached) {
      return { rates: JSON.parse(cached), isLive: false };
    }

    // Fallback final: valores por defecto
    return {
      rates: { bcv: 0.01, euro: 0.01 },
      isLive: false,
    };
  }
}

/**
 * Obtiene las tasas cacheadas y la fecha de última actualización.
 * @returns {{ rates: Object|null, updatedAt: Date|null }}
 */
export function getCachedRates() {
  const cached = localStorage.getItem("live_rates");
  const updatedAt = localStorage.getItem("rates_updated_at");
  return {
    rates: cached ? JSON.parse(cached) : null,
    updatedAt: updatedAt ? new Date(updatedAt) : null,
  };
}

/**
 * Verifica si debe refrescar las tasas (han pasado más de 30 min).
 * @returns {boolean}
 */
export function shouldRefreshRates() {
  const { updatedAt } = getCachedRates();
  if (!updatedAt) return true;
  const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos
  return Date.now() - updatedAt.getTime() > CACHE_DURATION;
}
