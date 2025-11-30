import React, { useState, useRef, useEffect } from 'react';
import './SubNavPersonal.css';

const SubNavPersonal = ({ onCategorySelect, selectedCategory, onClose }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownLocked, setDropdownLocked] = useState(false);
    const subNavRef = useRef(null);

    // Detectar clics fuera del SubNav
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (subNavRef.current && !subNavRef.current.contains(event.target)) {
                if (onClose) {
                    onClose();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const categorias = [
        { id: 'investigadores', label: 'Investigadores' },
        { id: 'profesionales', label: 'Profesionales' },
        { id: 'tecnico', label: 'Técnico/Administrativo/Apoyo' },
        { id: 'becarios', label: 'Becarios/Personal en formación' }
    ];

    const subcategoriasBecarios = [
        { id: 'pasantes', label: 'Pasantes' },
        { id: 'doctorado', label: 'Doctorado' },
        { id: 'becarios-alumnos', label: 'Becarios Alumnos' },
        { id: 'becario-graduado', label: 'Becario Graduado' },
        { id: 'maestria', label: 'Maestría / Especialización' },
        { id: 'proyectos-finales', label: 'Proyectos Finales y Tesinas / Tesis de Posgrado' }
    ];

    const handleCategoryClick = (categoriaId) => {
        if (categoriaId === 'becarios') {
            // Si se hace clic en becarios, bloquear el dropdown
            setDropdownLocked(!dropdownLocked);
            setShowDropdown(!dropdownLocked);
        } else {
            // Para otras categorías, cerrar el dropdown
            setDropdownLocked(false);
            setShowDropdown(false);
        }
        onCategorySelect(categoriaId);
    };

    const handleMouseEnter = () => {
        if (!dropdownLocked) {
            setShowDropdown(true);
        }
    };

    const handleMouseLeave = () => {
        if (!dropdownLocked) {
            setShowDropdown(false);
        }
    };

    const handleSubcategoryClick = (subcategoriaId) => {
        onCategorySelect(subcategoriaId);
        // Opcional: cerrar el dropdown al seleccionar una subcategoría
        // setDropdownLocked(false);
        // setShowDropdown(false);
    };

    return (
        <div className="subnav-personal" ref={subNavRef}>
            <div className="subnav-container">
                {categorias.map((categoria) => (
                    <div 
                        key={categoria.id}
                        className="subnav-item-wrapper"
                        onMouseEnter={categoria.id === 'becarios' ? handleMouseEnter : undefined}
                        onMouseLeave={categoria.id === 'becarios' ? handleMouseLeave : undefined}
                    >
                        <button
                            className={`subnav-item ${selectedCategory === categoria.id ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(categoria.id)}
                        >
                            {categoria.label}
                        </button>

                        {/* Dropdown para Becarios */}
                        {categoria.id === 'becarios' && (showDropdown || dropdownLocked) && (
                            <div className="subnav-dropdown">
                                <ul>
                                    {subcategoriasBecarios.map((sub) => (
                                        <li 
                                            key={sub.id}
                                            className={selectedCategory === sub.id ? 'active' : ''}
                                            onClick={() => handleSubcategoryClick(sub.id)}
                                        >
                                            {sub.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubNavPersonal;