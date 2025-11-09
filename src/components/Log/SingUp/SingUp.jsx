import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Log from '../Log.jsx';
import Alerta from '../../Alertas/Alertas.jsx';

export default function Register() {
  //Creo las variable que van a tener la info que le voy a mandar a la BD para hacer las consultas
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  // Me permite navegar entre paginas
  const navigate = useNavigate();

  //Creo la variable para poder usar la alertas
  const [alert, setAlert] = useState(null);

  //Funcioin para enviar los datos al backEnd
  const enviarDatos = async (evento) => {
    evento.preventDefault();

    //Me aseguro que las contraseñas ingresadas sean iguales
    if (password !== confirmarPassword) {
      //Seteo la alerta para notificar que las contraseñas son distintas
      setAlert({
        type: 'info',
        title: 'Contraseñas No Coinciden',
        message: 'Por favor, inténtelo de nuevo.'
      });
      return;
    }

    if (password.length < 6) {
      //Seteo la alerta para notificar que las contraseñas deben tener minimo 6 caracteres
      setAlert({
        type: 'info',
        title: 'Contraseña Demasiado Corta',
        message: 'La contraseña debe tener al menos 6 caracteres.'
      });
      return;
    }

    //Me conecto con la BD para enviarle los datos del usuario
    try {
      const response = await fetch("http://localhost:8081/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      //Espero la respuesta del servidor
      const data = await response.text();
      console.log("Respuesta del servidor:", data);

      //El servidor acepta los datos
      if (response.ok) {
        //Seteo la alerta para que se le notifique al usuario que se registro con exito
        setAlert({
          type: 'exito',
          title: 'Registro Exitoso',
          message: 'Redirigiendo al inicio de sesión...'
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        //Seteo la alerta para que muestre el error que hubo cuando se mandaron los datos a la BD
        setAlert({
          type: 'error',
          title: 'Error de Registro',
          message: `No se pudo registrar. Detalle: ${data || 'Error desconocido'}`
        });
      }

    } catch (error) {
      //Seteo la alerta para mostrar un error de conexion 
      console.error("Error en la conexión:", error);
      setAlert({
        type: 'advertencia',
        title: 'Error de Conexión',
        message: `No se pudo conectar con el servidor. Detalle: ${error.message || 'Error desconocido'}`
      });
    }
  };

  //Hago que los errores de conexion y las notificaciones de exito se muestren solo por 5seg
  useEffect(() => {
    if (alert && (alert.type === 'advertencia' || alert.type === 'exito')) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    //Forlario de Registrar
    //Le digo al Log que estoy en SingUp
    <Log isLogin={false}>
      <h1 className='txt'>Registrarse</h1>

      <form onSubmit={enviarDatos} className='formularioLogin'>
        <label htmlFor='register-email' className='formLabel'>
          <span>Email:</span>
          <input
            type='email'
            id='register-email'
            placeholder='example@mail.com'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>

        <label htmlFor='register-password' className='formLabel'> 
          <span>Contraseña:</span>
          <input
            type='password'
            id='register-password'
            placeholder='Mínimo 6 caracteres'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          /> 
        </label>

        <label htmlFor='register-confirmar-password' className='formLabel'> 
          <span>Confirmar Contraseña:</span>
          <input
            type='password'
            id='register-confirmar-password'
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

      {/*Le mando los datos que se hayan registrado a la alerta, para que lo muestre*/}
      {alert && (
        <Alerta
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null) } 
          onAccept={() => setAlert(null)}
        />
      )}
    </Log>
  );
}