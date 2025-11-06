import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LogIn from "./components/Log/LogIn/LogIn.jsx";
import SingUp from "./components/Log/SingUp/SingUp.jsx";
import Home from "./components/Home/Home";
import Documentacion from "./components/Documentacion/Documentacion";
import Personal from "./components/Personal/Personal";
import Grupos from "./components/Grupos/Grupos";
import Equipo from "./components/Equipo/Equipo.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import "./App.css";

// Componente contenedor de la aplicación que maneja las rutas y el estado del usuario
function ContenedorApp({ usuario, setUsuario }) {
  const ubicacion = useLocation();
// Verifica si la ubicación actual es LogIn o SingUp (para ver el fondo adecuado)
  const estaEnLog = ubicacion.pathname === "/login" || ubicacion.pathname === "/register"; 

  return (
    // Contenedor principal de la aplicación con fondo condicional
    <div className={estaEnLog ? "bg-login" : "bg-main"}>
      <header className="App-header">
      {/* Muestra la barra de navegación solo si el usuario está logueado*/}
        {usuario && <NavBar onLogOut={() => setUsuario(null)} />}
      </header>
      <div className="App-body">
        <Routes>
            {/* Ruta inicial: si no está logueado, va a login, si sí, redirige al home */}
            <Route
              path="/"
              element={
                usuario ? <Navigate to="/home" /> : <Navigate to="/login" />
              }
            />
            {/* Ruta para LogIn */}
            <Route
              path="/login"
              element={
                !usuario ? <LogIn setUsuario={setUsuario} /> : <Navigate to="/home" />
              }
            />
          
            <Route
              path="/register"
              element={ !usuario ? <SingUp /> : <Navigate to="/home" /> }
            />                
          
            {/* Ruta protegida para Home */}
            <Route
              path="/Home"
              element={
                usuario ? <Home usuario={usuario} /> : <Navigate to="/" />
              }
              
            />

            {/*Ruta protegida para Documentacion*/}
            <Route
              path="/documentacion"
              element={ 
                usuario ? <Documentacion usuario={usuario} /> : <Navigate to="/" /> 
              }
            />

            {/*Ruta protegida para Personal*/}
            <Route
              path="/personal"
              element={ 
                usuario ? <Personal usuario={usuario} /> : <Navigate to="/" /> 
              }
            />

            {/*Ruta protegida para Grupo*/}
            <Route
              path="/grupos"
              element={ 
                usuario ? <Grupos usuario={usuario} /> : <Navigate to="/" /> 
              }
            />

            {/*Ruta protegida para Equipo*/}
            <Route
              path="/equipo"
              element={ 
                usuario ? <Equipo usuario={usuario} /> : <Navigate to="/" /> 
              }
            />

          
          
          
          </Routes>
        </div>
    </div>
  );
}

// Componente principal de la aplicación
export default function App() {
  const [usuario, setUsuario] = useState(null);
  
  // Verificar si hay una sesión guardada al cargar la aplicación
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  // Función mejorada para manejar el login y guardar en localStorage
  const manejarLogin = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem("usuario", JSON.stringify(datosUsuario));
  };

  // Función mejorada para manejar el logout y limpiar localStorage
  const manejarLogout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };
  return (
    <BrowserRouter>
      <ContenedorApp usuario={usuario} setUsuario={manejarLogin} />
    </BrowserRouter>
  );
}
