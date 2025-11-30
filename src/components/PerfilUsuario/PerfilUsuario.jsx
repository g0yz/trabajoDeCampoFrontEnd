import React from 'react';
import './PerfilUsuario.css';

const PerfilUsuario = ({ usuario, onClose, onLogout }) => {
  return (
    <div className="perfil-overlay" onClick={onClose}>
      <div className="perfil-contenedor" onClick={(e) => e.stopPropagation()}>
        <button className="perfil-cerrar" onClick={onClose}>
          <i className="fa-solid fa-x"></i>
        </button>


        <div className="infoUsuario">

            <div className="perfil-avatar">
              {usuario.rol === 'Admin' ? ( <i class="fa-solid fa-user-tie"></i> ) : <i className="fa-solid fa-user"></i>} 
            </div>

            <div className="perfil-info">
              {usuario.rol && (
                <p className="perfil-rol">{usuario.rol}</p>
              )}
              {usuario.grupo && (
                <p className="perfil-grupo">{usuario.grupo}</p>
              )}
              <p className="perfil-email">{usuario.email}</p>
            </div>
        </div>


        <div className="perfil-botones">
        <button className="btn-logout" onClick={onLogout}>
            Cerrar sesión
          </button>
          <button className="btn-salir" onClick={onClose}>
            Salir
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;