import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import './CuerpoModal.css';

/**
 * CuerpoModalCrearForm
 * 
 * Componente para formularios de creación
 * 
 * Props:
 * - fields: array → Configuración de campos del formulario
 *   Ejemplo: [
 *     { name: 'nombre', label: 'Nombre', type: 'text', required: true },
 *     { name: 'email', label: 'Email', type: 'email' },
 *     { name: 'rol', label: 'Rol', type: 'select', options: [...] }
 *   ]
 * - onSubmit: function → Callback con los datos del formulario
 * - initialValues: object → Valores iniciales (opcional)
 */

const CuerpoModalCrearForm = ({ 
  fields = [], 
  onSubmit, 
  initialValues = {} 
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    let newValue;
    if (type === 'checkbox') {
      newValue = checked;
    } else if (type === 'file') {
      newValue = files[0];
    } else {
      newValue = value;
    }
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} es requerido`;
      }
      
      // Validación adicional para números
      if (field.type === 'number' && formData[field.name]) {
        const numValue = parseFloat(formData[field.name]);
        if (isNaN(numValue) || numValue < 0) {
          newErrors[field.name] = `${field.label} debe ser un número válido`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      id: field.name,
      onChange: handleChange,
      required: field.required,
      disabled: field.disabled
    };

    switch (field.type) {
      case 'select':
        return (
          <select 
            {...commonProps} 
            value={formData[field.name] || ''}
            className="form-input form-select"
          >
            <option value="">Seleccionar...</option>
            {field.options?.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea 
            {...commonProps}
            value={formData[field.name] || ''}
            className="form-input form-textarea"
            rows={field.rows || 4}
            placeholder={field.placeholder}
          />
        );

      case 'file':
        return (
          <div className="file-input-wrapper">
            <input
              type="file"
              name={field.name}
              id={field.name}
              onChange={handleChange}
              className="form-input-file"
              accept={field.accept}
            />
            <label htmlFor={field.name} className="file-input-label">
              <span className="upload-icon">☁️</span>
              <span>{formData[field.name]?.name || 'Seleccionar archivo'}</span>
            </label>
          </div>
        );

      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={field.name}
            id={field.name}
            checked={formData[field.name] || false}
            onChange={handleChange}
            className="form-checkbox"
          />
        );

      case 'date':
        return (
          <input
            {...commonProps}
            type="date"
            value={formData[field.name] || ''}
            className="form-input"
          />
        );

      case 'number':
        return (
          <input
            {...commonProps}
            type="number"
            value={formData[field.name] || ''}
            className="form-input"
            placeholder={field.placeholder}
            step={field.step || 'any'}
            min={field.min || 0}
          />
        );

      default:
        return (
          <input
            {...commonProps}
            type={field.type || 'text'}
            value={formData[field.name] || ''}
            className="form-input"
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <form className="cuerpo-modal-form" ref={formRef} onSubmit={handleSubmit}>
      <div className="form-grid">
        {fields.map((field, index) => (
          <div 
            key={index} 
            className={`form-field ${field.fullWidth ? 'full-width' : ''}`}
          >
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="required-mark">*</span>}
            </label>
            
            {renderField(field)}
            
            {errors[field.name] && (
              <span className="form-error">{errors[field.name]}</span>
            )}
          </div>
        ))}
      </div>
    </form>
  );
};

export default CuerpoModalCrearForm;