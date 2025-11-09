import React from 'react';
import '../Alertas.css';

const AlertaBase = ({ img, tipo, titulo, mensaje,close, cancel, aceptar }) => {
  return (
    <div className={`alerta-overlay ${tipo}`}>
      <div className="alerta-contenedor">
        <div className="alerta-icono">
          <img src={img} alt="icono alerta" className="alerta-img" />
        </div>
        <button className="alerta-cerrar" onClick={close}><i className="fa-solid fa-x"></i></button>

        <h2 className="alerta-titulo">{titulo}</h2>
        <p className="alerta-mensaje">{mensaje}</p>

        <div className="alerta-botones">
            {/* Muestra el boton de cancelar si se le dad uso, sino solo se ve el aceptar*/}
            {cancel && (
                <button className="btn-cancelar" onClick={cancel}>Cancelar</button>
            )}

          {aceptar && (
            <button className="btn-aceptar" onClick={aceptar}>Aceptar</button>
          )}

          </div>
      </div>
        <div className="alerta-footer">
            
        </div>
    </div>
  );
};

export default AlertaBase;
