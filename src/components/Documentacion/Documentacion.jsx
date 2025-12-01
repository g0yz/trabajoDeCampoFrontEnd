import React, { useState, useEffect } from 'react';
import './Documentacion.css';
import Alerta from '../Alertas/Alertas';
import { Modal, CuerpoModalCrearForm, CuerpoModalInfo } from '../Modal';
import AgregarDocImg from '../../assets/agregarEquipo.png'; // Reutiliza el ícono o crea uno nuevo
import BuscarImg from '../../assets/buscar.png';

const Documentacion = () => {
  const [documentos, setDocumentos] = useState([]);
  const [documentosFiltrados, setDocumentosFiltrados] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [documentoToView, setDocumentoToView] = useState(null);
  
  // Variable para usar las alertas
  const [alert, setAlert] = useState(null);

  const documentosPerPage = 6;

  useEffect(() => {
    fetchDocumentos();
    fetchGrupos();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setDocumentosFiltrados(documentos);
    } else {
      const filtered = documentos.filter(doc => 
        doc.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.autores?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.editorial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.grupo?.nombreGrupo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.grupo?.sigla?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDocumentosFiltrados(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, documentos]);

  const fetchDocumentos = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8081/AdministracionController/documentos/listarDocumentos');
      if (!response.ok) {
        setAlert({
          type: 'error',
          title: 'Error al obtener los datos',
          message: 'No se pudieron cargar los documentos'
        });
        return;
      }
      
      const data = await response.json();
      setDocumentos(data);
      setDocumentosFiltrados(data);
    } catch (error) {
      setAlert({
        type: 'advertencia',
        title: 'Error al cargar documentos',
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

  const handleViewInfo = (documento) => {
    setDocumentoToView(documento);
    setShowInfoModal(true);
  };

  const handleAddDocumento = () => {
    setShowCreateModal(true);
  };

  const handleCreateSubmit = async (formData) => {
    const payload = {
      titulo: formData.titulo,
      autores: formData.autores,
      editorial: formData.editorial,
      anio: parseInt(formData.anio),
      objetivoYDesarrollo: formData.objetivoYDesarrollo || ''
    };

    // SIMULACIÓN: Aquí iría la lógica para subir el PDF
    // const pdfFile = formData.archivoPDF;
    // if (pdfFile) {
    //   const formDataWithFile = new FormData();
    //   formDataWithFile.append('documento', JSON.stringify(payload));
    //   formDataWithFile.append('archivoPDF', pdfFile);
    //   
    //   fetch(`http://localhost:8081/.../agregarDocumento/${formData.idGrupo}`, {
    //     method: 'POST',
    //     body: formDataWithFile
    //   });
    // }

    try {
      const response = await fetch(
        `http://localhost:8081/AdministracionController/documentos/agregarDocumento/${formData.idGrupo}`,
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
          title: 'Documento creado',
          message: 'El documento ha sido creado correctamente'
        });
        setShowCreateModal(false);
        fetchDocumentos();
      } else {
        setAlert({
          type: 'error',
          title: 'Error al crear',
          message: 'No se pudo crear el documento'
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
      name: 'titulo',
      label: 'Título',
      type: 'text',
      required: true,
      placeholder: 'Ej: Documentación Grupo 1'
    },
    {
      name: 'autores',
      label: 'Autores',
      type: 'text',
      required: true,
      placeholder: 'Ej: Autor 1, Autor 2'
    },
    {
      name: 'editorial',
      label: 'Editorial',
      type: 'text',
      required: true,
      placeholder: 'Ej: Edit'
    },
    {
      name: 'anio',
      label: 'Año',
      type: 'number',
      required: true,
      placeholder: 'Ej: 2025',
      min: 1900,
      max: new Date().getFullYear() + 10
    },
    // SIMULACIÓN: Campo para subir PDF (comentado para futura implementación)
    // {
    //   name: 'archivoPDF',
    //   label: 'Archivo PDF',
    //   type: 'file',
    //   accept: '.pdf',
    //   fullWidth: true
    // },
    {
      name: 'objetivoYDesarrollo',
      label: 'Objetivo y Desarrollo',
      type: 'textarea',
      fullWidth: true,
      placeholder: 'Descripción del objetivo...'
    }
  ];

  const indexOfLastDoc = currentPage * documentosPerPage;
  const indexOfFirstDoc = indexOfLastDoc - documentosPerPage;
  const currentDocumentos = documentosFiltrados.slice(indexOfFirstDoc, indexOfLastDoc);
  const totalPages = Math.ceil(documentosFiltrados.length / documentosPerPage);

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
      <div className="documentacion-container">
        <div className="loading">Cargando documentos...</div>
      </div>
    );
  }

  return (
    <div className="documentacion-container">
      <header className="documentacion-header">
        <h1 className="documentacion-title">Documentación</h1>
      </header>

      <div className="search-add-container">
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar Grupo/Titulo Documentacion...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-button">
              <img src={BuscarImg} alt="Buscar" />
            </button>
          </div>
        </div>
        <div className="add-documento-button">
          <button 
            className="btn-add-documento" 
            onClick={handleAddDocumento}
            title="Agregar nuevo documento"
          >
            <img src={AgregarDocImg} alt="Agregar Documento" />
          </button>
        </div>
      </div>

      <div className="documentacion-content-wrapper">
        {currentPage > 1 && (
          <button 
            className="navigation-arrow"
            onClick={handlePrevPage}
            title="Página anterior"
          >
            ‹
          </button>
        )}

        <div className="documentacion-grid">
          {currentDocumentos.length > 0 ? (
            currentDocumentos.map((doc) => (
              <div 
                key={doc.oidDocumento} 
                className="card-documento"
                onClick={() => handleViewInfo(doc)}
              >
                <div className="pdf-icon-container">
                  <div className="pdf-icon">PDF</div>
                </div>
                <div className="card-documento-info">
                  <h3 className="documento-titulo">
                    Titulo: {doc.titulo || 'Sin título'}
                  </h3>
                  <ul className="documento-details">
                    <li><strong>Autores:</strong> {doc.autores || 'N/A'}</li>
                    <li><strong>Editorial:</strong> {doc.editorial || 'N/A'}</li>
                    <li><strong>Año:</strong> {doc.anio || 'N/A'}</li>
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              No se encontraron documentos
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
          title="Agregar Documento"
          onClose={() => setShowCreateModal(false)}
          onConfirm={() => {
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

      {/* Modal de Información */}
      {showInfoModal && documentoToView && (
        <Modal
          title={documentoToView.titulo}
          onClose={() => {
            setShowInfoModal(false);
            setDocumentoToView(null);
          }}
          onConfirm={() => {
            setShowInfoModal(false);
            setDocumentoToView(null);
          }}
          showCancel={false}
          confirmText="Cerrar"
          size="medium"
        >
          <CuerpoModalInfo 
            content={
              <div className="documento-info-content">
                <p><strong>Título:</strong> {documentoToView.titulo}</p>
                <p><strong>Autores:</strong> {documentoToView.autores}</p>
                <p><strong>Editorial:</strong> {documentoToView.editorial}</p>
                <p><strong>Año:</strong> {documentoToView.anio}</p>
                <p><strong>Grupo:</strong> {documentoToView.grupo?.nombreGrupo} ({documentoToView.grupo?.sigla})</p>
                {/* SIMULACIÓN: Aquí iría el botón de descarga del PDF */}
                {/* <button className="download-pdf-btn">Descargar PDF</button> */}
              </div>
            }
            type="custom"
          />
        </Modal>
      )}

      {alert && (
        <Alerta
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
          onAccept={() => setAlert(null)}
        />
      )}
    </div>
  );
};

export default Documentacion;