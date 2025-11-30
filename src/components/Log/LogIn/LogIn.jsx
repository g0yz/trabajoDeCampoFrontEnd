import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Log from '../Log.jsx';
import Alerta from '../../Alertas/Alertas.jsx';

export default function Login({ setUsuario }) {
  //Creo las variable que van a tener la info que le voy a mandar a la BD para hacer las consultas
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  // Me permite navegar entre paginas
  const navigate = useNavigate();
  //Creo la variable para poder usar la alertas
  const [alert, setAlert] = useState(null);

  //Funcioin para enviar los datos al backEnd
  const enviarDatos = async (evento) => {
    evento.preventDefault();

    //Se conecta con la BD para enviarle los datos del usuario
    try {
      const response = await fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      //Espero la respuesta del servidor
      const data = await response.text();
      console.log("Respuesta del servidor:", data);

      // Si el servidor responde ok el usuario se loguea
      if (response.ok && data.startsWith("Login exitoso")) {
        const datosUsuario = { 
          email: email,
          rol: "Rol",
          grupo: "Sin grupo",
          loggedIn: true
          /*
          CUANDO EL BACK ESTE LISTO 
            email: data.usuario.email,
            rol: data.usuario.rol || null,
            grupo: data.usuario.grupo || null,
            loggedIn: true
          */
        };
        
         localStorage.setItem("usuario", JSON.stringify(datosUsuario));

        setUsuario( datosUsuario ); 
        navigate("/home");
      } else { // Si el servidor no responde ok se le notifica al usuario el error
        //Setea lo que la alerta debe mostrar y el tipo de error
        setAlert({
          type: 'error',
          title: 'Error de Inicio de Sesión',
          message: `${data || 'Error desconocido'}`
        });
      }

    } catch (error) { 
      //Error de conexion con el servidor 
      console.error("Error durante la solicitud de inicio de sesión:", error);
        
      //Setea lo que la alerta debe mostrar y el tipo de error
      setAlert({
        type: 'advertencia',
        title: 'Error de Conexión',
        message: `No se pudo conectar con el servidor. Detalle: ${error.message || 'Error desconocido'}`
      });
    }    
  };

  useEffect(() => {
    //Si el error es una advertencia (No se pudo conectar con el servidor) la alerta se mostrara durante 5 seg
    if (alert && alert.type === 'advertencia') {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    //Le digo al Log que estoy en el LogIn
    <Log isLogin={true}>
      <h1 className='txt'>Iniciar Sesión</h1>
      
      <form onSubmit={enviarDatos} className='formularioLogin'>
        <label htmlFor='login-email' className='formLabel'>
          <span>Email:</span>
          <input
            type='email'
            id='login-email'
            placeholder='example@mail.com'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>

        <label htmlFor='login-password' className='formLabel'> 
          <span>Contraseña:</span>
          <input
            type='password'
            id='login-password'
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

      {/*Le mando los datos que se hayan registrado a la alerta, para que lo muestre*/}
      {alert && (
        <Alerta
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
          onAccept={() => setAlert(null)}
        />
      )}
    </Log>
  );
}