import '../Log.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logIcon from '../../../assets/log-icon.png';

export default function SingUp() {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    const enviarDatos = async (evento) => {
    evento.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmarPassword) {
      setMensaje("Las contraseñas no coinciden");
      return;
    }

    // Validar longitud mínima de contraseña
    if (password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres");
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
        setMensaje("Registro exitoso. Redirigiendo al inicio de sesión...");
        setTimeout(() => {
            navigate("/login"); // Redirige al login después del registro
        }, 2000);
      } else {
        setMensaje(data);
      }

    } catch (error) {
      console.error("Error en la conexión:", error);
      setMensaje("Error de conexión con el servidor.");
    }
  };

    const irALogIn = () => {
        navigate("/LogIn");
    };

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
        
        {mensaje && <p className={mensaje.includes("exitoso") ? "mensajeExito" : "mensajeError"}>{mensaje}</p>}

      </div>

    </div>
  );
}