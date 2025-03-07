import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // <footer className="bg-white rounded-lg shadow dark:bg-[#393939] fixed bottom-0 left-0 w-full">
    //   <div className="w-full mx-auto p-4 flex items-center justify-between">
    //     <span className="text-sm text-gray-500 absolute left-1/2 transform -translate-x-1/2">
    //       © 2024{" "}
    //       <a href="https://hyder.ai/" className="hover:underline">
    //         hyder.ai
    //       </a>
    //       . All Rights Reserved.
    //     </span>
    //     <div className="flex items-center gap-4 ml-auto">
    //       <a
    //         href="mailto:feedback@hyder.ai"
    //         className="text-sm text-gray-500 hover:underline"
    //       >
    //         Send Feedback
    //       </a>
    //       <a
    //       href="/terms-of-use"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className="text-sm text-gray-500 hover:underline"
    //     >
    //       Terms of Use
    //     </a>
    //     <a
    //       href="/privacy-policy"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className="text-sm text-gray-500 hover:underline"
    //     >
    //       Privacy Policy
    //     </a>
    //     </div>
    //   </div>
    // </footer>

    <footer className="bg-white rounded-lg shadow  fixed bottom-0 left-0 w-full">
      <div className="w-full mx-auto p-[0.4rem] md:p-4 flex items-center lg:justify-between justify-center flex-wrap">
        <div className="lg:block hidden w-[13%]"></div>
        <span className="text-sm text-gray-500 sm:text-center">
          © 2024{" "}
          <a href="https://hyder.ai/" className="hover:underline">
            hyder.ai
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
          <li className="list-none">
            <a
              href="mailto:feedback@hyder.ai"
              className="text-sm text-gray-500 me-[0.5rem]  md:me-4  hover:underline"
            >
              Send Feedback
            </a>
            <a
       href="/#/terms-of-use"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 me-[0.5rem]  md:me-4 hover:underline"
            >
              Terms of Use
            </a>
          </li>
          <li className="list-none">
            <a
              href="/#/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 me-[0.5rem]  md:me-4 hover:underline"
            >
              Privacy Policy
            </a>{" "}
          </li>
          {/* <li className="list-none">
            <a href="#" className="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li className="list-none">
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li> */}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
