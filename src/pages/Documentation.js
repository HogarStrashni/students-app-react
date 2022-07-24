import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import logo from "../service/logo.png";

const Documentation = () => {
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
          <h2 className="text-3xl bg-blue-200">Documentation</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
            accusantium accusamus commodi numquam impedit at laudantium ipsa non
            inventore exercitationem. Corrupti sequi deserunt nihil adipisci et
            maxime mollitia, cumque veritatis aspernatur illo animi eveniet
            beatae nemo enim asperiores rem dolorum quo dolorem expedita modi,
            recusandae optio explicabo officia! Vitae nobis cupiditate natus
            voluptates, hic quas voluptatem aperiam, placeat sit doloribus
            repellat voluptas est vero ullam odio. Minus labore in explicabo
            molestiae quos assumenda quidem debitis eos vitae, error cum numquam
            fugiat voluptates eum, facere ut neque dolores itaque tenetur! Nemo
            quod nostrum alias dignissimos soluta ullam, harum ratione laborum
            explicabo, dolorem eveniet hic veniam amet? Explicabo,
            exercitationem pariatur dolorem alias eos iure odio quas eius
            quisquam quibusdam, illo id nulla perspiciatis dolore omnis totam
            quasi corporis eveniet aut maxime accusamus labore repellendus odit
            temporibus. Magni non molestiae ex quis hic reiciendis est error
            pariatur nesciunt atque blanditiis recusandae provident, harum
            veritatis iste inventore beatae voluptates aperiam perspiciatis
            dignissimos amet at dolorum vel! Deleniti molestias dolorum
            repudiandae rem possimus doloribus earum, assumenda sed mollitia
            autem est commodi quisquam! Voluptatem eaque aliquam delectus fuga,
            quos mollitia incidunt quibusdam deleniti porro? Quas voluptates
            numquam sunt ullam quidem, modi ratione necessitatibus sit
            consequatur. Quidem exercitationem vel quaerat vitae culpa? Beatae
            qui asperiores mollitia suscipit? Quae perspiciatis totam beatae
            voluptatum, optio illum minus dolore
          </p>
          <Link to="/" className="text-3xl bg-blue-200">
            HOME PAGE
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Documentation;
