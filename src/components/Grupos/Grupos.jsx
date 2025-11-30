import React, { useState, useEffect } from 'react';
import CardGrupo from './CardGrupo/CardGrupo';
import './Grupo.css'
import AgregarGrupo from '../../assets/agregarGrupo.png';
import Alerta from '../Alertas/Alertas';

const Grupos = () => {
  const [grupos, setGrupos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  //Creo la variable para poder usar la alertas
  const [alert, setAlert] = useState(null);

  const gruposPerPage = 6;

  useEffect(() => {
    fetchGrupos();
  }, []);

const fetchGrupos = async () => {
  setLoading(true);
  
  try {
    const response = await fetch('http://localhost:8081/AdministracionController/grupos/listarGrupos');
    if (!response.ok) {
      setAlert({
          type: 'error',
          title: 'Error al obtener los datos',
          message: `${data || 'Error desconocido'}`
        });
    };
    
    const data = await response.json();
    setGrupos(data); // 👈 Guarda los datos reales
  } catch (error) {
      //Setea lo que la alerta debe mostrar y el tipo de error
      setAlert({
        type: 'advertencia',
        title: 'Error al cargar grupos',
        message: `${error.message || 'Error desconocido'}`
      });
  } finally {
    setLoading(false);
  }
};

  const handleEdit = (grupo) => {
    console.log('Editar grupo:', grupo);
    // TODO: Implementar modal o navegación para editar
  };

  const handleDelete = async (oidGrupo) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este grupo?')) {
      console.log('Eliminar grupo:', oidGrupo);
      // TODO: Implementar llamada al backend para eliminar
      await fetch(`http://localhost:8081/AdministracionController/grupos/eliminarGrupo/${oidGrupo}`, { method: 'DELETE' });
      setGrupos(grupos.filter(g => g.oidGrupo !== oidGrupo));
    }
  };

  const indexOfLastGrupo = currentPage * gruposPerPage;
  const indexOfFirstGrupo = indexOfLastGrupo - gruposPerPage;
  const currentGrupos = grupos.slice(indexOfFirstGrupo, indexOfLastGrupo);
  const totalPages = Math.ceil(grupos.length / gruposPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="grupos-container">
        <div className="loading">Cargando grupos...</div>
      </div>
    );
  }

  return (
    <div className="grupos-container">
      <header className="grupos-header">
        <h1 className="grupos-title">Grupos</h1>
        <button className="btn-add-grupo" title="Agregar nuevo grupo">
          <img src={AgregarGrupo} alt="" />
        </button>
      </header>

      <div className="grupos-content-wrapper">
        {currentPage > 1 && (
          <button 
            className="navigation-arrow"
            onClick={handlePrevPage}
            title="Página anterior"
          >
            ‹
          </button>
        )}

        <div className="grupos-grid">
          {currentGrupos.map((grupo) => (
            <CardGrupo 
              key={grupo.oidGrupo} 
              grupo={grupo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {currentPage < totalPages && (
          <button 
            className="navigation-arrow"
            onClick={handleNextPage}
            title="Página siguiente"
          >
            ›
          </button>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      {alert && (
          <Alerta
              type={alert.type}
              title={alert.title}
              message={alert.message}
              onClose={() => setAlert(null)}
              onCancel={() => setAlert(null)}
              onAccept={() => { setAlert(null)}}
          />
      )}
      
    </div>
  );
};

export default Grupos;