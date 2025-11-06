import { Link } from "react-router-dom";
import '../NavBar.css'

export const Secciones = () => {
    return (
        <div className="collapse navbar-collapse" id="navbarNavDropdown">

            {/* Link a las distintas rutas de la pagina web*/}
            <ul className="navbar-nav secciones">
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/documentacion"} >Documentación</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/personal"} >Personal</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/grupos"} >Grupos</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/equipo"} >Equipo</Link>
                </li>
            </ul>
        
        </div>
    );
}