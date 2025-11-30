import './NavBar.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/logoUTN.png';
import { Secciones } from './Secciones/Secciones.jsx';
import SubNavPersonal from './SubNavPersonal/SubNavPersonal.jsx';
import Alerta from '../Alertas/Alertas.jsx';
import PerfilUsuario from '../PerfilUsuario/PerfilUsuario.jsx';



const NavBar = ( { onLogOut  } ) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [alert, setAlert] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showPerfil, setShowPerfil] = useState(false);
    const [showSubNav, setShowSubNav] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Datos del usuario - obtenerlos del localStorage o de tus props
    const [usuario, setUsuario] = useState({
        //(Los valores son de ejemplo, no son los que se muestran)
        rol: 'Director', // Puede ser null si no tiene rol 
        grupo: 'Grupo1', // Puede ser null si no tiene grupo
        email: 'correo@mail.com'
    });

    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        const datosUsuario = localStorage.getItem("usuario");
        if (datosUsuario) {
            const parsedData = JSON.parse(datosUsuario);
            setUsuario({
                rol: parsedData.rol || null,
                grupo: parsedData.grupo || null,
                email: parsedData.email || 'Error: no email'
            });
        }
    }, []);

     // Función para manejar el clic en Personal
    const handlePersonalClick = (e) => {
        e.preventDefault(); // Evitar la navegación
        setShowSubNav(!showSubNav);
    };

    // Función para cerrar el SubNav
    const handleCloseSubNav = () => {
        setShowSubNav(false);
        setSelectedCategory(null);
    };

    // Cerrar el menú cada vez que cambie la ruta
    useEffect(() => {
        setIsOpen(false);
    }, [location]);
    
    const manejarLogout = () => {
        // Limpiar localStorage
        localStorage.removeItem("usuario");
        // Llamar a la función de logout del padre si existe
        if (onLogOut) {
            onLogOut();
        }
        // Redirigir al login
        navigate("/login");
    };

    const handlePerfilClick = () => {
        setShowPerfil(true);
        setIsOpen(false);
    };

    const handleLogoutFromPerfil = () => {
        setShowPerfil(false);
        setAlert({
            type: 'advertencia',
            title: 'Atención',
            message: 'Desea cerrar sesión?'
        });
        //setIsOpen(false); // Cerrar el menú al hacer clic
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        // Aquí puedes emitir un evento o usar un callback para comunicar
        // la categoría seleccionada al componente Personal
        // Por ejemplo, usando un contexto o prop
    };

    return (
        <>
            <nav id="nav" className="navbar navbar-expand-lg navColor">
                <div className="container-fluid">
                    {/* Logo de la pagina web en el navBar*/}
                    <Link className="navbar-brand logo" to="/" onClick={closeMenu}>
                        <img src={Logo} alt="Inicio" />
                    </Link>

                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        onClick={toggleMenu}
                        aria-controls="navbarNavDropdown" 
                        aria-expanded={isOpen} 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    {/* Secciones del navBar y botón de perfil*/}
                    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNavDropdown">
                        <Secciones closeMenu={closeMenu} onPersonalClick={handlePersonalClick} isPersonalActive={showSubNav}/>

                        {/* Botón de perfil - visible en pantallas grandes */}
                        <button 
                            onClick={handlePerfilClick}
                            className='logOutImg d-none d-lg-block'
                        >
                            <i className="fa-solid fa-user"></i>
                        </button>

                        {/* Botón de perfil - visible en pantallas pequeñas (dentro del menú) */}
                        <ul className="navbar-nav d-lg-none">
                            <li className="nav-item">
                                <button 
                                    onClick={handlePerfilClick}
                                    className='nav-link logOutMobile'
                                >
                                    <i className="fa-solid fa-user"></i>
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Modal de perfil */}
                    {showPerfil && (
                        <PerfilUsuario
                            usuario={usuario}
                            onClose={() => setShowPerfil(false)}
                            onLogout={handleLogoutFromPerfil}
                        />
                    )}

                    {/* Alerta de confirmación */}
                    {alert && (
                        <Alerta
                            type={alert.type}
                            title={alert.title}
                            message={alert.message}
                            onClose={() => setAlert(null)}
                            onCancel={() => setAlert(null)}
                            onAccept={() => { setAlert(null); manejarLogout(); }}
                        />
                    )}
                </div>
            </nav>

            {/* SubNav para Personal */}
            {showSubNav && (
                <SubNavPersonal 
                    onCategorySelect={handleCategorySelect}
                    selectedCategory={selectedCategory}
                    onClose={handleCloseSubNav}
                />
            )}
        </>
    );
}

export default NavBar;