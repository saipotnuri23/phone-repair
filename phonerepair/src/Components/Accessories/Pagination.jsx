import React from 'react';
import './Pagination.css';

const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination-dots">
      {Array.from({ length: totalPages }, (_, i) => (
        <span
          key={i}
          className={currentPage === i + 1 ? 'dot active' : 'dot'}
          onClick={() => setCurrentPage(i + 1)}
        ></span>
      ))}
    </div>
  );
};

export default Pagination;
