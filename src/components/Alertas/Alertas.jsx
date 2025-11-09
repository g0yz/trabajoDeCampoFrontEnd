import React from 'react';
import './Alertas.css';
import AlertaBase from './AlertaBase/AlertaBase';

// Imágenes
import ExitoImg from '../../assets/exitoAlert.png';
import AdvertenciaImg from '../../assets/advertenciaAlert.png';
import ErrorImg from '../../assets/errorAlert.png';
import InfoImg from '../../assets/infoAlert.png';

const Alert = ({ type = 'info', title, message, onClose, onAccept, onCancel }) => {
  
  const configs = {
    exito: {
      img: ExitoImg,
      defaultTitle: 'Éxito',
      tipo: 'exito',
    },
    advertencia: {
      img: AdvertenciaImg,
      defaultTitle: 'Advertencia',
      tipo: 'advertencia',
    },
    error: {
      img: ErrorImg,
      defaultTitle: 'Error',
      tipo: 'error',
    },
    info: {
      img: InfoImg,
      defaultTitle: 'Información',
      tipo: 'info',
    },
  };

  const config = configs[type] || configs.info;

  return (
    <AlertaBase
      img={config.img}
      tipo={config.tipo}
      titulo={title || config.defaultTitle}
      mensaje={message}
      cancel={onCancel}
      close={onClose}
      aceptar={onAccept}
    />
  );
};

export default Alert;


/*  EJEMPLO DE USO DE LA ALERTA EN EL NAVBAR

1) Haber importado el useState
import React, { useState } from 'react';

2) crear la variable alert
const [alert, setAlert] = useState(null);


3) Setear el mensaje de la alerta
{Cerrar sesion}
  <button onClick={() => setAlert({
      type: 'advertencia',
      title: 'Atención',
      message: 'Desea cerrar sesión?'
      })} 
      
      className='logOutImg'>
      
      <i className="fa-solid fa-right-from-bracket"></i>
  </button>

4) Mandar los datos a la alerta
  {alert && (
      <Alerta
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null) } ----> Esto es para que cuando presione la X la alerta se cierre
          onCancel={() => setAlert(null) } -------------------IPORTANTE: Si no se pone esta linea, no va a haber un boton de cancelar
          onAccept={() => { setAlert(null); manejarLogout(); }} ----> Esto es para darle la funcionalidad a cerrar sesion y que la alerta desaparezca
        />
    )}
*/