import './NavBar.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logoUTN.png';
import { Secciones } from './Secciones/Secciones.jsx';

const NavBar = ( onLogout ) => {
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

            </div>
        

        </nav>
    );
}

export default NavBar;