// Equipo/CardEquipo/CardEquipo.jsx
import React, { useState } from 'react';
import EditImg from '../../../assets/editarGrupo.png';

const CardEquipo = ({ equipo, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatFecha = (timestamp) => {
    if (!timestamp) return 'No disponible';
    const fecha = new Date(timestamp);
    return fecha.toLocaleDateString('es-AR');
  };

  const formatMonto = (monto) => {
    if (!monto) return 'No disponible';
    return `$${monto.toLocaleString('es-AR')}`;
  };

  return (
    <div 
      className={`card-equipo ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="card-header">
        <div className='card-titulo'>
          <div className="avatar-circle">E</div>
          <h3 className="equipo-nombre">{equipo.denominacion || 'Equipamiento'}</h3>
        </div>
        {isExpanded && (
          <div className='card-info'>
            <ul className="info-list">
              <li><strong>Denominación:</strong> {equipo.denominacion || 'N/A'}</li>
              <li><strong>Grupo:</strong> {equipo.grupo?.nombreGrupo || 'Sin grupo'}</li>
              <li><strong>Fecha de incorporación:</strong> {formatFecha(equipo.fechaIncorporacion)}</li>
              <li><strong>Monto invertido:</strong> {formatMonto(equipo.montoInvertido)}</li>
              <li><button className="link-button">Descipcción</button></li>
              { /*<li><strong>Descripción:</strong> {equipo.descripcion || 'Sin descripción'}</li>*/ }
            </ul>
          </div>
        )}
      </div>
      
      {isExpanded && (
        <>
          <div className="action-buttons">
            <button 
              className="btn-icon btn-delete" 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(equipo.oidEquipo);
              }}
              title="Eliminar equipo"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
            <button 
              className="btn-icon btn-edit" 
              onClick={(e) => {
                e.stopPropagation();
                onEdit(equipo);
              }}
              title="Editar equipo"
            >
              <img className="btn-edit-icon" src={EditImg} alt="Editar" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CardEquipo;