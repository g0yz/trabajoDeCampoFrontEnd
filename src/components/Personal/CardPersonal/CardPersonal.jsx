import React, { useState } from "react";
import "./CardPersonal.css";
import PersonaIcon from "../../../assets/persona.png";
import EditImg from '../../../assets/editarGrupo.png';

const CardPersonal = ({ persona, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de eliminar a ${persona.nombre} ${persona.apellido}?`)) {
      console.log('Eliminar persona:', persona);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    console.log('Editar persona:', persona);
  };

  return (
    <div
      className={`
        card-personal 
        ${isExpanded ? "expanded" : ""} 
        ${isExpanded && index % 3 === 0 ? "left-col" : ""} 
        ${isExpanded && index % 3 === 1 ? "center-col" : ""} 
        ${isExpanded && index % 3 === 2 ? "right-col" : ""}
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      
      {/* HEADER */}
      <div className="personal-header">
        <div className="personal-title">
          <div className="personal-avatar">
            <img src={PersonaIcon} alt="usuario" />
          </div>
          <h3 className="personal-nombre">
            {persona.nombre} {persona.apellido}
          </h3>
        </div>
      </div>

      {/* BODY - Solo se muestra si está expandido */}
      {isExpanded && (
        <>
          <div className="personal-body">
            <ul className="personal-info-list">
              {persona.horas && (
                <li>
                  <strong>Horas semanales:</strong> {persona.horas}
                </li>
              )}
              {persona.financiacion && (
                <li>
                  <strong>Fuente de financiación:</strong> {persona.financiacion}
                </li>
              )}
              {persona.director && (
                <li>
                  <strong>Director:</strong> {persona.director}
                </li>
              )}
              {persona.tema && (
                <li>
                  <strong>Tema:</strong> {persona.tema}
                </li>
              )}
              {persona.area && (
                <li>
                  <strong>Área:</strong> {persona.area}
                </li>
              )}
              {persona.cargo && (
                <li>
                  <strong>Cargo:</strong> {persona.cargo}
                </li>
              )}
              {persona.rol && (
                <li>
                  <strong>Rol:</strong> {persona.rol}
                </li>
              )}
            </ul>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="action-buttons-personal">
            <button 
              className="btn-icon-personal btn-delete-personal" 
              onClick={handleDelete}
              title="Eliminar"
            >
              <i className="fa-solid fa-trash"></i>
            </button>

            <button 
              className="btn-icon-personal btn-edit-personal" 
              onClick={handleEdit}
              title="Editar"
            >
              <img className="btn-edit-icon-personal" src={EditImg} alt="Editar" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPersonal;
