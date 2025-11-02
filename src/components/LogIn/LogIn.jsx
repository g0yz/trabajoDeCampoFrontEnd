import './LogIn.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logIcon from '../../assets/log-icon.png';

export default function LogIn({ setUsuario }) {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const enviarDatos = async (evento) => {
    evento.preventDefault();


    try {
      const response = await fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.text();
      console.log("Respuesta del servidor:", data);

      if (response.ok && data.startsWith("Login exitoso")) {
        // setUsuario({ email, loggedIn: true });
          localStorage.setItem("mailUsuario", email);
          localStorage.setItem("loguead", JSON.stringify(true));
        navigate("/home"); // 👈 Redirige al Home
      } else {
        setMensaje(data);
      }

    } catch (error) {
      console.error("Error en la conexión:", error);
      setMensaje("Error de conexión con el servidor.");
    }
  };

  const irARegistro = () => {
    navigate("/signup");
  };

  return (
    <div className='form' id='loginContainer'>
      <div id='irARegistrarUsu'>
        <button onClick={irARegistro} type='button'><img className="logIcon" src={logIcon} alt="RegistrarUsuario" />
        </button>
      </div>
      <div>
        <h1 className='txt'> Iniciar Sesión </h1>
        <form onSubmit={enviarDatos} className='formularioLogin'>
          <label htmlFor='email' className='formLabel'>
            <span>Email: </span>
            <input
              type='email'
              id='email'
              placeholder='example@mail.com'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>

          <label htmlFor='password' className='formLabel'> 
            <span>Contraseña:</span>
            <input
              type='password'
              id='password'
              placeholder='Contraseña'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            /> 
          </label>

          <div className='boton'>
            <button type="submit" className='botonIniciarSesion'>Iniciar Sesión</button>
          </div>
        
        </form>
        {mensaje && <p>{mensaje}</p>}
      </div>

    </div>
  );
}