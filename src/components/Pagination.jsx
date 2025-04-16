import React from "react";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  paginate,
  indexOfFirstItem,
  indexOfLastItem,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 bg-white rounded-b-lg">
      <div>
        <p className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
          đến <span className="font-medium">{indexOfLastItem}</span> trong tổng
          số <span className="font-medium">{totalItems}</span> phòng
        </p>
      </div>
      <div>
        <nav className="flex space-x-2" aria-label="Pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Trước
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                currentPage === number
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === Math.ceil(totalItems / itemsPerPage)
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Tiếp
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
