import React, { useEffect, useState } from "react";
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

  return (
    <main className="mx-auto my-3">
      {isLoading ? (
        <LoadingStage />
      ) : (
        <>
          <div className="w-[65rem] mx-auto border-slate-200 mt-6 mb-4 flex justify-between items-center">
            <SearchBar queryPart={queryPart} limitNumber={limitNumber} />
            <button
              className="h-8 mr-20 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
              onClick={() => navigate("/student/new-student")}
              disabled={loggedInUser?.role !== "admin"}
            >
              <FaUserPlus className="text-[32px]" />
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
