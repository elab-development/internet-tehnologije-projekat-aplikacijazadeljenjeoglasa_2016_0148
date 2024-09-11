import React from "react";
import "../styles/Pagination.css";

function Pagination({
  currentPage,
  totalPages,
  goToPreviousPage,
  goToNextPage,
}) {
  return (
    <nav>
      <ul className="pagination">
        <li>
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Prethodna
          </button>
        </li>
        <li>
          Strana {currentPage} od {totalPages}
        </li>
        <li>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Sledeća
          </button>
        </li>
      </ul>
    </nav>
  );
}
export default Pagination;
