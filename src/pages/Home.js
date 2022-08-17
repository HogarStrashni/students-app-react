import React, { useEffect, useRef, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AllStudentsList from "../components/AllStudentsList";
import LoadingStage from "../components/LoadingStage";
import axios from "axios";

const debounce = (cb, time = 400) => {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), time);
  };
};

const Home = () => {
  //loading students and LoadingStage
  const [isLoading, setIsLoading] = useState(false);
  const [listStudents, setListStudents] = useState([]);

  //implementing searchParams
  const [searchParams, setSearchParams] = useSearchParams();

  //implementig search(funcitonality helper)
  const queryPart = searchParams.get("q") ?? "";

  useEffect(() => {
    axios
      .get(`https://students-app-server-plum.vercel.app/api/students`)
      .then((response) => {
        setListStudents(response.data);
        setIsLoading(false);
      })
      .catch((msg) => console.log(msg));
  }, []);

  const fetchData = useRef(
    debounce((searchParams) => {
      if (searchParams.get("q")) {
        axios
          .get(
            `https://students-app-server-plum.vercel.app/api/students/${searchParams}`
          )
          .then((response) => {
            setListStudents(response.data);
            setIsLoading(false);
          })
          .catch((msg) => console.log(msg));
      }
    })
  );

  useEffect(() => {
    fetchData.current(searchParams);
  }, [fetchData, searchParams, isLoading]);

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
              <SearchBar queryPart={queryPart} />
              <Link to="/student/new-student">
                <button
                  className="text-3xl h-8 mr-16 text-slate-500"
                  onMouseOver={mouseEnterHandler}
                  onMouseOut={mouseOutHendler}
                  // onClick={() => setSearchItem("")}
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
