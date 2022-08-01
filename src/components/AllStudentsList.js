import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { getStudents } from "../service/data";
import { AppSearchContext } from "../context";

const AllStudentsList = () => {
  //implementig search
  const { searchItem } = useContext(AppSearchContext);

  const [listStudents, setListStudents] = useState([]);
  useEffect(() => {
    getStudents(searchItem)
      .then((data) => setListStudents(data))
      .catch((msg) => console.log(msg));
  }, [searchItem]);

  //table scroll bar
  const referTbody = useRef();
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(true);

  useLayoutEffect(() => {
    let heightTab = referTbody.current.offsetHeight;
    setIsScrollbarVisible(heightTab > window.innerHeight - 162);
  }, [listStudents]);

  //<Link> replacment for table error!
  const navigate = useNavigate();

  return (
    <>
      <table className="border">
        <tbody>
          <tr className="border">
            <th className="border text-left w-12">No.</th>
            <th className="border text-left w-32">First Name</th>
            <th className="border text-left w-32">Last Name</th>
            <th className="border text-left w-32">Index Number</th>
            <th className="border text-left w-80">E-mail</th>
            <th className="border text-left w-36">Contact Phone</th>
          </tr>
        </tbody>
      </table>
      <div className="h-[calc(100vh-162px)] overflow-auto">
        <table className="border">
          <tbody ref={referTbody}>
            {listStudents.map((item, index) => {
              const { firstName, lastName, indexNumber, email, phone } = item;
              return (
                <tr
                  onClick={() => navigate(`/student/${item.indexNumber}`)}
                  key={item.indexNumber}
                  className="odd:bg-white even:bg-slate-100 hover:bg-green-300 cursor-pointer"
                >
                  <td className="w-12 border">{index + 1}.</td>
                  <td className="w-32 border">{firstName}</td>
                  <td className="w-32 border">{lastName}</td>
                  <td className="w-32 border">{indexNumber}</td>
                  <td className="w-80 border">{email}</td>
                  <td
                    className="border"
                    style={{
                      width: isScrollbarVisible ? "calc(9rem - 17px)" : "9rem",
                    }}
                  >
                    {phone}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllStudentsList;
