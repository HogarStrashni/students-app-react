import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// TailWindCSS variable
const buttonPag =
  "py-0.5 text-sm text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-200 font-medium rounded-lg";
const buttonDisabled =
  "w-8 mx-2 disabled:opacity-30 disabled:cursor-not-allowed";

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
    <div className="flex justify-between my-5">
      <div className="w-28"></div>
      <div>
        <button
          className={`${buttonPag} ${buttonDisabled}`}
          onClick={() => paginationHandler(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <FaChevronLeft className="text-center inline pb-1" />
        </button>
        {allPages.map((item, index) => {
          return (
            <button
              key={index}
              className={`w-6 mx-0.5 ${buttonPag} ${
                currentPage === item ? "ring-2 ring-gray-400 bg-gray-100" : null
              }`}
              onClick={() => paginationHandler(item)}
            >
              {item}
            </button>
          );
        })}
        <button
          className={`${buttonPag} ${buttonDisabled}`}
          onClick={() => paginationHandler(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <FaChevronRight className="text-center inline pb-1" />
        </button>
      </div>
      <div className="w-28">
        <label htmlFor="limit" className="mr-1 ml-4 text-xs text-gray-700">
          Per page:{" "}
        </label>
        <select
          name="limit"
          id="limit"
          defaultValue={20}
          className="py-0.5 text-gray-900 text-sm font-medium border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100"
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
