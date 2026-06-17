import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './components';
import { Inicio, Equipo, Acerca, Noticias, Calculadora, Contactos, Estadisticas, Login } from './pages';
import { registrarVisita } from './services/db';
import './index.css';

// Componente para registrar la visita al cargar la ruta (por si se entra directamente por URL)
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    let pagina = 'Desconocida';
    switch (location.pathname) {
      case '/': pagina = 'Inicio'; break;
      case '/equipo': pagina = 'Equipo'; break;
      case '/acerca': pagina = 'Acerca'; break;
      case '/noticias': pagina = 'Noticias'; break;
      case '/calculadora': pagina = 'Calculadora'; break;
      case '/contactos': pagina = 'Contactos'; break;
      case '/estadisticas': pagina = 'Estadisticas'; break;
      default: break;
    }

    registrarVisita(pagina).catch(() => { });
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <RouteTracker />
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            {/* Rutas futuras para Jhonny y Sahid Ronda 2 */}
            <Route path="/equipo" element={<Equipo />} />
            <Route path="/acerca" element={<Acerca />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/calculadora" element={<Calculadora />} />
            <Route path="/contactos" element={<Contactos />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
