const AddBuildingBtn = ({ openModal }) => {
  return (
    <>
      <button
        onClick={openModal}
        className="flex gap-3 text-nowrap justify-between items-center cursor-pointer p-2.5 py-1.5 text-[14px] rounded-md border bg-custom-gradient-green active:bg-custom-gradient-green"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15.5"
          height="15.5"
          viewBox="0 0 15.5 15.5"
        >
          <g
            id="Group_23168"
            data-name="Group 23168"
            transform="translate(-1103.25 -12.25)"
          >
            <path
              id="Path_38297"
              data-name="Path 38297"
              d="M12,5V19"
              transform="translate(1099 8)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
            <path
              id="Path_38298"
              data-name="Path 38298"
              d="M5,12H19"
              transform="translate(1099 8)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
          </g>
        </svg>
        <h2 className="text-[14px] text-white">Add Building</h2>
      </button>
    </>
  );
};

export default AddBuildingBtn;
