import { useSelector } from "react-redux";

const DashboardTitle = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <span className="text-[24px] font-semibold">
          Hey, {user.name ?? "Guest User"}
        </span>
      </div>
    </>
  );
};

export default DashboardTitle;
