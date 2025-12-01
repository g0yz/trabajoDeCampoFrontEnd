import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Pasantes from "./BecariosPersonalEnFormacion/Pasantes";
import Doctorado from "./BecariosPersonalEnFormacion/Doctorado";
import BecariosAlumnos from "./BecariosPersonalEnFormacion/BecariosAlumnos";
import BecarioGraduado from "./BecariosPersonalEnFormacion/BecarioGraduado";
import Maestria from "./BecariosPersonalEnFormacion/Maestria";
import ProyectosFinales from "./BecariosPersonalEnFormacion/ProyectosFinales";

import "./Personal.css";

const Personal = () => {
  return (
    <div className="personal-container">
      <nav className="personal-menu">
        <NavLink to="pasantes" className="personal-link">Pasantes</NavLink>
        <NavLink to="doctorado" className="personal-link">Doctorado</NavLink>
        <NavLink to="alumnos" className="personal-link">Becarios Alumnos</NavLink>
        <NavLink to="graduado" className="personal-link">Becario Graduado</NavLink>
        <NavLink to="maestria" className="personal-link">Maestría / Especialización</NavLink>
        <NavLink to="proyectos" className="personal-link">Proyectos Finales / Tesinas</NavLink>
      </nav>

      <div className="personal-content">
        <Routes>
          <Route path="pasantes" element={<Pasantes />} />
          <Route path="doctorado" element={<Doctorado />} />
          <Route path="alumnos" element={<BecariosAlumnos />} />
          <Route path="graduado" element={<BecarioGraduado />} />
          <Route path="maestria" element={<Maestria />} />
          <Route path="proyectos" element={<ProyectosFinales />} />

          {/* default */}
          <Route path="*" element={<Pasantes />} />
        </Routes>
      </div>
    </div>
  );
};

export default Personal;
