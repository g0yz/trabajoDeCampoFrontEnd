import React, { useState, useEffect, useRef } from 'react';
import './CuerpoModal.css';

/**
 * CuerpoModalEditarForm
 * 
 * Componente para formularios de edición/modificación
 * Similar a CrearForm pero con datos precargados
 * 
 * Props:
 * - fields: array → Configuración de campos
 * - data: object → Datos a editar (precargados)
 * - onSubmit: function → Callback con los datos modificados
 * - showComparison: boolean → Mostrar comparación con valores originales
 */

const CuerpoModalEditarForm = ({ 
  fields = [], 
  data = {},
  onSubmit,
  showComparison = false
}) => {
  const [formData, setFormData] = useState(data);
  const [originalData] = useState(data); // Guardamos los datos originales
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  // Actualizar formData si cambia la prop data
  useEffect(() => {
    setFormData(data);
  }, [data]);

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
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    fields.forEach(field => {
      // No validar campos deshabilitados
      if (field.disabled) return;
      
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
      // Retornar solo los campos que cambiaron (opcional)
      const changedData = {};
      Object.keys(formData).forEach(key => {
        if (formData[key] !== originalData[key]) {
          changedData[key] = formData[key];
        }
      });
      
      onSubmit(formData, changedData);
    }
  };

  const hasChanged = (fieldName) => {
    return formData[fieldName] !== originalData[fieldName];
  };

  const renderField = (field) => {
    // Para campos deshabilitados, usar el valor del field si está definido, sino del formData
    const fieldValue = field.disabled && field.value !== undefined 
      ? field.value 
      : (formData[field.name] || '');

    const commonProps = {
      name: field.name,
      id: field.name,
      onChange: handleChange,
      required: field.required && !field.disabled,
      disabled: field.disabled
    };

    const fieldClassName = showComparison && hasChanged(field.name) && !field.disabled
      ? 'form-input changed' 
      : 'form-input';

    switch (field.type) {
      case 'select':
        return (
          <select 
            {...commonProps} 
            value={fieldValue}
            className={`${fieldClassName} form-select`}
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
            value={fieldValue}
            className={`${fieldClassName} form-textarea`}
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
              disabled={field.disabled}
            />
            <label 
              htmlFor={field.name} 
              className="file-input-label"
              style={field.disabled ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
            >
              <span className="upload-icon">☁️</span>
              <span>
                {formData[field.name]?.name || 
                 originalData[field.name] || 
                 'Cambiar archivo'}
              </span>
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
            disabled={field.disabled}
          />
        );

      case 'date':
        return (
          <input
            {...commonProps}
            type="date"
            value={fieldValue}
            className={fieldClassName}
          />
        );

      case 'number':
        return (
          <input
            {...commonProps}
            type="number"
            value={fieldValue}
            className={fieldClassName}
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
            value={fieldValue}
            className={fieldClassName}
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
              {field.required && !field.disabled && <span className="required-mark">*</span>}
              {showComparison && hasChanged(field.name) && !field.disabled && (
                <span className="changed-indicator"> (modificado)</span>
              )}
            </label>
            
            {renderField(field)}
            
            {showComparison && hasChanged(field.name) && !field.disabled && originalData[field.name] && (
              <span className="original-value">
                Original: {originalData[field.name]}
              </span>
            )}
            
            {errors[field.name] && (
              <span className="form-error">{errors[field.name]}</span>
            )}
          </div>
        ))}
      </div>
    </form>
  );
};

export default CuerpoModalEditarForm;