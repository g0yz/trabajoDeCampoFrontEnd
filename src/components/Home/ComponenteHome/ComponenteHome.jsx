import React from 'react'
import '../Home.css';

export default function NavegadorBienvenida({ titulo, descr }) {
    return (
        <div className="card_home">
            <h2 className="card_home_titulo">{titulo}</h2>
            <p className="card_home_descr">{descr}</p>
        </div>
    )
}