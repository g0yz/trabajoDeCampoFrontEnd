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
      cancel={onCancel || onClose}
      aceptar={onAccept}
    />
  );
};

export default Alert;
