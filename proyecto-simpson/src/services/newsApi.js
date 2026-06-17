// ============================================================
// Servicio de noticias — Integrado con arXiv API (Science & Math)
// ============================================================

export const obtenerNoticiasMatematicas = async () => {
  try {
    const res = await fetch('/api/noticias');
    if (!res.ok) {
      throw new Error('Error al conectar con la API de noticias (arXiv)');
    }
    const text = await res.text();
    
    // Parseamos el XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    const entries = xmlDoc.getElementsByTagName("entry");
    
    const noticias = [];
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const title = entry.getElementsByTagName("title")[0]?.textContent || "Sin título";
      const summary = entry.getElementsByTagName("summary")[0]?.textContent || "Sin descripción";
      const id = entry.getElementsByTagName("id")[0]?.textContent || "";
      const author = entry.getElementsByTagName("author")[0]?.getElementsByTagName("name")[0]?.textContent || "Autor desconocido";
      const published = entry.getElementsByTagName("published")[0]?.textContent || "";
      
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
    console.error("Error obteniendo noticias:", error);
    return []; // Retornar vacío en caso de error para que la UI no se rompa
  }
};
