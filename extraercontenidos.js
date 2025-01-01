const fs = require("fs");
const path = require("path");

const outputFile = path.join(__dirname, "exportacioncontenidos.txt");
const scriptFileName = "extraercontenidos.js";

function recorrerDirectorio(directorio) {
  let resultado = "";
  const archivos = fs.readdirSync(directorio);

  for (const archivo of archivos) {
    if (archivo.startsWith(".")) continue; // Ignorar archivos y carpetas ocultas

    const rutaCompleta = path.join(directorio, archivo);
    const stats = fs.statSync(rutaCompleta);

    if (stats.isDirectory()) {
      resultado += recorrerDirectorio(rutaCompleta);
    } else if (stats.isFile() && archivo !== scriptFileName) {
      const contenido = fs.readFileSync(rutaCompleta, "utf8");
      const rutaRelativa = path.relative(__dirname, rutaCompleta);
      resultado += `ARCHIVO: /${rutaRelativa} ->\n"\n${contenido.replace(
        /"/g,
        '\\"'
      )}\n"\n\n`;
    }
  }
  return resultado;
}

try {
  const contenido = recorrerDirectorio(__dirname);
  fs.writeFileSync(outputFile, contenido, "utf8");
  console.log("Extracción completada en exportacioncontenidos.txt");
} catch (error) {
  console.error("Error durante la extracción:", error);
}
