import React, { useEffect, useRef, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import AllStudentsList from "../components/AllStudentsList";

const Home = () => {
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
        <AllStudentsList />
      </main>
    </>
  );
};

export default Home;
