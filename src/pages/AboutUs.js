import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import logo from "../service/logo.png";

const AboutUs = () => {
  return (
    <>
      <header className="w-[60rem] h-16 mx-auto bg-slate-300 flex justify-between items-center">
        <div className="h-16 py-3 px-4">
          <img src={logo} alt="logo" className="h-10 rounded-lg" />
        </div>

        <Link to="/" className="text-3xl mr-4 text-slate-100">
          <FaHome />
        </Link>
      </header>
      <main className="w-[56rem] mx-auto my-3">
        <div className="h-[calc(100vh-136px)] w-[100%]">
          <h2 className="text-3xl bg-red-200">About Us</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea quaerat
            maiores ex cumque nobis ipsum et, dolorum debitis accusamus ratione
            suscipit aliquid eligendi excepturi repellendus accusantium officiis
            eum tempora qui unde hic deserunt sint? Veniam omnis repellat
            accusantium fuga adipisci ea enim deserunt illum quo quae earum
            alias fugiat et ipsa qui voluptates, culpa odit eligendi expedita
            labore accusamus sequi aperiam? Inventore reprehenderit voluptates
            saepe corrupti quaerat eaque temporibus nostrum alias? Cupiditate
            quae vero explicabo quia? Molestias ducimus obcaecati tenetur
            blanditiis magni, labore incidunt similique eveniet amet dolores
            quos, ipsam modi ratione magnam voluptatem quisquam, veritatis
            dolorem asperiores dolore vel!
          </p>
          <Link to="/" className="text-3xl bg-red-200">
            HOME PAGE
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
