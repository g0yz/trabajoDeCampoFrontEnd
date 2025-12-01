import React from 'react';
import './CuerpoModal.css';

/**
 * CuerpoModalInfo
 * 
 * Componente para mostrar información estática en el modal
 * 
 * Props:
 * - content: string | JSX | array → Contenido a mostrar
 * - type: 'text' | 'list' | 'custom' → Tipo de contenido
 */

const CuerpoModalInfo = ({ content, type = 'text' }) => {
  
  // Renderizado según tipo de contenido
  const renderContent = () => {
    switch (type) {
      case 'list':
        if (Array.isArray(content)) {
          return (
            <ul className="info-list">
              {content.map((item, index) => (
                <li key={index} className="info-list-item">
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return <p>{content}</p>;
      
      case 'custom':
        // Para contenido JSX personalizado
        return content;
      
      case 'text':
      default:
        if (typeof content === 'string') {
          return <p className="info-text">{content}</p>;
        }
        return content;
    }
  };

  return (
    <div className="cuerpo-modal-info">
      {renderContent()}
    </div>
  );
};

export default CuerpoModalInfo;