import React, { useEffect, useRef, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AllStudentsList from "../components/AllStudentsList";
import LoadingStage from "../components/LoadingStage";
import axiosInstance from "../service/httpClient";
import { useDebounce } from "use-debounce";
import { useAuth } from "../context";

const Home = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();

  //loading students and LoadingStage
  const [isLoading, setIsLoading] = useState(true);
  const [listStudents, setListStudents] = useState([]);

  //implementing pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //implementing searchParams
  const [searchParams] = useSearchParams();

  //implementig search(funcitonality helper)
  const queryPart = searchParams.get("q") ?? "";
  let pageNumber = searchParams.get("page") ?? 1;
  let limitNumber = searchParams.get("limit") ?? 20;

  const [debouncedQueryPart] = useDebounce(queryPart, 400);

  useEffect(() => {
    if (!queryPart) {
      axiosInstance
        .get(`/students?page=${pageNumber}&limit=${limitNumber}`)
        .then((response) => {
          setListStudents(response.data.resultStudents);
          setCurrentPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setIsLoading(false);
        })
        .catch((err) => console.log(err.message));
    }
  }, [pageNumber, queryPart, limitNumber]);

  useEffect(() => {
    if (debouncedQueryPart) {
      axiosInstance
        .get(
          `/students?q=${debouncedQueryPart}&page=${pageNumber}&limit=${limitNumber}`
        )
        .then((response) => {
          setListStudents(response.data.resultStudents);
          setCurrentPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setIsLoading(false);
        })
        .catch((err) => console.log(err.message));
    }
  }, [pageNumber, debouncedQueryPart, limitNumber]);

  //description on mouse hover...
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const descriptionText = useRef();

  useEffect(() => {
    if (isDescriptionOpen) {
      descriptionText.current.style.left = "755px";
      descriptionText.current.style.top = "-4px";
    }
  }, [isDescriptionOpen]);

  const mouseEnterHandler = () => {
    setIsDescriptionOpen(true);
  };
  const mouseOutHendler = () => {
    setIsDescriptionOpen(false);
  };

  return (
    <main className="w-[56rem] mx-auto my-3 relative">
      {isLoading ? (
        <LoadingStage />
      ) : (
        <>
          <div className="w-[46rem] mx-auto border-b border-slate-200 flex justify-between mb-3 pb-2">
            <SearchBar queryPart={queryPart} limitNumber={limitNumber} />
            <button
              className="text-3xl h-8 mr-16 text-slate-500 disabled:opacity-30"
              onMouseOver={mouseEnterHandler}
              onMouseOut={mouseOutHendler}
              onClick={() => navigate("/student/new-student")}
              disabled={loggedInUser?.role !== "admin"}
            >
              {isDescriptionOpen && (
                <div
                  ref={descriptionText}
                  className="text-sm absolute w-32 text-center"
                >
                  {loggedInUser?.role !== "admin"
                    ? "Add New Student (Not Allowed)"
                    : "Add New Student"}
                </div>
              )}
              <FaUserPlus />
            </button>
          </div>
          <AllStudentsList
            listStudents={listStudents}
            currentPage={currentPage}
            totalPages={totalPages}
            queryPart={queryPart}
            limitNumber={limitNumber}
          />
        </>
      )}
    </main>
  );
};

export default Home;
