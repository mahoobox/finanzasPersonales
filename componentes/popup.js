class Popup {
  static init() {
    // Mantenemos la estructura principal del popup para mensajes simples
    const popupHTML = `
      <div id="popup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
        <div class="bg-white rounded-lg p-6 shadow-lg max-w-md text-center relative">
          <div class="flex justify-center mb-4">
            <div id="popupIcon" class="text-6xl"></div>
          </div>
          <h2 id="popupMessage" class="text-xl font-semibold mb-4"></h2>
          <div id="popupButtons" class="flex justify-center space-x-4"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", popupHTML);
  }

  static mostrar(tipo, mensaje) {
    // Usado para mensajes con un único botón 'Cerrar'
    const popup = document.getElementById("popup");
    const popupIcon = document.getElementById("popupIcon");
    const popupMessage = document.getElementById("popupMessage");
    const popupButtons = document.getElementById("popupButtons");

    // Íconos según tipo
    const iconos = {
      error: "❌",
      success: "✅",
      warning: "⚠️",
      info: "ℹ️",
    };

    popupMessage.textContent = mensaje;
    popupIcon.innerHTML = iconos[tipo] || "ℹ️";

    // Limpiamos los botones previos (por si veníamos de una confirmación)
    popupButtons.innerHTML = "";

    // Creamos el botón 'Cerrar'
    const btnCerrar = document.createElement("button");
    btnCerrar.textContent = "Cerrar";
    btnCerrar.className =
      "bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600";
    btnCerrar.onclick = () => Popup.cerrar();
    popupButtons.appendChild(btnCerrar);

    // Mostramos
    popup.classList.remove("hidden");
  }

  static confirmar(
    mensaje,
    {
      onOk = () => {},
      onCancel = () => {},
      okText = "Sí",
      cancelText = "Cancelar",
      tipo = "warning",
    } = {}
  ) {
    // Usado para mensajes que requieran confirmación con dos botones
    const popup = document.getElementById("popup");
    const popupIcon = document.getElementById("popupIcon");
    const popupMessage = document.getElementById("popupMessage");
    const popupButtons = document.getElementById("popupButtons");

    const iconos = {
      error: "❌",
      success: "✅",
      warning: "⚠️",
      info: "ℹ️",
    };

    popupMessage.textContent = mensaje;
    popupIcon.innerHTML = iconos[tipo] || "ℹ️";

    // Limpiamos los botones previos
    popupButtons.innerHTML = "";

    // Botón Sí
    const btnSi = document.createElement("button");
    btnSi.textContent = okText;
    btnSi.className =
      "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600";
    btnSi.onclick = () => {
      onOk();
      Popup.cerrar();
    };
    popupButtons.appendChild(btnSi);

    // Botón Cancelar
    const btnCancelar = document.createElement("button");
    btnCancelar.textContent = cancelText;
    btnCancelar.className =
      "bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500";
    btnCancelar.onclick = () => {
      onCancel();
      Popup.cerrar();
    };
    popupButtons.appendChild(btnCancelar);

    popup.classList.remove("hidden");
  }

  static cerrar() {
    document.getElementById("popup").classList.add("hidden");
  }
}
