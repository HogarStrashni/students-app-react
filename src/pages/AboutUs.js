import React from "react";
import Footer from "../components/Footer";
import HeaderDoc from "../components/HeaderDoc";

const AboutUs = () => {
  return (
    <>
      <HeaderDoc />
      <main className="w-[56rem] mx-auto my-3">
        <div className="h-[calc(100vh-156px)] w-[100%]">
          <h2 className="text-3xl bg-red-200 my-8">About Us</h2>
          <section>
            <article>
              <h1 className="text-2xl my-4">
                Lorem ipsum dolor sit amet consectetur.
              </h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea
                quaerat maiores ex cumque nobis ipsum et, dolorum debitis
                accusamus ratione suscipit aliquid eligendi excepturi
                repellendus accusantium officiis eum tempora qui unde hic
                deserunt sint? Veniam omnis repellat accusantium fuga adipisci
                ea enim deserunt illum quo quae earum alias fugiat et ipsa qui
                voluptates, culpa odit eligendi expedita labore accusamus sequi
                aperiam? Inventore reprehenderit voluptates saepe corrupti
                quaerat eaque temporibus nostrum alias? Cupiditate quae vero
                explicabo quia? Molestias ducimus obcaecati tenetur blanditiis
                magni!
              </p>
            </article>
            <article>
              <h1 className="text-2xl my-4">
                Lorem ipsum dolor sit amet consectetur.
              </h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea
                quaerat maiores ex cumque nobis ipsum et, dolorum debitis
                accusamus ratione suscipit aliquid eligendi excepturi
                repellendus accusantium officiis eum tempora qui unde hic
                deserunt sint? Veniam omnis repellat accusantium fuga adipisci
                ea enim deserunt illum quo quae earum alias fugiat et ipsa qui
                voluptates, culpa odit eligendi expedita labore accusamus sequi
                aperiam? Inventore reprehenderit voluptates saepe corrupti
                quaerat eaque temporibus nostrum alias? Cupiditate quae vero
                explicabo quia? Molestias ducimus obcaecati tenetur blanditiis
                magni!
              </p>
            </article>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
