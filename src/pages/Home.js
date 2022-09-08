import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AllStudentsList from "../components/AllStudentsList";
import LoadingStage from "../components/LoadingStage";
import axiosInstance from "../service/httpClient";
import { useAuth } from "../context";

const Home = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();

  // Loading students and LoadingStage
  const [listStudents, setListStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Implementing pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Getting all searchParams
  const [searchParams] = useSearchParams();
  const queryPart = searchParams.get("q") ?? "";
  let pageNumber = searchParams.get("page") ?? 1;
  let limitNumber = searchParams.get("limit") ?? 20;

  useEffect(() => {
    if (!queryPart) {
      setIsLoading(true);
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
    if (queryPart) {
      setIsLoading(true);
      axiosInstance
        .get(`/students?q=${queryPart}&page=${pageNumber}&limit=${limitNumber}`)
        .then((response) => {
          setListStudents(response.data.resultStudents);
          setCurrentPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setIsLoading(false);
        })
        .catch((err) => console.log(err.message));
    }
  }, [pageNumber, queryPart, limitNumber]);

  console.log(listStudents);

  return (
    <>
      {isLoading && <LoadingStage />}
      <main>
        <div className="mx-auto my-3">
          <div className="w-[66rem] mx-auto border-slate-200 mt-4 mb-4 flex justify-between items-center">
            <SearchBar queryPart={queryPart} limitNumber={limitNumber} />
            {loggedInUser && (
              <button
                className="flex items-center px-5 py-2 text-sm font-medium text-blue-800 bg-white hover:text-white border border-blue-700 hover:bg-blue-700 rounded-lg shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
                onClick={() => navigate("/student/new-student")}
                disabled={loggedInUser?.role !== "admin"}
              >
                <FaUserPlus className="text-xl" />
                <span className="pl-2">Add new Student</span>
              </button>
            )}
          </div>
          <AllStudentsList
            listStudents={listStudents}
            currentPage={currentPage}
            totalPages={totalPages}
            queryPart={queryPart}
            limitNumber={limitNumber}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
