import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = ({ queryPart, limitNumber }) => {
  const navigate = useNavigate();

  // Implementing useDebouncedCallback
  const [searchValue, setSearchValue] = useState(queryPart);
  const debounced = useDebouncedCallback((val) => {
    navigate(
      val.target.value
        ? `/?q=${val.target.value}&page=1&limit=${limitNumber}`
        : `/?page=1&limit=${limitNumber}`
    );
  }, 1000);

  const changeHandler = (val) => {
    debounced(val);
    setSearchValue(val.target.value);
  };

  return (
    <div>
      <form className="relative" onSubmit={(event) => event.preventDefault()}>
        <input
          type="text"
          className="w-96 p-2 pl-12 text-sm text-gray-900 bg-white border border-gray-300 outline-none focus:ring-1 ring-blue-500 focus:border-blue-500 hover:bg-gray-50 shadow-sm rounded-lg"
          placeholder="Search..."
          value={searchValue}
          autoFocus={searchValue}
          onChange={(event) => changeHandler(event)}
        />
        <FaSearch className="text-xl text-gray-500 absolute left-4 bottom-2" />
      </form>
    </div>
  );
};

export default SearchBar;
