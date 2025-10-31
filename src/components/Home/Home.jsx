import React from 'react'

export default function Home({ usuario }) {
  return (
    <div>
      <h1>Bienvenido, {usuario.email} 👋</h1>
    </div>
  )
}