import React, { useState } from 'react';
import EditImg from '../../../assets/editarGrupo.png'

const CardGrupo = ({ grupo, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`card-grupo ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="card-header">
        <div className='card-titulo'>
          <div className="avatar-circle">G</div>
          <h3 className="grupo-nombre">{grupo.nombreGrupo}</h3>
        </div>
        <div className='card-info'>
          <ul className="info-list">
            <li><strong>Facultad Regional:</strong> {grupo.sigla}</li>
            <li><strong>Mail:</strong> {grupo.email}</li>
          </ul>
        </div>
      </div>
      
      <div className="card-body">
        <ul className="info-list">
          {isExpanded && (
            <>
              <li><strong>Director:</strong> {grupo.director || 'No asignado'}</li>
              <li><strong>Vice-director:</strong> {grupo.viceDirector || 'No asignado'}</li>
            </>
          )}
        </ul>
        
        {isExpanded && (
          <div className="card-footer">
            <button className="link-button">Objetivos</button>
            <button className="link-button">Organigrama</button>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="action-buttons">
          <button 
            className="btn-icon btn-delete" 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(grupo.oidGrupo);
            }}
            title="Eliminar grupo"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
          <button 
            className="btn-icon btn-edit" 
            onClick={(e) => {
              e.stopPropagation();
              onEdit(grupo);
            }}
            title="Editar grupo"
          >
            <img className="btn-edit-icon" src={EditImg} alt="Editar" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardGrupo;