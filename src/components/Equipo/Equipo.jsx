// Equipo/Equipo.jsx
import React, { useState, useEffect } from 'react';
import CardEquipo from './CardEquipo/CardEquipo';
import './Equipo.css';
import Alerta from '../Alertas/Alertas';
import { Modal, CuerpoModalCrearForm, CuerpoModalEditarForm } from '../Modal';
import AgregarEquipoImg from '../../assets/agregarEquipo.png';
import BuscarImg from '../../assets/buscar.png';

const Equipo = () => {
  const [equipos, setEquipos] = useState([]);
  const [equiposFiltrados, setEquiposFiltrados] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [equipoToEdit, setEquipoToEdit] = useState(null);
  
  // Variable para usar las alertas
  const [alert, setAlert] = useState(null);

  const equiposPerPage = 6;

  useEffect(() => {
    fetchEquipos();
    fetchGrupos();
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

  const fetchGrupos = async () => {
    try {
      const response = await fetch('http://localhost:8081/AdministracionController/grupos/listarGrupos');
      if (!response.ok) {
        console.error('Error al cargar grupos');
        return;
      }
      const data = await response.json();
      setGrupos(data);
    } catch (error) {
      console.error('Error al cargar grupos:', error);
    }
  };

  const handleEdit = (equipo) => {
    setEquipoToEdit(equipo);
    setShowEditModal(true);
  };

  const handleDelete = async (oidEquipo) => {
    setAlert({
      type: 'advertencia',
      title: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este equipo?'
    });
    
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
    setShowCreateModal(true);
  };

  const handleCreateSubmit = async (formData) => {
    // Convertir la fecha a formato ISO completo
    const fechaISO = new Date(formData.fechaIncorporacion).toISOString();
    
    const payload = {
      denominacion: formData.denominacion,
      fechaIncorporacion: fechaISO,
      montoInvertido: parseFloat(formData.montoInvertido),
      descripcion: formData.descripcion || ''
    };

    try {
      const response = await fetch(
        `http://localhost:8081/AdministracionController/equipos/agregarEquipo/${formData.idGrupo}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {
        setAlert({
          type: 'exito',
          title: 'Equipo creado',
          message: 'El equipo ha sido creado correctamente'
        });
        setShowCreateModal(false);
        fetchEquipos(); // Recargar la lista
      } else {
        setAlert({
          type: 'error',
          title: 'Error al crear',
          message: 'No se pudo crear el equipo'
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Error al crear',
        message: `${error.message || 'Error desconocido'}`
      });
    }
  };

  const handleEditSubmit = async (formData) => {
    const payload = {
      denominacion: formData.denominacion,
      montoInvertido: parseFloat(formData.montoInvertido),
      descripcion: formData.descripcion || ''
    };

    try {
      const response = await fetch(
        `http://localhost:8081/AdministracionController/equipos/actualizarEquipo/${equipoToEdit.oidEquipo}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {
        setAlert({
          type: 'exito',
          title: 'Equipo actualizado',
          message: 'El equipo ha sido actualizado correctamente'
        });
        setShowEditModal(false);
        setEquipoToEdit(null);
        fetchEquipos(); // Recargar la lista
      } else {
        setAlert({
          type: 'error',
          title: 'Error al actualizar',
          message: 'No se pudo actualizar el equipo'
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Error al actualizar',
        message: `${error.message || 'Error desconocido'}`
      });
    }
  };

  // Configuración de campos para el formulario de creación
  const createFields = [
    {
      name: 'idGrupo',
      label: 'Grupo',
      type: 'select',
      required: true,
      options: grupos.map(grupo => ({
        value: grupo.oidGrupo,
        label: `${grupo.nombreGrupo} (${grupo.sigla})`
      }))
    },
    {
      name: 'denominacion',
      label: 'Denominación',
      type: 'text',
      required: true,
      placeholder: 'Ej: Microscopio'
    },
    {
      name: 'fechaIncorporacion',
      label: 'Fecha de incorporación',
      type: 'date',
      required: true
    },
    {
      name: 'montoInvertido',
      label: 'Monto invertido',
      type: 'number',
      required: true,
      placeholder: 'Ej: 5000'
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'textarea',
      fullWidth: true,
      placeholder: 'Descripción del equipamiento...'
    }
  ];

  // Configuración de campos para el formulario de edición
  const getEditFields = () => {
    if (!equipoToEdit) return [];
    
    return [
      {
        name: 'grupo',
        label: 'Grupo',
        type: 'text',
        disabled: true,
        value: equipoToEdit.grupo?.nombreGrupo || 'Sin grupo'
      },
      {
        name: 'denominacion',
        label: 'Denominación',
        type: 'text',
        required: true
      },
      {
        name: 'fechaIncorporacion',
        label: 'Fecha de incorporación',
        type: 'date',
        disabled: true,
        value: equipoToEdit.fechaIncorporacion 
          ? new Date(equipoToEdit.fechaIncorporacion).toISOString().split('T')[0]
          : ''
      },
      {
        name: 'montoInvertido',
        label: 'Monto invertido',
        type: 'number',
        required: true
      },
      {
        name: 'descripcion',
        label: 'Descripción',
        type: 'textarea',
        fullWidth: true
      }
    ];
  };

  const getEditInitialData = () => {
    if (!equipoToEdit) return {};
    
    return {
      grupo: equipoToEdit.grupo?.nombreGrupo || 'Sin grupo',
      denominacion: equipoToEdit.denominacion || '',
      fechaIncorporacion: equipoToEdit.fechaIncorporacion 
        ? new Date(equipoToEdit.fechaIncorporacion).toISOString().split('T')[0]
        : '',
      montoInvertido: equipoToEdit.montoInvertido || 0,
      descripcion: equipoToEdit.descripcion || ''
    };
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

      {/* Modal de Creación */}
      {showCreateModal && (
        <Modal
          title="Agregar Equipamiento"
          onClose={() => setShowCreateModal(false)}
          onConfirm={() => {
            // El submit se maneja desde el formulario
            document.querySelector('.cuerpo-modal-form')?.requestSubmit();
          }}
          showCancel={true}
          confirmText="Agregar"
          cancelText="Cancelar"
          size="large"
        >
          <CuerpoModalCrearForm
            fields={createFields}
            onSubmit={handleCreateSubmit}
          />
        </Modal>
      )}

      {/* Modal de Edición */}
      {showEditModal && equipoToEdit && (
        <Modal
          title="Modificar Equipamiento"
          onClose={() => {
            setShowEditModal(false);
            setEquipoToEdit(null);
          }}
          onConfirm={() => {
            document.querySelector('.cuerpo-modal-form')?.requestSubmit();
          }}
          showCancel={true}
          confirmText="Guardar cambios"
          cancelText="Cancelar"
          size="large"
        >
          <CuerpoModalEditarForm
            fields={getEditFields()}
            data={getEditInitialData()}
            onSubmit={handleEditSubmit}
            showComparison={true}
          />
        </Modal>
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