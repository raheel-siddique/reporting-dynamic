import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <section className="">
      <div
        className="py-8 px-4 mx-auto h-screen flex justify-center items-center lg:py-16 lg:px-6"
        style={{
          height: "calc(100vh - 76px)",
        }}
      >
        <div className="mx-auto text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
            Something's missing.
          </p>

          <a
            href="/#/"
            className="inline-flex text-black border border-[#C6BCFF] bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
          >
            Back to Homepage
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
