//Este es el "esqueleto" de los formularios del Log (LogIn y SingUp)

import './Log.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logIcon from '../../assets/log-icon.png';

export default function Log({ children, isLogin }) {
  const [animating, setAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Detecta cuando entramos desde otra ruta para aplicar animación de entrada
  useEffect(() => {
    const state = location.state;
    if (state?.from) {
      // Animación de entrada usando animate.css
      setAnimationClass('animate__animated animate__flipInY');
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
        setAnimationClass('');
      }, 1000);
    }
  }, [location]);

  const handleToggle = () => {
    // Animación de salida usando animate.css
    setAnimationClass('animate__animated animate__flipOutY');
    setAnimating(true);
    
    setTimeout(() => {
      const targetRoute = isLogin ? "/register" : "/login";
      navigate(targetRoute, { state: { from: isLogin ? 'login' : 'register' } });
    }, 800);
  };


  return (
    <div 
      className={`form ${animationClass}`} 
      id={isLogin ? 'loginContainer' : 'singUpContainer'}
    >
      <div className='cambiarDeLog'>
        <button onClick={handleToggle} type='button' disabled={animating}>
          <img className="logIcon" src={logIcon} alt={isLogin ? "Ir a Registro" : "Ir a Login"} />
        </button>
      </div>
      
      <div className={`form-content ${animating ? 'content-animating' : ''}`}>
        {children}
      </div>
    </div>
  );
}