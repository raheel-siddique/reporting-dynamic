import React, { useCallback, useMemo, useState } from "react";
import dlticon from "../../assets/dlticon.svg";
import { useDebounce } from "use-debounce";
import edticon from "../../assets/edticon.svg";
import { useFlats } from "../../hooks/useFlats";
import MyTable from "../../components/myTable/MyTable";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AddFlatModal from "./AddFLatModal";
import SearchField from "../../components/search/Searchfield";
import EditFlatModal from "./EditFlatModal";
import DeleteModal from "../../components/modal/DeleteModal";

import { useSelector } from "react-redux";

function FlatListing({ activeBuilding, singleBuilding, hideTopBar }) {
  const [checkedItems, setCheckedItems] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const [flatPage, setFlatPage] = useState(1);
  const [flatPageSize, setFlatPageSize] = useState(50);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEditFlatModal, setShowEditModal] = useState(false);
  const [singleFlatData, setSingleFlatData] = useState(null);
  const closeModal = () => setShowLoginModal(false);
  const openModal = () => setShowLoginModal(true);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // 500ms debounce
  const [showDltModal, setShowDltModal] = useState(false);
  const [flatStatus, setFlatStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [flatId, setFlatId] = useState(null);

  const [orderBy, setOrderBy] = useState("Ascending"); // Default to ascending
  const [orderByProperty, setOrderByProperty] = useState("Number"); // Default to sorting by Name
  const { hasManagementAccess } = useSelector((state) => state.auth);

  let TenantStatus = hideTopBar ? 3 : null;

  const {
    flatsData,
    totalCount,
    isFlatsLoading,
    deleteFlatMutation,
    flatTypesData,
    flatTypeLoading,
    fetchAllFlatsData,
  } = useFlats(
    page,
    pageSize,
    activeBuilding ? activeBuilding : null,
    null,
    debouncedSearchQuery,
    // !hideTopBar ? flatStatus : 1,
    flatStatus,

    orderBy,
    orderByProperty,
    flatPage,
    flatPageSize,
    TenantStatus
  );

  const flatsColumnToOrderByProperty = {
    id: "Id", // Flat ID
    number: "Number", // Flat number
    description: "Description", // Flat description
    ["flatType.name"]: "FlatType.Name", // Flat type name
    flatStatusText: "FlatStatusText", // Flat status text
    sewerageAccountId: "SewerageAccountId", // Flat status text
    fewaAccountId: "FewaAccountId", // Flat status text
  };

  const flatStatusOptions = [
    {
      id: 1,
      label: "Vacant",
      count: singleBuilding?.flatCount?.vacant,
      background: "#e9f7e9", // Light green
      color: "#23ae24", // Dark green
    },
    {
      id: 2,
      label: "Occupied",
      count: singleBuilding?.flatCount?.occupiedBreakDown?.other,
      background: "#ffe5b4", // Light orange
      color: "#d97706", // Dark orange
    },
    {
      id: 4,
      label: "LeaseExpired",
      count: singleBuilding?.flatCount?.occupiedBreakDown?.expired,
      background: "#fde2e2", // Light red
      color: "#d32f2f", // Dark red
    },
    {
      id: 3,
      label: "Maintenance",
      count: singleBuilding?.flatCount?.maintenance,
      background: "#fff3cd", // Light yellow
      color: "#856404", // Dark yellow
    },
  ];

  const columns = useMemo(() => {
    const baseColumns = [
      { Header: "Flat #", accessor: "number" },
      {
        Header: "Flat Type",
        accessor: "flatType.name",
      },
      { Header: "Description", accessor: "description" },
      // { Header: "Sewerage Account Id", accessor: "sewerageAccountId" },
      // { Header: "FEWA Account Id", accessor: "fewaAccountId" },
      {
        Header: "Status",
        accessor: "flatStatusText",
        Cell: ({ value }) => {
          const status = flatStatusOptions.find(
            (status) => status.label == value
          );
          return (
            <div
              className="inline-flex cursor-pointer items-center justify-center px-4 py-1 text-sm font-medium rounded-[4px]"
              style={{
                background: status?.background || "",
                color: status?.color || "#333",
              }}
            >
              {value == "LeaseExpired" ? "Lease Expired" : value}
            </div>
          );
        },
      },
    ];

    if (!hideTopBar) {
      baseColumns.push({
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex gap-[20px]">
            {hasManagementAccess && (
              <img
                className="cursor-pointer"
                onClick={() => {
                  deleteFlats(row.original.id);
                }}
                src={dlticon}
                alt=""
              />
            )}

            <img
              className="cursor-pointer"
              onClick={() => {
                editFlat(row.original);
              }}
              src={edticon}
              alt=""
            />
          </div>
        ),
      });
    }

    return baseColumns;
  }, [checkedItems, hideTopBar, hasManagementAccess]);

  const deleteFlats = (id) => {
    setFlatId(id);

    setShowDltModal(true);
  };
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  }, []);
  const editFlat = (data) => {
    setSingleFlatData(data);
    setShowEditModal(true);
  };

  const handleChangeStatus = async (e) => {
    const selectedStatus = e.target.value;
    setFlatStatus(selectedStatus);
  };

  const handleExportCSV = async () => {
    setIsLoading(true); // Start loading
    try {
      const allFlats = await fetchAllFlatsData(); // Fetch all flats data

      // Define headers for the CSV file
      const csvHeaders = [
        { label: "Flat ID", key: "id" },
        { label: "Flat Number", key: "number" },
        { label: "Description", key: "description" },
        { label: "Flat Status", key: "flatStatusText" },
        { label: "Flat Type", key: "flatType.name" },
        { label: "Building ID", key: "buildingId" },
        { label: "Sewerage Account Id", key: "sewerageAccountId" },
        { label: "FEWA Account Id", key: "fewaAccountId" },
      ];

      // Map data to match the CSV structure
      const csvData = allFlats.map((flat) => ({
        id: flat.id || "N/A",
        number: flat.number || "N/A",
        description: flat.description || "N/A",
        flatStatusText: flat.flatStatusText || "N/A",
        "flatType.name": flat.flatType?.name || "N/A",
        buildingId: flat.buildingId || "N/A",
        sewerageAccountId: flat.sewerageAccountId || "N/A",
        fewaAccountId: flat.fewaAccountId || "N/A",
      }));

      // Convert to CSV Blob
      const blob = new Blob(
        [
          `${csvHeaders.map((header) => header.label).join(",")}\n` +
            csvData
              .map((row) =>
                csvHeaders
                  .map((header) => `"${row[header.key] || "N/A"}"`)
                  .join(",")
              )
              .join("\n"),
        ],
        { type: "text/csv;charset=utf-8;" }
      );

      // Trigger download
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = "flats_export.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div
      className={`relative overflow-x-auto  bg-white ${
        !hideTopBar
          ? "border border-black/10 rounded-lg mt-[20px] shadow-md sm:rounded-lg opacity-100"
          : ""
      }`}
    >
      {!hideTopBar && <div className="pt-[20px] pl-[20px] flex gap-12"></div>}

      {!hideTopBar && (
        <div className="pt-[15px] px-[20px] flex flex-row w-full justify-between p-6 flex-wrap gap-2">
          <div className="flex justify-between flex-row gap-4 flex-wrap">
            <div>
              <SearchField
                handleSearchChange={handleSearchChange}
                searchQuery={searchQuery}
              />
            </div>
            <div className="custom-select">
              <select
                className="w-[250px] px-3 py-1.5 pr-5 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
                value={flatStatus || ""}
                onChange={handleChangeStatus}
              >
                <option value="">Select Status</option>
                {flatStatusOptions.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.label} ({status.count || 0})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            {activeBuilding && (
              <button
                onClick={openModal}
                className="flex justify-center items-center gap-[10px] h-max text-nowrap rounded-[10px] border border-custom-gray w-full p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15.5"
                  height="15.5"
                  viewBox="0 0 15.5 15.5"
                >
                  <g
                    id="Group_23192"
                    data-name="Group 23192"
                    transform="translate(-1103.25 -12.25)"
                  >
                    <path
                      className="group-hover:stroke-white stroke-[#1E1E1E]"
                      id="Path_38297"
                      data-name="Path 38297"
                      d="M12,5V19"
                      transform="translate(1099 8)"
                      fill="none"
                      stroke="#1E1E1E"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      className="group-hover:stroke-white stroke-[#1E1E1E]"
                      id="Path_38298"
                      data-name="Path 38298"
                      d="M5,12H19"
                      transform="translate(1099 8)"
                      fill="none"
                      stroke="#1E1E1E"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </g>
                </svg>
                Add Flat
              </button>
            )}

            <button
              onClick={handleExportCSV}
              className="flex justify-center items-center gap-[10px] h-max text-nowrap rounded-[10px] border border-custom-gray w-full p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="loader"></div> {/* Add your loader styles */}
                  Exporting...
                </div>
              ) : (
                <>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.921"
                    height="17.5"
                    viewBox="0 0 15.921 17.5"
                  >
                    <g
                      id="Group_145"
                      data-name="Group 145"
                      transform="translate(-2130.25 319.75)"
                    >
                      <path
                        id="Path_112"
                        data-name="Path 112"
                        d="M14,3V6.556a.889.889,0,0,0,.889.889h3.556"
                        transform="translate(2125.889 -322)"
                        fill="none"
                        stroke="#1e1e1e"
                        className="group-hover:stroke-white stroke-[#1E1E1E]"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_113"
                        data-name="Path 113"
                        d="M5,11V4.778A1.778,1.778,0,0,1,6.778,3H13l4.444,4.444V11"
                        transform="translate(2126.889 -322)"
                        fill="none"
                        stroke="#1e1e1e"
                        className="group-hover:stroke-white stroke-[#1E1E1E]"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_114"
                        data-name="Path 114"
                        d="M6.667,16.333a1.333,1.333,0,1,0-2.667,0V19a1.333,1.333,0,0,0,2.667,0"
                        transform="translate(2127 -323.333)"
                        fill="none"
                        stroke="#1e1e1e"
                        className="group-hover:stroke-white stroke-[#1E1E1E]"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_115"
                        data-name="Path 115"
                        d="M10,19.667a.667.667,0,0,0,.667.667h1.111a.889.889,0,0,0,.889-.889v-.889a.889.889,0,0,0-.889-.889h-.889A.889.889,0,0,1,10,16.778v-.889A.889.889,0,0,1,10.889,15H12a.667.667,0,0,1,.667.667"
                        transform="translate(2126.333 -323.333)"
                        fill="none"
                        stroke="#1e1e1e"
                        className="group-hover:stroke-white stroke-[#1E1E1E]"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_116"
                        data-name="Path 116"
                        d="M16,15l1.778,5.333L19.556,15"
                        transform="translate(2125.667 -323.333)"
                        fill="none"
                        stroke="#1e1e1e"
                        className="group-hover:stroke-white stroke-[#1E1E1E]"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                    </g>
                  </svg>
                  Export
                </>
              )}
            </button>
            {showLoginModal && (
              <AddFlatModal
                title="Add New Flats"
                activeBuilding={activeBuilding}
                flatTypesData={flatTypesData?.data}
                description="Please log in to ask more questions."
                onClose={closeModal}
                singleFlatData={singleFlatData}
                flatTypeLoading={flatTypeLoading}
              />
            )}
            {showEditFlatModal && (
              <EditFlatModal
                title="Edit New Flats"
                activeBuilding={activeBuilding}
                flatTypesData={flatTypesData?.data}
                onClose={closeModal}
                singleFlatData={singleFlatData}
                setShowEditModal={setShowEditModal}
                flatTypeLoading={flatTypeLoading}
              />
            )}
          </div>
        </div>
      )}

      {isFlatsLoading ? (
        <div className="p-6 table-height">
          {Array.from({ length: pageSize }).map((_, index) => (
            <div key={index} className="mb-4">
              <Skeleton height={40} />
            </div>
          ))}
        </div>
      ) : flatsData && flatsData.length > 0 ? (
        <MyTable
          columns={columns}
          data={flatsData}
          page={flatPage}
          pageSize={flatPageSize}
          setPage={setFlatPage}
          setPageSize={setFlatPageSize}
          totalCount={totalCount}
          pagination={true}
          columnToOrderByProperty={flatsColumnToOrderByProperty}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderByProperty={orderByProperty}
          setOrderByProperty={setOrderByProperty}
        />
      ) : (
        <div className="p-6">No flats found.</div>
      )}
      {showDltModal && (
        <DeleteModal
          onClose={() => setShowDltModal(!showDltModal)}
          title={"Are you sure you want to delete this flat?"}
          setShowDltModal={setShowDltModal}
          deleteId={flatId}
          deleteMutation={deleteFlatMutation}
        />
      )}
    </div>
  );
}
export default FlatListing;
