// ============================================================
// Servicio de noticias — Integrado con arXiv API (Science & Math)
// ============================================================

/**
 * Se conecta a la API de arXiv para obtener las últimas publicaciones científicas.
 * Retorna un arreglo de objetos listos para ser renderizados por los componentes de React.
 * @returns {Array} Lista de noticias o artículos científicos sobre matemáticas.
 */
// Exportamos la función asíncrona para obtener noticias matemáticas desde arXiv
export const obtenerNoticiasMatematicas = async () => {
  // Iniciamos bloque try-catch para capturar posibles errores de red o parseo
  try {
    // Obtenemos la URL de la API desde las variables de entorno de Vite
    const apiUrl = import.meta.env.VITE_API_URL;
    // Imprimimos la URL original en consola para depuración
    console.log("VITE_API_URL is:", apiUrl);
    
    // Usamos un proxy CORS (corsproxy.io) para evitar problemas de Same-Origin Policy (CORS)
    // al intentar consumir la API externa directamente desde el navegador (cliente).
    // Construimos la URL pasando nuestra apiUrl original codificada
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;
    // Imprimimos la URL resultante que usará el proxy
    console.log("Fetching from:", proxyUrl);
    
    // Hacemos la petición a la URL con el proxy
    const res = await fetch(proxyUrl);
    // Si el proxy o la API subyacente devuelven error HTTP, lanzamos una excepción
    if (!res.ok) {
      // Lanzamos un error que incluye el código HTTP recibido
      throw new Error(`Error HTTP: ${res.status}`);
    }
    // Obtenemos la respuesta del servidor como texto crudo, porque no es JSON
    const text = await res.text();
    // Registramos en consola la longitud del XML recibido
    console.log("Respuesta recibida, longitud:", text.length);

    // La API de arXiv responde con formato XML en lugar de JSON.
    // Usamos DOMParser nativo del navegador para convertir el texto en un árbol DOM navegable.
    // Creamos una nueva instancia del parser del DOM
    const parser = new DOMParser();
    // Parseamos la cadena XML transformándola en un documento de tipo "text/xml"
    const xmlDoc = parser.parseFromString(text, "text/xml");
    
    // Obtenemos todos los nodos <entry> que representan cada artículo devuelto
    // y los guardamos en la variable entries (es similar a un array)
    const entries = xmlDoc.getElementsByTagName("entry");

    // Inicializamos un arreglo vacío para almacenar los objetos de noticias formateados
    const noticias = [];
    // Iteramos por cada <entry> obtenido del XML
    for (let i = 0; i < entries.length; i++) {
      // Guardamos la referencia al entry actual
      const entry = entries[i];
      // Extraemos el texto del nodo <title>. Si no existe, usamos "Sin título"
      const title = entry.getElementsByTagName("title")[0]?.textContent || "Sin título";
      // Extraemos el texto del nodo <summary>. Si no existe, usamos "Sin descripción"
      const summary = entry.getElementsByTagName("summary")[0]?.textContent || "Sin descripción";
      // Extraemos el texto del nodo <id>. Contiene generalmente la URL del artículo. Si no, queda vacío.
      const id = entry.getElementsByTagName("id")[0]?.textContent || "";
      // Buscamos dentro de <author> el nodo <name> para extraer el nombre del autor
      const author = entry.getElementsByTagName("author")[0]?.getElementsByTagName("name")[0]?.textContent || "Autor desconocido";
      // Extraemos el contenido de <published> para la fecha de publicación
      const published = entry.getElementsByTagName("published")[0]?.textContent || "";

      // Mapeamos los datos en bruto del XML a una estructura de objeto limpia
      // y la pusheamos al array noticias
      noticias.push({
        // Asignamos el id (normalmente URL en arXiv)
        id: id,
        // Limpiamos los saltos de línea del título y eliminamos espacios de los extremos
        titulo: title.replace(/\n/g, ' ').trim(),
        // Limpiamos los saltos de línea del resumen y limitamos su longitud a 200 caracteres, añadiendo puntos suspensivos
        descripcion: summary.replace(/\n/g, ' ').trim().substring(0, 200) + '...',
        // El enlace directo al artículo es el mismo 'id' proporcionado por arXiv
        enlace: id, // El id de arxiv es la URL al abstract
        // Asignamos el nombre del autor
        autor: author,
        // Convertimos la fecha (cadena) a un objeto Date y luego a una cadena legible local (formato dd/mm/yyyy o mm/dd/yyyy dependiendo de la región)
        fecha: new Date(published).toLocaleDateString()
      });
    }
    // Finalmente, retornamos la lista de noticias convertida a objetos JS
    return noticias;
  // Bloque para atrapar cualquier error en el proceso
  } catch (error) {
    // Imprimimos el error completo en consola para análisis
    console.error("Error detallado obteniendo noticias:", error);
    // Retornamos un array vacío en caso de error para asegurar que el mapeo en UI no arroje un fallo fatal (crash)
    return []; // Retornar vacío en caso de error para que la UI no se rompa
  }
};
