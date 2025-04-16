import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalItems, itemsPerPage, paginate }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate indexOfFirstPayment and indexOfLastPayment
  const indexOfLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;

  // Generate page numbers array
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null;

  // Determine which page numbers to show (show only 5 pages at a time)
  let displayedPageNumbers = [];

  if (totalPages <= 5) {
    // If 5 or fewer pages, show all
    displayedPageNumbers = pageNumbers;
  } else {
    // Always show first page
    if (currentPage <= 3) {
      // Near the start
      displayedPageNumbers = [1, 2, 3, 4, 5];
    } else if (currentPage >= totalPages - 2) {
      // Near the end
      displayedPageNumbers = [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      // Middle - show current and 2 pages before and after
      displayedPageNumbers = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];
    }
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Hiển thị{" "}
            <span className="font-medium">
              {Math.min(indexOfFirstPayment + 1, totalItems)}
            </span>{" "}
            đến{" "}
            <span className="font-medium">
              {Math.min(indexOfLastPayment, totalItems)}
            </span>{" "}
            của <span className="font-medium">{totalItems}</span> khoản thu
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {/* Previous Page Button */}
            <button
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              } text-sm font-medium`}
            >
              <span className="sr-only">Trang trước</span>
              <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Page Numbers */}
            {displayedPageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === number
                    ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {number}
              </button>
            ))}

            {/* Next Page Button */}
            <button
              onClick={() =>
                currentPage < totalPages && paginate(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              } text-sm font-medium`}
            >
              <span className="sr-only">Trang sau</span>
              <FaChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
