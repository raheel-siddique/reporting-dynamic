import SingleTab from "./SingleTab";

const TabsFilter = ({ tabs = [], onChange, activeTab }) => {
  return (
    <>
      {tabs.map((tab) => {
        return (
          <SingleTab tab={tab} activeTab={activeTab} onChange={onChange} />
        );
      })}
    </>
  );
};

export default TabsFilter;
