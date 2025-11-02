import React from 'react'
import './Home.css';

export default function NavegadorBienvenida({ titulo, descr }) {
    return (
        <div className="nav-bienv-body">
            <h2 className="titulo-nav-bienv">{titulo}</h2>
            <p className="desc-nav-bienv">{descr}</p>
        </div>
    )
}