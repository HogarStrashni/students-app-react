import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, queryPart, limitNumber }) => {
  const navigate = useNavigate();

  const allPages = [];
  for (let i = 1; i <= totalPages; i++) {
    allPages.push(i);
  }

  const allLimits = [];
  for (let i = 14; i <= 32; i += 3) {
    allLimits.push(i);
  }

  const paginationHandler = (val) => {
    queryPart
      ? navigate(`/?q=${queryPart}&page=${val}&limit=${limitNumber}`)
      : navigate(`/?page=${val}&limit=${limitNumber}`);
  };

  return (
    <div className="flex justify-center my-5">
      <div>
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
      <div className="w-40 border">
        <label htmlFor="limit">Show per Page: </label>
        <select
          name="limit"
          id="limit"
          defaultValue={20}
          onChange={(event) => {
            queryPart
              ? navigate(
                  `/?q=${queryPart}&page=${currentPage}&limit=${event.target.value}`
                )
              : navigate(`/?page=${currentPage}&limit=${event.target.value}`);
          }}
        >
          {allLimits.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
