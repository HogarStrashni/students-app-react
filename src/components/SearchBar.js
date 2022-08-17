import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchItem, setSearchItem }) => {
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
          value={searchItem}
          onChange={(event) => setSearchItem(event.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
