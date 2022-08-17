import React from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ queryPart }) => {
  const navigate = useNavigate();

  return (
    <div className="ml-16 flex justify-between">
      <form
        className="pr-4 flex items-center"
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor="search-item" className="pr-2 text-2xl text-slate-200">
          <FaSearch />
        </label>
        <input
          type="text"
          id="search-item"
          className="border-2 rounded w-80"
          placeholder="Search..."
          value={queryPart}
          onChange={(event) =>
            navigate(event.target.value ? `/?q=${event.target.value}` : "/")
          }
        />
      </form>
    </div>
  );
};

export default SearchBar;
