import React, { useEffect, useState } from "react";
import CardPersonal from "../CardPersonal/CardPersonal";

const Doctorado = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const personasPerPage = 6;

  useEffect(() => {
    setTimeout(() => {
      setData([
        // Los objetos NO necesitan 'id', cada card maneja su propio estado
        { nombre: "María", apellido: "Lopez", area: "Administración" },
        // etc.
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const indexOfLastPersona = currentPage * personasPerPage;
  const indexOfFirstPersona = indexOfLastPersona - personasPerPage;
  const currentPersonas = data.slice(indexOfFirstPersona, indexOfLastPersona);
  const totalPages = Math.ceil(data.length / personasPerPage);

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
      <div className="personal-section-container">
        <div className="personal-loading">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="personal-section-container">
      <header className="personal-section-header">
        <h1 className="personal-section-title">Doctorado</h1>
        <div className="add-personal">
          <button className="btn-add-personal" title="Agregar">
            <span className="icon-add-personal">
              <i className="fa-solid fa-user-plus"></i>
            </span>
          </button>
        </div>
      </header>

      <div className="personal-content-wrapper">
        {currentPage > 1 && (
          <button 
            className="nav-arrow-personal"
            onClick={handlePrevPage}
            title="Página anterior"
          >
            ‹
          </button>
        )}

        {/* CAMBIAR ESTE BLOQUE - Simple como CardGrupo */}
        <div className="personal-cards-grid">
          {currentPersonas.map((p, i) => (
            <CardPersonal key={i} persona={p} />
          ))}
        </div>

        {currentPage < totalPages && (
          <button 
            className="nav-arrow-personal"
            onClick={handleNextPage}
            title="Página siguiente"
          >
            ›
          </button>
        )}
      </div>

      {totalPages > 1 && (
        <div className="personal-pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`personal-page-btn ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctorado;