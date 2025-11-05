import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import './Home.css';
import ComponenteHome from './ComponenteHome/ComponenteHome.jsx'

export default function Home() {
  return (
       <div className="home-body">
        <div className="bienvenida">
            <h1 className="bienvenida-titulo">Bienvenidos</h1>
            <p className="bienvenida-descripcion">Este sistema fue creado para acompañarte en la gestión y organización de los grupos de investigación.
                Desde esta plataforma podés acceder fácilmente a toda la información institucional,
                al registro del personal, el equipamiento disponible y la documentación del grupo.
               </p>

            <p>Nuestro objetivo es brindarte una herramienta práctica y centralizada que facilite
                el trabajo diario, el seguimiento de actividades y la planificación del crecimiento del grupo.</p>
        </div>
        <div className="navegadores-inferiores-bienvenida">
            <div className="seccion_card_home">

                <ComponenteHome className="homeCard" titulo="Grupos" descr="Gestiona la información institucional y estructural de los grupos de investigación."/>

                <ComponenteHome className="homeCard" titulo="Personal" descr="Clasifica y sistematiza la información de los miembros del grupo."/>
            </div>

            <div className="seccion_card_home">   
                <ComponenteHome className="homeCard" titulo="Equipo" descr="Contiene el registro del equipamiento e infraestructura del grupo."/>
                
                <ComponenteHome className="homeCard" titulo="Documentación" descr="Muestra los registros y recuersos bibliograficos del grupo."/>
            </div>
        </div>
    </div>
  )
}