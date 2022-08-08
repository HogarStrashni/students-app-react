import React, { useEffect, useRef, useState, useContext } from "react";
import { useDebounce } from "use-debounce";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import AllStudentsList from "../components/AllStudentsList";
import { getStudents } from "../service/data";
import { AppSearchContext } from "../context";
import LoadingStage from "../components/LoadingStage";

const Home = () => {
  //implementig search
  const { searchItem } = useContext(AppSearchContext);

  //loading students and LoadingStage
  const [isLoading, setIsLoading] = useState(true);
  const [listStudents, setListStudents] = useState([]);

  //useDebounce on student search
  const [debounceStudent] = useDebounce(searchItem, 500);

  useEffect(() => {
    getStudents(debounceStudent)
      .then((data) => setListStudents(data))
      .catch((msg) => console.log(msg));
    setIsLoading(false);
  }, [searchItem, isLoading, debounceStudent]);

  //description on mouse hover...
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
      <main className="w-[56rem] mx-auto my-3 relative">
        <Link to="/student/new-student">
          <button
            className="px-2 text-3xl w-12 h-8 text-slate-500 absolute top-[-3.75rem] left-[64%]"
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
        </Link>
        {isLoading ? (
          <LoadingStage />
        ) : (
          <AllStudentsList listStudents={listStudents} />
        )}
      </main>
    </>
  );
};

export default Home;
