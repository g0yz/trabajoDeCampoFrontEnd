import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LogIn from "./components/LogIn/LogIn";
import SingUp from "./components/SingUp/SingUp";
import Home from "./components/Home/Home";
import "./App.css";



export default App;

function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <BrowserRouter>
        <header className="App-header">
            LOGO
        </header>
      <div className="App-body">
          {/*<div className="App-body">*/}
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
                  path="/signup"
                  element={ !usuario ? <SingUp /> : <Navigate to="/home" /> }
              />

              {/* Ruta protegida para Home */}
              <Route
                  path="/home"
                  element={
                      <Home />
                  }

              />
          </Routes>
              {/*</div>*/}
      </div>
    </BrowserRouter>
  );
}
