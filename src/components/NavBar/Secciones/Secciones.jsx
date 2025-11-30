import { Link } from "react-router-dom";
import '../NavBar.css'

export const Secciones = ({ closeMenu, onPersonalClick, isPersonalActive  }) => {
    
    const handleClick = () => {
        if (closeMenu) {
            closeMenu();
        }
    };

    const handlePersonalClick = (e) => {
        if (onPersonalClick) {
            onPersonalClick(e);
        }
    };

    return (
        <>
            {/* Link a las distintas rutas de la pagina web*/}
            <ul className="navbar-nav secciones">
                <li className="nav-item">
                    <Link 
                        className="nav-link" 
                        aria-current="page" 
                        to={"/documentacion"}
                        onClick={handleClick}
                    >
                        Documentación
                    </Link>
                </li> 

                <li className={`nav-item ${isPersonalActive ? 'active' : ''}`}>
                    <a 
                        className="nav-link" 
                        aria-current="page" 
                        href="#"
                        onClick={handlePersonalClick}
                        style={{ cursor: 'pointer' }}
                    >
                        Personal
                    </a>
                </li>

                <li className="nav-item">
                    <Link 
                        className="nav-link" 
                        aria-current="page" 
                        to={"/grupos"}
                        onClick={handleClick}
                    >
                        Grupos
                    </Link>
                </li>

                <li className="nav-item">
                    <Link 
                        className="nav-link" 
                        aria-current="page" 
                        to={"/equipo"}
                        onClick={handleClick}
                    >
                        Equipo
                    </Link>
                </li>
            </ul>
        </>
    );
}