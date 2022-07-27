import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaUserPlus } from "react-icons/fa";
import { AppSearchContext } from "../context";
import StudentList from "../components/StudentList";

const Home = () => {
  const { searchItem, setSearchItem } = useContext(AppSearchContext);

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
    <>
      <section className="w-[56rem] mx-auto my-8 flex justify-between">
        <form
          className="pr-4 flex"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="search-item" className="px-2 text-2xl text-slate-200">
            <FaSearch />
          </label>
          <input
            type="text"
            id="search-item"
            className="border-2 rounded"
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
        <Link to="/" className="text-3xl mr-4 text-slate-500">
          <FaHome />
        </Link>
      </section>
      <section className="w-[56rem] mx-auto my-3">
        <StudentList />
      </section>
    </>
  );
};

export default Home;
