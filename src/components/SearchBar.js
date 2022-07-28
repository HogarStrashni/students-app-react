import React, { useContext, useState, useEffect, useRef } from "react";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import { AppSearchContext } from "../context";

const SearchBar = () => {
  const { searchItem, setSearchItem } = useContext(AppSearchContext);

  // description...on mouse hover
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const descriptionText = useRef();
  useEffect(() => {
    if (isDescriptionOpen) {
      descriptionText.current.style.left = "-40px";
      descriptionText.current.style.top = "-19px";
    }
  }, [isDescriptionOpen]);

  const mouseEnterHandler = () => {
    setIsDescriptionOpen(true);
  };
  const mouseOutHendler = () => {
    setIsDescriptionOpen(false);
  };

  return (
    <div className="my-4 flex justify-between">
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
      <button
        className="px-2 text-3xl w-12 h-8 text-slate-500 relative"
        onMouseOver={mouseEnterHandler}
        onMouseOut={mouseOutHendler}
      >
        {isDescriptionOpen && (
          <div
            ref={descriptionText}
            className="text-sm absolute w-32 text-center"
          >
            Add New Student
          </div>
        )}
        <FaUserPlus />
      </button>
    </div>
  );
};

export default SearchBar;
