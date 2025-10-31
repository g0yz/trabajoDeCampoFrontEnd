import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LogIn from "./components/LogIn/LogIn";
import Home from "./components/Home/Home";
import "./App.css";

export default App;

function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* Ruta inicial: si no está logueado, va a login, si sí, redirige al home */}
            <Route
              path="/login"
              element={
                !usuario ? <LogIn setUsuario={setUsuario} /> : <Navigate to="/home" />
              }
            />
            {/* Ruta protegida para Home */}
            <Route
              path="/home"
              element={
                usuario ? <Home usuario={usuario} /> : <Navigate to="/" />
              }
              
            />


          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}
