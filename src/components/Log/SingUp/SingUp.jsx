import '../Log.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logIcon from '../../../assets/log-icon.png';
import Alerta from '../../Alertas/Alertas.jsx';

export default function Register() {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const navigate = useNavigate();

    const [alert, setAlert] = useState(null);


    const enviarDatos = async (evento) => {
    evento.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmarPassword) {
      setAlert({
        type: 'info',
        title: 'Contraseñas No Coinciden',
        message: 'Por favor, inténtelo de nuevo.'
      });
      return;
    }

    // Validar longitud mínima de contraseña
    if (password.length < 6) {
          setAlert({
          type: 'info',
          title: 'Contraseña Demasiado Corta',
          message: 'La contraseña debe tener al menos 6 caracteres.'
      });
      return;
    }

    try {
        const response = await fetch("http://localhost:8081/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password })
      });

      const data = await response.text();
      console.log("Respuesta del servidor:", data);

    if (response.ok) {
        setAlert({
          type: 'exito',
          title: 'Registro Exitoso',
          message: 'Redirigiendo al inicio de sesión...'
      });
        setTimeout(() => {
            navigate("/login"); // Redirige al login después del registro
        }, 2000);
      } else {
        setAlert({
          type: 'error',
          title: 'Error de Inicio de Sesión',
          message: `No se pudo iniciar sesión. Detalle: ${data || `Error desconocido`}`
      });
      }

    } catch (error) {
      console.error("Error en la conexión:", error);
       setAlert({
          type: 'advertencia',
          title: 'Error de Conexión',
          message: `No se pudo conectar con el servidor. Detalle: ${error.message || 'Error desconocido'}`
      });
    }
  };

    const irALogIn = () => {
        navigate("/login");
    };

    useEffect(() => {
    if (alert && (alert.type === 'advertencia' || alert.type === 'exito') ) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className='form' id='singUpContainer'>
      
      <div id='irARegistrarUsu'>
        <button onClick={irALogIn}><img className="logIcon" src={logIcon} alt="RegistrarUsuario" />
        </button>
      </div>

      <div>
        <h1 className='txt'> Registrarse </h1>

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
              placeholder='Mínimo 6 caracteres'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            /> 
          </label>

         <label htmlFor='confirmarPassword' className='formLabel'> 
          <span>Confirmar Contraseña:</span>
          <input
              type='password'
              id='confirmarPassword'
              placeholder='Repite tu contraseña'
              value={confirmarPassword}
              onChange={e => setConfirmarPassword(e.target.value)}
              required
          /> 
        </label>

          <div className='boton'>
            <button type="submit" className='botonIniciarSesion'>Registrarse</button>
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