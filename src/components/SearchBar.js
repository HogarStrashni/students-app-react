import React from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ queryPart, limitNumber }) => {
  const navigate = useNavigate();

  return (
    <div>
      <form className="relative" onSubmit={(event) => event.preventDefault()}>
        <input
          type="text"
          className="w-96 p-2.5 pl-12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-lg"
          placeholder="Search for Students..."
          value={queryPart}
          onChange={(event) =>
            navigate(
              event.target.value
                ? `/?q=${event.target.value}&page=1&limit=${limitNumber}`
                : `/?page=1&limit=${limitNumber}`
            )
          }
        />
        <FaSearch className="text-xl text-gray-500 absolute left-4 bottom-2.5" />
      </form>
    </div>
  );
};

export default SearchBar;
