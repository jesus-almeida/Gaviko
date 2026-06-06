// SERVICE WORKER
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration =
        await navigator.serviceWorker.register("/service-worker.js");
      console.log("SW registrado: ", registration);
    } catch (error) {
      console.error("Error al registrar el SW: ", error);
    }
  });
}
