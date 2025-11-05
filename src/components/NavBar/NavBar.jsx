import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logoUTN.png';
import LogoOutImg from '../../assets/cerrarSesion.png'
import { Secciones } from './Secciones/Secciones.jsx';

const NavBar = ( { onLogOut  } ) => {

    const navigate = useNavigate();

    const manejarLogout = () => {
        // Limpiar localStorage
        localStorage.removeItem("usuario");
        // Llamar a la función de logout del padre si existe
        if (onLogOut) {
            onLogOut();
        }
        // Redirigir al login
        navigate("/LogIn");
    };

    return (
        <nav id="nav" className="navbar navbar-expand-lg navColor">
            {/* Logo de la pagina web en el navBar*/}
            <div className="container-fluid">
                <Link className="navbar-brand logo" to="/"><img src={ Logo } alt="Inicio" /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
            
            </div>

            {/* Secciones del navBar*/}            
            <div className="container-fluid">
                <Secciones />

            {/* Cerrar sesion*/}
            <button onClick={manejarLogout} className='logOutImg'>
                <i class="fa-solid fa-right-from-bracket"></i>
            </button>

            </div>
            

        </nav>
    );
}

export default NavBar;