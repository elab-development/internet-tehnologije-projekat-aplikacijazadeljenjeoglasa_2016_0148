import React from 'react';
import '../styles/Pagination.css';

function Pagination({ currentPage, jobsPerPage, totalJobs, onPageChange, goToPreviousPage, goToNextPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li>
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Prethodna
          </button>
        </li>
        <li>
          Strana {currentPage} od {pageNumbers.length}
        </li>
        <li>
          <button onClick={goToNextPage} disabled={currentPage === pageNumbers.length}>
            Sledeća
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;