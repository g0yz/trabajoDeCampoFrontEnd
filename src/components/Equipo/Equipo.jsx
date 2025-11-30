// Equipo/Equipo.jsx
import React, { useState, useEffect } from 'react';
import CardEquipo from './CardEquipo/CardEquipo';
import './Equipo.css';
import Alerta from '../Alertas/Alertas';
import AgregarEquipoImg from '../../assets/agregarEquipo.png';
import BuscarImg from '../../assets/buscar.png';

const Equipo = () => {
  const [equipos, setEquipos] = useState([]);
  const [equiposFiltrados, setEquiposFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Variable para usar las alertas
  const [alert, setAlert] = useState(null);

  const equiposPerPage = 6;

  useEffect(() => {
    fetchEquipos();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setEquiposFiltrados(equipos);
    } else {
      const filtered = equipos.filter(equipo => 
        equipo.denominacion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipo.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipo.grupo?.nombreGrupo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipo.grupo?.sigla?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setEquiposFiltrados(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, equipos]);

  const fetchEquipos = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8081/AdministracionController/equipos/listarEquipos');
      if (!response.ok) {
        setAlert({
          type: 'error',
          title: 'Error al obtener los datos',
          message: 'No se pudieron cargar los equipos'
        });
        return;
      }
      
      const data = await response.json();
      setEquipos(data);
      setEquiposFiltrados(data);
    } catch (error) {
      setAlert({
        type: 'advertencia',
        title: 'Error al cargar equipos',
        message: `${error.message || 'Error desconocido'}`
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (equipo) => {
    console.log('Editar equipo:', equipo);
    // TODO: Implementar modal o navegación para editar
  };

  const handleDelete = async (oidEquipo) => {
    setAlert({
      type: 'advertencia',
      title: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este equipo?'
    });
    
    // Guardamos el oidEquipo para usarlo después de la confirmación
    window.equipoToDelete = oidEquipo;
  };

  const confirmarEliminacion = async () => {
    const oidEquipo = window.equipoToDelete;
    
    try {
      const response = await fetch(`http://localhost:8081/AdministracionController/equipos/eliminarEquipo/${oidEquipo}`, { 
        method: 'DELETE' 
      });
      
      if (response.ok) {
        setEquipos(equipos.filter(e => e.oidEquipo !== oidEquipo));
        setAlert({
          type: 'exito',
          title: 'Equipo eliminado',
          message: 'El equipo ha sido eliminado correctamente'
        });
      } else {
        setAlert({
          type: 'error',
          title: 'Error al eliminar',
          message: 'No se pudo eliminar el equipo'
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Error al eliminar',
        message: `${error.message || 'Error desconocido'}`
      });
    }
    
    delete window.equipoToDelete;
  };

  const handleAddEquipo = () => {
    console.log('Agregar nuevo equipo');
    // TODO: Implementar modal para agregar equipo
  };

  const indexOfLastEquipo = currentPage * equiposPerPage;
  const indexOfFirstEquipo = indexOfLastEquipo - equiposPerPage;
  const currentEquipos = equiposFiltrados.slice(indexOfFirstEquipo, indexOfLastEquipo);
  const totalPages = Math.ceil(equiposFiltrados.length / equiposPerPage);

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
      <div className="equipo-container">
        <div className="loading">Cargando equipos...</div>
      </div>
    );
  }

  return (
    <div className="equipo-container">
      <header className="equipo-header">
        <h1 className="equipo-title">Equipo</h1>
        
      </header>

            
        <div className="search-add-container">
          <div className="search-container">
           <div className="search-box">
             <input
               type="text"
               placeholder="Buscar Equipamiento..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="search-input"
             />
             <button className="search-button">
               <img src={BuscarImg} alt="Buscar" />
             </button>
            </div>
          </div>
          <div className="add-equipo-button">
            <button 
              className="btn-add-equipo" 
              onClick={handleAddEquipo}
              title="Agregar nuevo equipo"
            >
              <img src={AgregarEquipoImg} alt="Agregar Equipamiento" />
            </button>
          </div>
        </div>


      <div className="equipo-content-wrapper">
        {currentPage > 1 && (
          <button 
            className="navigation-arrow"
            onClick={handlePrevPage}
            title="Página anterior"
          >
            ‹
          </button>
        )}

        <div className="equipo-grid">
          {currentEquipos.length > 0 ? (
            currentEquipos.map((equipo) => (
              <CardEquipo 
                key={equipo.oidEquipo} 
                equipo={equipo}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="no-results">
              No se encontraron equipos
            </div>
          )}
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
          onCancel={alert.type === 'advertencia' && alert.title === 'Confirmar eliminación' ? () => setAlert(null) : undefined}
          onAccept={alert.type === 'advertencia' && alert.title === 'Confirmar eliminación' ? () => { setAlert(null); confirmarEliminacion(); } : () => setAlert(null)}
        />
      )}
    </div>
  );
};

export default Equipo;