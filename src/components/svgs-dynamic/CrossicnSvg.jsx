import { toggleSidebar } from "@/features/layout/layoutSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";



function CrossicnSvg({ className }) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.layout.darkMode);
  const strokeColor = darkMode ? "#FFFFFF" : "#242424"; // Change these colors as per your design

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13.097"
        height="13.097"
        viewBox="0 0 13.097 13.097"
        className={className} // Apply the className prop here
      >
        <g id="Group" transform="translate(1.414 1.414)">
          <path
            id="Vector"
            d="M10.269,0,0,10.269"
            transform="translate(0 0)"
            fill="none"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            id="Vector-2"
            data-name="Vector"
            d="M10.27,10.27V0H0"
            transform="translate(0 0)"
            fill="none"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </>
  );
}

export default CrossicnSvg;
