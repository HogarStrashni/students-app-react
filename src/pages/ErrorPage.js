import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="text-3xl bg-green-200">Error</div>;
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id praesentium
        provident ratione nesciunt quo magni ad reiciendis, et fugit, error
        nobis a voluptatum temporibus iste illo dignissimos tempora ab eum
        repellat doloribus unde ipsam recusandae. Sequi iste rerum quae officia
        enim commodi accusamus adipisci nulla. Eius, doloribus itaque.
        Architecto, quasi.
      </p>
      <Link to="/" className="text-3xl bg-green-200">
        HOME PAGE
      </Link>
    </>
  );
};

export default Error;
