class Popup {
  static init() {
    const popupHTML = `
      <div id="popup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
        <div class="bg-white rounded-lg p-6 shadow-lg max-w-md text-center relative">
          <div class="flex justify-center mb-4">
            <div id="popupIcon" class="text-6xl"></div>
          </div>
          <h2 id="popupMessage" class="text-xl font-semibold mb-4"></h2>
          <button onclick="Popup.cerrar()" class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Cerrar
          </button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", popupHTML);
  }

  static mostrar(tipo, mensaje) {
    const popup = document.getElementById("popup");
    const popupIcon = document.getElementById("popupIcon");
    const popupMessage = document.getElementById("popupMessage");

    const iconos = {
      error: "❌",
      success: "✅",
      warning: "⚠️",
      info: "ℹ️",
    };

    popupMessage.textContent = mensaje;
    popupIcon.innerHTML = iconos[tipo] || "ℹ️";
    popup.classList.remove("hidden");
  }

  static cerrar() {
    document.getElementById("popup").classList.add("hidden");
  }
}
