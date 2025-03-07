const SingleTab = ({ tab, onChange, activeTab }) => {
  return (
    <>
      <button
        className={`flex gap-3 justify-between items-center group h-max p-2.5 py-1.5 rounded-md border border-custom-gray bg-white hover:bg-custom-gradient-green active:bg-custom-gradient-green ${
          activeTab.id === tab.id
            ? "bg-custom-gradient-green text-white border-transparent"
            : ""
        }`}
        onClick={() => onChange(tab.id)}
      >
        <h2
          className={`text-[14px] text-nowrap group-hover:text-white group-active:text-white ${
            activeTab.id === tab.id ? "bg-custom-gradient-green text-white" : ""
          }`}
        >
          {tab.name}
        </h2>
        <div
          className={`flex justify-center items-center w-5 h-5 rounded-full p-1 text-[10px] group-hover:text-white text-[#1E1E1E] group-hover:bg-[#32a733]  group-active:bg-[#32a733] group-active:text-white ${
            activeTab.id === tab.id
              ? "bg-[#32a733] text-white"
              : "bg-custom-gray"
          }`}
        >
          {tab.count}
        </div>
      </button>
    </>
  );
};

export default SingleTab;
