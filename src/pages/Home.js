import React, { useEffect, useRef, useState, useContext } from "react";
import { useDebounce } from "use-debounce";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AllStudentsList from "../components/AllStudentsList";
import LoadingStage from "../components/LoadingStage";
import axios from "axios";
import { AppSearchContext } from "../context";

const Home = () => {
  const { searchParams, searchItem, setSearchItem } =
    useContext(AppSearchContext);
  //loading students and LoadingStage
  const [isLoading, setIsLoading] = useState(true);
  const [listStudents, setListStudents] = useState([]);

  //useDebounce on student search
  const [debounceStudent] = useDebounce(searchParams, 500);

  useEffect(() => {
    axios
      .get(
        `https://students-app-server-plum.vercel.app/api/students/${debounceStudent}`
      )
      .then((response) => {
        setListStudents(response.data);
        setIsLoading(false);
      })
      .catch((msg) => console.log(msg));
  }, [debounceStudent, isLoading]);

  //description on mouse hover...
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const descriptionText = useRef();

  useEffect(() => {
    if (isDescriptionOpen) {
      descriptionText.current.style.left = "755px";
      descriptionText.current.style.top = "6px";
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
      <main className="w-[56rem] mx-auto my-3 relative">
        {isLoading ? (
          <LoadingStage />
        ) : (
          <>
            <div className="w-[46rem] mx-auto border-b border-slate-200 flex justify-between mb-3 pb-2">
              <SearchBar
                searchItem={searchItem}
                setSearchItem={setSearchItem}
              />
              <Link to="/student/new-student">
                <button
                  className="text-3xl h-8 mr-16 text-slate-500"
                  onMouseOver={mouseEnterHandler}
                  onMouseOut={mouseOutHendler}
                  onClick={() => setSearchItem("")}
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
              </Link>
            </div>

            <AllStudentsList listStudents={listStudents} />
          </>
        )}
      </main>
    </>
  );
};

export default Home;
