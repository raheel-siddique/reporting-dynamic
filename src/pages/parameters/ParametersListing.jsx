const ParametersListing = ({ parameter }) => {
  return (
    <>
      <div
        className={`group flex gap-3 justify-between items-center cursor-pointer py-1.5 px-3 rounded-md bg-custom-gradient-green text-white `}
      >
        <div className="flex gap-5 items-center">
          <h2 className={`text-[15px] text-white`}>{parameter.name}</h2>
        </div>
      </div>
    </>
  );
};

export default ParametersListing;
