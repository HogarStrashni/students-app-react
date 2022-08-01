import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { AppSearchContext } from "../context";

const SearchBar = () => {
  const { searchItem, setSearchItem } = useContext(AppSearchContext);

  return (
    <div className="mr-16 flex justify-between">
      <form
        className="pr-4 flex items-center"
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor="search-item" className="px-2 text-2xl text-slate-200">
          <FaSearch />
        </label>
        <input
          type="text"
          id="search-item"
          className="border-2 rounded w-60"
          placeholder="Search..."
          value={searchItem}
          onChange={(event) => setSearchItem(event.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
