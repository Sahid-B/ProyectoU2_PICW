// ============================================================
// Servicio de noticias — Integrado con arXiv API (Science & Math)
// ============================================================

/**
 * Se conecta a la API de arXiv para obtener las últimas publicaciones científicas.
 * Retorna un arreglo de objetos listos para ser renderizados por los componentes de React.
 * @returns {Array} Lista de noticias o artículos científicos sobre matemáticas.
 */
export const obtenerNoticiasMatematicas = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log("VITE_API_URL is:", apiUrl);
    
    // Usamos un proxy CORS (corsproxy.io) para evitar problemas de Same-Origin Policy (CORS)
    // al intentar consumir la API externa directamente desde el navegador (cliente).
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;
    console.log("Fetching from:", proxyUrl);
    
    const res = await fetch(proxyUrl);
    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }
    const text = await res.text();
    console.log("Respuesta recibida, longitud:", text.length);

    // La API de arXiv responde con formato XML en lugar de JSON.
    // Usamos DOMParser nativo del navegador para convertir el texto en un árbol DOM navegable.
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    
    // Obtenemos todos los nodos <entry> que representan cada artículo devuelto
    const entries = xmlDoc.getElementsByTagName("entry");

    const noticias = [];
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const title = entry.getElementsByTagName("title")[0]?.textContent || "Sin título";
      const summary = entry.getElementsByTagName("summary")[0]?.textContent || "Sin descripción";
      const id = entry.getElementsByTagName("id")[0]?.textContent || "";
      const author = entry.getElementsByTagName("author")[0]?.getElementsByTagName("name")[0]?.textContent || "Autor desconocido";
      const published = entry.getElementsByTagName("published")[0]?.textContent || "";

      // Mapeamos los datos en bruto del XML a una estructura de objeto limpia
      noticias.push({
        id: id,
        titulo: title.replace(/\n/g, ' ').trim(),
        descripcion: summary.replace(/\n/g, ' ').trim().substring(0, 200) + '...',
        enlace: id, // El id de arxiv es la URL al abstract
        autor: author,
        fecha: new Date(published).toLocaleDateString()
      });
    }
    return noticias;
  } catch (error) {
    console.error("Error detallado obteniendo noticias:", error);
    return []; // Retornar vacío en caso de error para que la UI no se rompa
  }
};
