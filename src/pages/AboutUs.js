import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <>
      <div className="text-3xl bg-red-200">
        <h1>AboutUs</h1>
      </div>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea quaerat
        maiores ex cumque nobis ipsum et, dolorum debitis accusamus ratione
        suscipit aliquid eligendi excepturi repellendus accusantium officiis eum
        tempora qui unde hic deserunt sint? Veniam omnis repellat accusantium
        fuga adipisci ea enim deserunt illum quo quae earum alias fugiat et ipsa
        qui voluptates, culpa odit eligendi expedita labore accusamus sequi
        aperiam? Inventore reprehenderit voluptates saepe corrupti quaerat eaque
        temporibus nostrum alias? Cupiditate quae vero explicabo quia? Molestias
        ducimus obcaecati tenetur blanditiis magni, labore incidunt similique
        eveniet amet dolores quos, ipsam modi ratione magnam voluptatem
        quisquam, veritatis dolorem asperiores dolore vel!
      </p>
      <Link to="/" className="text-3xl bg-red-200">
        HOME PAGE
      </Link>
    </>
  );
};

export default AboutUs;
