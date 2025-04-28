import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDebounce } from "use-debounce";
import TabsFilter from "../../../components/Common/TabsFilter";
import MyTable from "../../../components/myTable/MyTable";
import { useUsers } from "../../../hooks/useUsers";
import ExportCSVIcon from "../../../icons/ExportCSVIcon";
import { ChequeStatuses } from "../../../utils/enums";
import { exportToCSV, formatDate } from "../../../utils/format";
import { generateChequeDepositViewColumns } from "../detailedViewColumns";

function DetailedViewListings({
  tabs,
  locationId,
  buildingId,
  date,
  selectedFilter,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [chequePage, setChequePage] = useState(1);
  const [chequePageSize, setChequePageSize] = useState(50);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [chequeStatus, setChequeStatus] = useState({
    chequeId: 0,
    statusId: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [orderBy, setOrderBy] = useState("Ascending"); // Default to ascending
  const [orderByProperty, setOrderByProperty] = useState("Flat.Number"); // Default to sorting by Name

  const [isExporting, setIsExporting] = useState(false);
  const chequeFilters =
    selectedFilter === "lease-aging" ? [] : [...selectedTab.key];

  const { usersData} =
    useUsers(
    {}
    );

  const handleStatusChange = (e, chequeId) => {
    const selectedStatusId = e.target.value;
    setChequeStatus({
      statusId: selectedStatusId,
      chequeId,
    });
  };

  if (chequeData && chequeData.data) {
    const cheques = chequeData.data;
    if (selectedFilter === "cheque-deposit") {
      let depositedCount = 0;
      let notDepositedCount = 0;
      cheques.forEach((cheque) => {
        if (cheque.statusText === ChequeStatuses.PDC.label) {
          notDepositedCount += 1;
        } else if (cheque.statusText === ChequeStatuses.Deposited.label) {
          depositedCount += 1;
        }
        tabs = tabs.map((tab) => {
          if (tab.name === "All") {
            tab.count = depositedCount + notDepositedCount;
            return tab;
          } else if (tab.name === "Deposited") {
            tab.count = depositedCount;
            return tab;
          } else if (tab.name === "Not Deposited") {
            tab.count = notDepositedCount;
            return tab;
          } else {
            return tab;
          }
        });
      });
    } else if (selectedFilter === "cheque-clearance") {
      let bounced = 0;
      let notCleared = 0;
      let cleared = 0;
      cheques.forEach((cheque) => {
        if (cheque.statusText === ChequeStatuses.PDC.label) {
          notCleared += 1;
        } else if (cheque.statusText === ChequeStatuses.Bounced.label) {
          bounced += 1;
        } else if (cheque.statusText === ChequeStatuses.Cleared.label) {
          cleared += 1;
        }

        tabs = tabs.map((tab) => {
          if (tab.name === "All") {
            tab.count = bounced + cleared + notCleared;
            return tab;
          } else if (tab.name === "Bounced") {
            tab.count = bounced;
            return tab;
          } else if (tab.name === "Cleared") {
            tab.count = cleared;
            return tab;
          } else if (tab.name === "Not Cleared") {
            tab.count = notCleared;
            return tab;
          } else {
            return tab;
          }
        });
      });
    }
  }

  useEffect(() => {
    setSelectedTab(tabs[0]);
  }, [selectedFilter]);

  const columnToOrderByProperty = {
    id: "Id",
    name: "Name",
    phone: "Phone",
    email: "Email",
    optionalId: "OptionalId",
    flatId: "FlatId",
    description: "Description",
    startDate: "StartDate",
    endDate: "EndDate",
    totalAmount: "TotalAmount",
    receivedAmount: "ReceivedAmount",
    ["flat.number"]: "Flat.Number",
    isNotify: "IsNotify",
  };

  const statuses = tabs
    .filter((tab) => tab.name !== "All")
    .map((tab) => {
      const statusKey = tab.key[0]; // Assuming tab.key is an array and you want the first element.
      let statusValue = null;

      // Iterate through the ChequeStatuses and find the matching key.
      for (const key in ChequeStatuses) {
        if (ChequeStatuses.hasOwnProperty(key) && key === statusKey) {
          statusValue = ChequeStatuses[key].value;
          break; // Stop the loop once a match is found.
        }
      }

      return {
        id: statusValue !== null ? statusValue : tab.key[0],
        name: tab.name,
      };
    });

  const columns = useMemo(() =>
    generateChequeDepositViewColumns({
      includeStatus: true,
      statuses,
      handleStatusChange,
    })
  );

  const handleTabChange = (tabId) => {
    const tabFound = tabs.find((tab) => tab.id === tabId);
    if (tabFound) {
      setSelectedTab(tabFound);
    }
  };

  let chequeDataLength = 0;

  const getChequeDataToRender = ({ chequeData = [], isExport = false }) => {
    if (chequeData && chequeData.data) {
      let data = chequeData.data.filter((cd) =>
        selectedTab.key.some((status) => cd.statusText.includes(status))
      );
      chequeDataLength = data.length;
      if (isExport && data.length) {
        setIsExporting(true); // Start loading

        // Define CSV headers
        const csvHeaders = [
          { label: "Tenant Name", key: "tenant.name" },
          { label: "Building Name", key: "tenant.flat.building.name" },
          { label: "Bank Name", key: "bank.name" },
          { label: "Cheque No.", key: "chequeNo" },
          { label: "Cheque Amount", key: "amount" },
          { label: "Cheque Date", key: "date" },
          { label: "Note", key: "note" },
          { label: "Status", key: "statusText" },
        ];

        // Format data
        const csvData = data.map((item) => ({
          "tenant.name": item.tenant?.name || "N/A",
          "tenant.flat.building.name":
            item.tenant?.flat?.building?.name || "N/A",
          "bank.name": item.bank?.name || "N/A",
          chequeNo: item.chequeNo || "N/A",
          amount: item.amount || "N/A",
          date: item.date ? formatDate(item.date) : "N/A",
          note: item.note || "N/A",
          statusText:
            item.statusText === "PDC"
              ? "Not Deposited"
              : item.statusText || "N/A",
        }));

        // Call reusable export function
        exportToCSV({
          data: csvData,
          filename: `${selectedFilter}.csv`,
          headers: csvHeaders,
        });

        setIsExporting(false); // Stop loading
      }
      return data;
    }
    return [];
  };

  const getCheqeDataLength = (chequeData) => {
    if (chequeData && chequeData.data) {
      let data = chequeData.data.filter((cd) =>
        selectedTab.key.some((status) => cd.statusText.includes(status))
      );
      chequeDataLength = data.length;
      return chequeDataLength;
    }
    return 0;
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg bg-white border border-black/10 rounded-lg opacity-100">
      {/* <div className="pt-[20px] pl-[20px]">
        <h1 className="text-[18px] text-[#1E1E1E] font-[500]">Details</h1>
      </div> */}

      <div className="flex items-center justify-between">
        <div className="flex gap-4 tab-width px-4 py-2">
          <TabsFilter
            tabs={tabs}
            activeTab={selectedTab}
            onChange={handleTabChange}
          />
        </div>
        {getCheqeDataLength(chequeData) > 0 ? (
          <div className="mr-5">
            <button
              className="flex font-medium p-2.5 py-1.5 text-[14px] justify-center drop-shadow-sm items-center gap-[10px] h-max text-nowrap rounded-[5px] bg-white border border-[#0000001A] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
              onClick={() =>
                getChequeDataToRender({ chequeData, isExport: true })
              }
              disabled={isExporting}
            >
              <ExportCSVIcon />

              {isExporting ? "Exporting" : "Export"}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      {isChequeLoading || isUpdatingChequeStatus ? (
        <div className="p-6 table-height">
          {Array.from({ length: pageSize }).map((_, index) => (
            <div key={index} className="mb-4">
              <Skeleton height={40} />
            </div>
          ))}
        </div>
      ) : chequeData && chequeData.data && chequeData.data.length > 0 ? (
        <MyTable
          columns={columns}
          data={getChequeDataToRender({ chequeData })}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          totalCount={chequeDataLength} // Pass total records to ReactTable
          pagination={true}
          columnToOrderByProperty={columnToOrderByProperty}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderByProperty={orderByProperty}
          setOrderByProperty={setOrderByProperty}
        />
      ) : (
        <div className="p-6">No data found.</div>
      )}
    </div>
  );
}

export default DetailedViewListings;
