import '../Log.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logIcon from '../../../assets/log-icon.png';
import Alerta from '../../Alertas/Alertas.jsx';

export default function Login({ setUsuario }) {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [alert, setAlert] = useState(null);

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
        // Guardar la información del usuario 
        const datosUsuario = { email, loggedIn: true };
        // Esto ahora guardará automáticamente en localStorage
        setUsuario({ datosUsuario }); 
        // Redirige al Home
        navigate("/home");
      } else {
        setAlert({
          type: 'error',
          title: 'Error de Inicio de Sesión',
          message: `No se pudo iniciar sesión. Detalle: ${data || `Error desconocido`}`
      });
      }

    } catch (error) { 
        console.error("Error durante la solicitud de inicio de sesión:", error);
        setAlert({
          type: 'advertencia',
          title: 'Error de Conexión',
          message: `No se pudo conectar con el servidor. Detalle: ${error.message || 'Error desconocido'}`
      });
      }    
  };

  const irARegistro = () => {
    navigate("/register");
  };

    useEffect(() => {
    if (alert && alert.type === 'advertencia') {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

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

        {alert && (
          <Alerta
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onAccept={() => setAlert(null)}
          />
        )}

      </div>

    </div>
  );
}