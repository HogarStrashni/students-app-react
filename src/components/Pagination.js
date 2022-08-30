import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, queryPart }) => {
  const navigate = useNavigate();
  const allPages = [];
  for (let i = 1; i <= totalPages; i++) {
    allPages.push(i);
  }

  const paginationHandler = (val) => {
    queryPart
      ? navigate(`/?q=${queryPart}&page=${val}`)
      : navigate(`/?page=${val}`);
  };

  return (
    <div className="flex justify-center my-5">
      <button
        className="w-8 mx-2 border border-slate-500 rounded-md disabled:opacity-30"
        onClick={() => paginationHandler(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <FaChevronLeft className="text-center inline pb-1" />
      </button>
      {allPages.map((item, index) => {
        return (
          <button
            key={index}
            className={`w-6 mx-0.5 border border-slate-500 rounded-md ${
              currentPage === item ? "bg-blue-500" : null
            }`}
            onClick={() => paginationHandler(item)}
          >
            {item}
          </button>
        );
      })}
      <button
        className="w-8 mx-2 border border-slate-500 rounded-md disabled:opacity-30"
        onClick={() => paginationHandler(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <FaChevronRight className="text-center inline pb-1" />
      </button>
    </div>
  );
};

export default Pagination;
