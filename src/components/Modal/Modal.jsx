import React from 'react';
import './Modal.css';

const Modal = ({ 
  title, 
  onClose, 
  onConfirm, 
  children,
  showConfirm = true,
  showCancel = false,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  size = "medium" // small, medium, large
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-container modal-${size}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body - Contenido dinámico */}
        <div className="modal-body">
          {children}
        </div>

        {/* Footer - Botones */}
        <div className="modal-footer">
          {showCancel && (
            <button 
              className="modal-btn modal-btn-cancel" 
              onClick={onClose}
            >
              {cancelText}
            </button>
          )}
          {showConfirm && (
            <button 
              className="modal-btn modal-btn-confirm" 
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;