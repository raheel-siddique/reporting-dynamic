import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReusableInput from "../../components/form-elements/input/ReusableInput";
import LocationsBreadcrumb from "../../components/locations/LocationsBreadcrumb";
import { useMyLocations } from "../../hooks/useMyLocations";
import { useFlats } from "../../hooks/useFlats";
// import AddTenantTab from "../../components/tenants/add-tenant/AddTenantTab.jsx";
import { useTenants } from "../../hooks/useTenants";
import AddChequeModal from "../../components/tenants/add-tenant/AddChequeModal";
import AddSecurityModal from "../../components/tenants/add-tenant/AddSecurityModal";
import ManualTable from "../../components/myTable/ManualTable";
import AddLeaseModal from "../../components/tenants/add-tenant/AddLeaseModal";
import {
  chequeStatusStyle,
  leaseStatusStyle,
  formatDateForBackend,
} from "../../utils/format";
// import { chequeStatusStyle, leaseStatusStyle } from "../../utils/format";
import DatePickerField from "../../components/DatePicker/DatePickerField";
import { useImages } from "../../hooks/useImages";
import DeleteModal from "../../components/modal/DeleteModal";
import { CustomSelect } from "../../components/Common/CustomSelect";
import { useSelector } from "react-redux";
import CustomImageUploader from "../../components/img/CustomImageUploader";
import CustomImage from "../../components/img/CustomImage";
import { printIcon } from "../../utils/constant/image";
import {
  ChequeStatuses,
  DatedOrOpen,
  FlatStatuses,
  LeaseStatuses,
} from "../../utils/enums";
import AddLeaseDocModal from "../../components/tenants/add-tenant/AddLeaseDocModal";
import { useLeaseDocumentImages } from "../../hooks/useLeaseImages";
import { useBankType } from "../../hooks/useBankType";

const AddNewTenantOld = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [leasePage, setLeasePage] = useState(1);
  const [leasePageSize, setLeasePageSize] = useState(10);
  const [chequePage, setChequePage] = useState(1);
  const [chequePageSize, setChequePageSize] = useState(10);
  const [search, setSearch] = useState("");

  const { locationsData, isLocationsLoading } = useMyLocations(page, pageSize);
  const {
    addTenantMutation,
    useTenantById,
    updateTenantMutation,
    updateLeaseMutation,
    updateChequesMutation,
    deleteChequeMutation,
    deleteLeaseMutation,
    addChequeMutation,
    addLeaseMutation,
  } = useTenants(
    page,
    pageSize,
    search,
    leasePage,
    leasePageSize,
    chequePage,
    chequePageSize
  );

  const { bankTypesData } = useBankType(1, 100000);

  const { data: tenantDetails, isLoading } = useTenantById(id);

  const [locationId, setLocationId] = useState(null);
  const [buildingId, setBuildingId] = useState(null);

  const [activeBox, setActiveBox] = useState("lease");

  const [rentCheques, setRentCheques] = useState([]);
  const [securityCheques, setSecurityCheques] = useState([]);
  const [leases, setLeases] = useState([]);
  const [showRentChequesModal, setShowRentChequesModal] = useState(false);
  const [showNewRentChequesModal, setShowNewRentChequesModal] = useState(false);
  const [selectedLease, setSelectedLease] = useState(null);

  const [showSecurityChequesModal, setShowSecurityChequesModal] =
    useState(false);
  const [showNewSecurityChequesModal, setShowNewSecurityChequesModal] =
    useState(false);
  const [showNewLeasesModal, setShowNewLeasesModal] = useState(false);

  const [showLeasesModal, setShowLeasesModal] = useState(false);
  const [showLeasesDocModal, setShowLeasesDocModal] = useState(false);

  const [editingRentCheque, setEditingRentCheque] = useState(null);
  const [editingSecurityCheque, setEditingSecurityCheque] = useState(null);
  const [editingLease, setEditingLease] = useState(null);
  const [showDltLeaseModal, setShowDltLeaseModal] = useState(false);
  const [showDltRentChequeModal, setShowDltRentChequeModal] = useState(false);
  const [showDltSecurityChequeModal, setShowDltSecurityChequeModal] =
    useState(false);

  const [leaseDeleteId, setLeaseDeleteId] = useState(null);
  const [rentChequeDeleteId, setRentChequeDeleteId] = useState(null);
  const [securityChequeDeleteId, setSecurityChequeDeleteId] = useState(null);
  const { hasManagementAccess } = useSelector((state) => state.auth);

  const {
    uploadLeaseDocument,
    deleteLeaseDocument,
    fetchedDocuments,
    uploadingDocuments,
    documentPaths,
  } = useLeaseDocumentImages();

  const handleFileChangeLease = (e) => {
    setSelectedFile(e.target.files[0]);

    const file = e.target.files[0];
    const folder = "expenses/BillAttachments";
    if (file) {
      uploadLeaseDocument(file, folder);
      e.target.value = "";
    } else {
      toast.error("No file selected!");
    }
  };

  const {
    uploadImageMutation,
    deleteIdImg,
    fetchedImages,
    imagePaths,
    uploadingImages,
  } = useImages(tenantDetails && tenantDetails);

  const [selectedFlat, setSelectedFlat] = useState(
    tenantDetails && tenantDetails.flat ? tenantDetails.flat : null
  );

  useEffect(() => {
    setSelectedFlat(
      tenantDetails && tenantDetails.flat ? tenantDetails.flat : null
    );
  }, [tenantDetails]);

  const [selectedFile, setSelectedFile] = useState(null);
  const { buildingsDataOwn, flatsData } = useFlats(
    page,
    pageSize,
    buildingId ? buildingId : -1,
    locationId,
    null
  );

  useEffect(() => {
    if (locationsData && locationsData.length > 0) {
      const firstLocationId = locationsData[0].id;
      if (!id) {
        setLocationId(firstLocationId);
      }
    }
  }, [locationsData]);

  useEffect(() => {
    if (id) {
      if (tenantDetails) {
        if (tenantDetails.flat) {
          if (tenantDetails.flat.building.location.id) {
            setLocationId(tenantDetails.flat.building.location.id);
          }
          if (tenantDetails.flat.building) {
            setBuildingId(tenantDetails.flat.building.id);
          }
        }

        if (tenantDetails.leases) {
          setLeases(tenantDetails.leases);
        }

        if (tenantDetails.cheques) {
          const rentCheques = tenantDetails.cheques.filter(
            (rc) => rc.depositTypeText === "Rent"
          );
          const securityCheques = tenantDetails.cheques.filter(
            (sc) => sc.depositTypeText === "Security"
          );
          setRentCheques(rentCheques);
          setSecurityCheques(securityCheques);
        }
      }
    }
  }, [tenantDetails]);

  const handleSaveRentCheques = (newRentCheques) => {
    const formattedRentCheques = newRentCheques.map((cheque) => ({
      ...cheque,
      status: cheque.statusText,
      date: formatDateForBackend(cheque.date), // Backend-friendly format

      // date: cheque.date.toISOString(), // Convert Date to string
    }));
    setShowRentChequesModal(false);

    if (editingRentCheque != null) {
      setRentCheques((prevRentCheques) =>
        prevRentCheques.map((cheque, index) =>
          index === editingRentCheque ? formattedRentCheques[0] : cheque
        )
      );

      if (id) {
        updateChequesMutation({ ...formattedRentCheques[0], tenantId: id });
      }
    } else {
      // Adding new rentCheques
      setRentCheques((prevCheques) => [
        ...prevCheques,
        ...formattedRentCheques,
      ]);
    }
    setEditingRentCheque(null); // Reset editing state
  };

  const handleSaveSecurityCheques = (newSecurityCheques) => {
    const formattedSecurityCheques = newSecurityCheques.map((cheque) => ({
      ...cheque,
      status: cheque.statusText,
      date: formatDateForBackend(cheque.date), // Backend-friendly format

      // date: cheque.date.toISOString(), // Convert Date to string
    }));
    setShowSecurityChequesModal(false);

    if (editingSecurityCheque != null) {
      setSecurityCheques((prevSecurityCheques) =>
        prevSecurityCheques.map((cheque, index) =>
          index === editingSecurityCheque ? formattedSecurityCheques[0] : cheque
        )
      );

      if (id) {
        updateChequesMutation({ ...formattedSecurityCheques[0], tenantId: id });
      }
    } else {
      // Adding new rentCheques
      setSecurityCheques((prevCheques) => [
        ...prevCheques,
        ...formattedSecurityCheques,
      ]);
    }
    setEditingSecurityCheque(null); // Reset editing state
  };

  const handleLeaseSaveCheques = (newLeases) => {
    const formattedLeases = newLeases.map((lease) => ({
      ...lease,

      leaseStatus: lease.leaseStatusText,
      startDate: formatDateForBackend(lease.startDate), // Backend-friendly format
      endDate: formatDateForBackend(lease.endDate), // Backend-friendly format
      gracePeriodStartDate: lease.gracePeriodStartDate
        ? formatDateForBackend(lease.gracePeriodStartDate)
        : null, // Backend-friendly format
      gracePeriodEndDate: lease.gracePeriodEndDate
        ? formatDateForBackend(lease.gracePeriodEndDate)
        : null, // Backend-friendly format
    }));

    // console.log("formattedLeases::", formattedLeases);
    setShowLeasesModal(false);

    if (editingLease !== null) {
      setLeases((prevLeases) =>
        prevLeases.map((lease, index) =>
          index === editingLease ? formattedLeases[0] : lease
        )
      );

      if (id) {
        updateLeaseMutation({ ...formattedLeases[0], tenantId: id });
      }
    } else {
      setLeases((prevLeases) => [...prevLeases, ...formattedLeases]);
    }
    setEditingLease(null); // Reset editing state
  };

  const handleUploadLeaseDocs = () => {
    if (id) {
      updateLeaseMutation({
        ...selectedLease,
        tenantId: id,
        contractFile: documentPaths.join(","),
        id: selectedLease.id,
      });
    } else {
      setLeases((prevLeases) => {
        return prevLeases.map((lease, index) =>
          index === selectedLease.id
            ? { ...lease, contractFile: documentPaths.join(",") }
            : lease
        );
      });
    }

    setShowLeasesDocModal(false);
  };

  const handleEditRentCheque = (index) => {
    setEditingRentCheque(index);
    setShowRentChequesModal(true);
  };

  const handleEditSecurityCheque = (index) => {
    setEditingSecurityCheque(index);
    setShowSecurityChequesModal(true);
  };

  const handleEditLease = (index) => {
    setEditingLease(index);
    setShowLeasesModal(true);
  };

  const handleSaveNewRentCheques = (newRentCheques) => {
    // Map through newRentCheques and format each cheque
    const formattedRentCheques = newRentCheques.map((cheque) => ({
      amountType: cheque.amountTypeText || "Cheque",
      // bank: cheque.bank, // Use cheque.bank or default to "string"
      bankId: cheque.bankId,
      depositBankId: cheque.depositBankId,

      chequeNo: cheque.chequeNo, // Use cheque.chequeNo or default to "string"
      amount: cheque.amount, // Use cheque.amount or default to 0
      note: cheque.note, // Use cheque.note or default to "string"
      // date: cheque.date
      //   ? cheque.date.toISOString()
      //   : "2025-01-23T15:11:43.060Z", // Convert date to ISO string or default

      date: formatDateForBackend(cheque.date), // Backend-friendly format

      status: cheque.statusText || ChequeStatuses.PDC.label, // Use cheque.statusText or default to "Pending"
      tenantId: id, // Use cheque.tenantId or default to 0\
      datedOrOpen: cheque.datedOrOpen || DatedOrOpen.Open.label,
      depositType: cheque.depositType,
    }));

    const payload = [...formattedRentCheques];

    addChequeMutation(payload);
    setShowNewRentChequesModal(false);
  };

  const handleSaveNewSecurityCheques = (newSecurityCheques) => {
    // Map through newRentCheques and format each cheque
    const formattedSecurityCheques = newSecurityCheques.map((cheque) => ({
      amountType: cheque.amountTypeText || "Cheque",
      bankId: cheque.bankId,
      depositBankId: cheque.depositBankId,
      chequeNo: cheque.chequeNo, // Use cheque.chequeNo or default to "string"
      amount: cheque.amount, // Use cheque.amount or default to 0
      note: cheque.note, // Use cheque.note or default to "string"
      // date: cheque.date
      //   ? cheque.date.toISOString()
      //   : "2025-01-23T15:11:43.060Z", // Convert date to ISO string or default

      date: formatDateForBackend(cheque.date), // Backend-friendly format

      status: cheque.statusText || ChequeStatuses.PDC.label, // Use cheque.statusText or default to "Pending"
      tenantId: id, // Use cheque.tenantId or default to 0
      datedOrOpen: cheque.datedOrOpen || DatedOrOpen.Open.label,
      depositType: cheque.depositType,
    }));

    const payload = [...formattedSecurityCheques];

    addChequeMutation(payload);
    setShowNewSecurityChequesModal(false);
  };

  const handleSaveNewLeases = (newLeases) => {
    const formattedLeases = newLeases.map((lease) => ({
      ...lease,
      startDate: formatDateForBackend(lease.startDate), // Backend-friendly format
      endDate: formatDateForBackend(lease.endDate), // Backend-friendly format
      gracePeriodStartDate: lease.gracePeriodStartDate
        ? formatDateForBackend(lease.gracePeriodStartDate)
        : null, // Backend-friendly format
      gracePeriodEndDate: lease.gracePeriodEndDate
        ? formatDateForBackend(lease.gracePeriodEndDate)
        : null, // Backend-friendly format

      annualRentAsPerContract: lease.annualRentAsPerContract, // Default to 0
      actualRent: lease.actualRent, // Default to 0
      leaseStatus: lease.leaseStatusText || LeaseStatuses.Pending.label, // Default to "Pending"
      tenantId: id, // Default to 0
    }));

    const payload = [...formattedLeases];

    addLeaseMutation(payload);
    setShowNewLeasesModal(false);
  };

  const rentChequeColumns = useMemo(
    () => [
      {
        Header: "Cheque Number",
        accessor: "chequeNo",
        Cell: ({ row }) => (
          <div className="flex items-center gap-[5px] justify-center">
            {row.original.isNotify && (
              <span className="w-2 h-2 flex-shrink-0 rounded-full bg-red-500"></span>
            )}
            {row.original.amountTypeText.toLowerCase() === "cash"
              ? "-"
              : row.original.chequeNo}
          </div>
        ),
      },
      {
        Header: "Amount Type",
        accessor: "amountTypeText",
      },
      { Header: "Amount", accessor: "amount" },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) =>
          value ? new Date(value).toLocaleDateString() : "-",
      },

      { Header: "Note", accessor: "note" },
      {
        Header: "Status",
        accessor: "statusText",
        Cell: ({ row }) => {
          if (row.original.amountTypeText.toLowerCase() === "cash") {
            return "-"; // Display "-" if amountTypeText is "cash"
          }

          const statusName = row.original.statusText
            ? row.original.statusText
            : "Unknown";

          return (
            <span
              className={
                chequeStatusStyle[statusName] ||
                "bg-gray-100 text-gray-600 px-2 py-1 rounded"
              }
            >
              {statusName}
            </span>
          );
        },
      },
      {
        Header: "Bank Name",
        accessor: "bankId",
        Cell: ({ value }) => {
          const bank =
            bankTypesData && bankTypesData.find((b) => b.id == value);
          return bank ? bank.name : "";
        },
      },
      {
        Header: "Deposit Bank Name",
        accessor: "depositBankId",
        Cell: ({ value }) => {
          const bank =
            bankTypesData && bankTypesData.find((b) => b.id == value);
          return bank ? bank.name : "";
        },
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            {hasManagementAccess && (
              <button
                className="mr-5"
                onClick={() => handleDeleteRentCheque(row)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15.722"
                  height="17.5"
                  viewBox="0 0 15.722 17.5"
                >
                  <g
                    id="Group_70"
                    data-name="Group 70"
                    transform="translate(-1268.25 -54.25)"
                  >
                    <path
                      id="Path_72"
                      data-name="Path 72"
                      d="M4,7H18.222"
                      transform="translate(1265 51.556)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_75"
                      data-name="Path 75"
                      d="M5,7l.889,10.667a1.778,1.778,0,0,0,1.778,1.778h7.111a1.778,1.778,0,0,0,1.778-1.778L17.444,7"
                      transform="translate(1264.889 51.556)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_76"
                      data-name="Path 76"
                      d="M9,6.556V3.889A.889.889,0,0,1,9.889,3h3.556a.889.889,0,0,1,.889.889V6.556"
                      transform="translate(1264.444 52)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </g>
                </svg>
              </button>
            )}

            {!hasManagementAccess && !id && (
              <button
                className="mr-5"
                onClick={() => handleDeleteRentCheque(row)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15.722"
                  height="17.5"
                  viewBox="0 0 15.722 17.5"
                >
                  <g
                    id="Group_70"
                    data-name="Group 70"
                    transform="translate(-1268.25 -54.25)"
                  >
                    <path
                      id="Path_72"
                      data-name="Path 72"
                      d="M4,7H18.222"
                      transform="translate(1265 51.556)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_75"
                      data-name="Path 75"
                      d="M5,7l.889,10.667a1.778,1.778,0,0,0,1.778,1.778h7.111a1.778,1.778,0,0,0,1.778-1.778L17.444,7"
                      transform="translate(1264.889 51.556)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_76"
                      data-name="Path 76"
                      d="M9,6.556V3.889A.889.889,0,0,1,9.889,3h3.556a.889.889,0,0,1,.889.889V6.556"
                      transform="translate(1264.444 52)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </g>
                </svg>
              </button>
            )}

            <button
              className="mr-5"
              onClick={() => handleEditRentCheque(row.index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.5"
                height="17.665"
                viewBox="0 0 17.5 17.665"
              >
                <g
                  id="Group_69"
                  data-name="Group 69"
                  transform="translate(-1484.25 -93.085)"
                >
                  <path
                    id="Path_68"
                    data-name="Path 68"
                    d="M6.824,7H5.882A1.882,1.882,0,0,0,4,8.882v8.471a1.882,1.882,0,0,0,1.882,1.882h8.471a1.882,1.882,0,0,0,1.882-1.882v-.941"
                    transform="translate(1481 90.765)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_69"
                    data-name="Path 69"
                    d="M19.715,6.374a1.977,1.977,0,1,0-2.8-2.8L9,11.471v2.824h2.824l7.892-7.92Z"
                    transform="translate(1480.706 91)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_70"
                    data-name="Path 70"
                    d="M16,5l2.824,2.824"
                    transform="translate(1480.294 90.882)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                </g>
              </svg>
            </button>
          </div>
        ),
      },
    ],
    [bankTypesData]
  );

  const securityChequeColumns = useMemo(
    () => [
      {
        Header: "Cheque Number",
        accessor: "chequeNo",
        Cell: ({ row }) => (
          <div className="flex items-center gap-[5px] justify-center">
            {row.original.isNotify && (
              <span className="w-2 h-2 flex-shrink-0 rounded-full bg-red-500"></span>
            )}
            {row.original.amountTypeText.toLowerCase() === "cash"
              ? "-"
              : row.original.chequeNo}
          </div>
        ),
      },
      {
        Header: "Amount Type",
        accessor: "amountTypeText",
      },
      { Header: "Amount", accessor: "amount" },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) =>
          value ? new Date(value).toLocaleDateString() : "-",
      },

      { Header: "Note", accessor: "note" },
      {
        Header: "Status",
        accessor: "statusText",
        Cell: ({ row }) => {
          if (row.original.amountTypeText.toLowerCase() === "cash") {
            return "-"; // Display "-" if amountTypeText is "cash"
          }

          const statusName = row.original.statusText
            ? row.original.statusText
            : "Unknown";

          return (
            <span
              className={
                chequeStatusStyle[statusName] ||
                "bg-gray-100 text-gray-600 px-2 py-1 rounded"
              }
            >
              {statusName}
            </span>
          );
        },
      },
      {
        Header: "Bank Name",
        accessor: "bankId",
        Cell: ({ value }) => {
          const bank =
            bankTypesData && bankTypesData.find((b) => b.id == value);
          return bank ? bank.name : "";
        },
      },
      {
        Header: "Deposit Bank Name",
        accessor: "depositBankId",
        Cell: ({ value }) => {
          const bank =
            bankTypesData && bankTypesData.find((b) => b.id == value);
          return bank ? bank.name : "";
        },
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            {hasManagementAccess && (
              <button
                className="mr-5"
                onClick={() => handleDeleteSecurityCheque(row)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15.722"
                  height="17.5"
                  viewBox="0 0 15.722 17.5"
                >
                  <g
                    id="Group_70"
                    data-name="Group 70"
                    transform="translate(-1268.25 -54.25)"
                  >
                    <path
                      id="Path_72"
                      data-name="Path 72"
                      d="M4,7H18.222"
                      transform="translate(1265 51.556)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_75"
                      data-name="Path 75"
                      d="M5,7l.889,10.667a1.778,1.778,0,0,0,1.778,1.778h7.111a1.778,1.778,0,0,0,1.778-1.778L17.444,7"
                      transform="translate(1264.889 51.556)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_76"
                      data-name="Path 76"
                      d="M9,6.556V3.889A.889.889,0,0,1,9.889,3h3.556a.889.889,0,0,1,.889.889V6.556"
                      transform="translate(1264.444 52)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </g>
                </svg>
              </button>
            )}

            {!hasManagementAccess && !id && (
              <button
                className="mr-5"
                onClick={() => handleDeleteSecurityCheque(row)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15.722"
                  height="17.5"
                  viewBox="0 0 15.722 17.5"
                >
                  <g
                    id="Group_70"
                    data-name="Group 70"
                    transform="translate(-1268.25 -54.25)"
                  >
                    <path
                      id="Path_72"
                      data-name="Path 72"
                      d="M4,7H18.222"
                      transform="translate(1265 51.556)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_75"
                      data-name="Path 75"
                      d="M5,7l.889,10.667a1.778,1.778,0,0,0,1.778,1.778h7.111a1.778,1.778,0,0,0,1.778-1.778L17.444,7"
                      transform="translate(1264.889 51.556)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_76"
                      data-name="Path 76"
                      d="M9,6.556V3.889A.889.889,0,0,1,9.889,3h3.556a.889.889,0,0,1,.889.889V6.556"
                      transform="translate(1264.444 52)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </g>
                </svg>
              </button>
            )}

            <button
              className=""
              onClick={() => handleEditSecurityCheque(row.index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.5"
                height="17.665"
                viewBox="0 0 17.5 17.665"
              >
                <g
                  id="Group_69"
                  data-name="Group 69"
                  transform="translate(-1484.25 -93.085)"
                >
                  <path
                    id="Path_68"
                    data-name="Path 68"
                    d="M6.824,7H5.882A1.882,1.882,0,0,0,4,8.882v8.471a1.882,1.882,0,0,0,1.882,1.882h8.471a1.882,1.882,0,0,0,1.882-1.882v-.941"
                    transform="translate(1481 90.765)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_69"
                    data-name="Path 69"
                    d="M19.715,6.374a1.977,1.977,0,1,0-2.8-2.8L9,11.471v2.824h2.824l7.892-7.92Z"
                    transform="translate(1480.706 91)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_70"
                    data-name="Path 70"
                    d="M16,5l2.824,2.824"
                    transform="translate(1480.294 90.882)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                </g>
              </svg>
            </button>
          </div>
        ),
      },
    ],
    [bankTypesData]
  );

  // Define columns for leases

  const leaseColumns = useMemo(
    () => [
      {
        Header: "S.No",
        accessor: "id",
      },
      {
        Header: "Start Date",
        accessor: "startDate",
        Cell: ({ value }) =>
          value ? new Date(value).toLocaleDateString() : "-",
      },

      {
        Header: "End Date",
        accessor: "endDate",
        Cell: ({ value }) =>
          value ? new Date(value).toLocaleDateString() : "-",
      },

      {
        Header: "Annual Rent As Per Contract",
        accessor: "annualRentAsPerContract",
      },
      {
        Header: "Actual Rent",
        accessor: "actualRent",
      },
      {
        Header: "No. of days",
        accessor: "noOfdays",
      },
      {
        Header: "Status",
        accessor: "leaseStatusText",
        Cell: ({ row }) => {
          const statusName = row.original.leaseStatusText
            ? row.original.leaseStatusText
            : "Unknown";

          return (
            <span
              className={
                leaseStatusStyle[statusName] ||
                "bg-gray-100 text-gray-600 px-2 py-1 rounded"
              }
            >
              {statusName}
            </span>
          );
        },
      },

      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-4 justify-center">
            {hasManagementAccess && (
              <button onClick={() => handleDeleteLease(row)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15.722"
                  height="17.5"
                  viewBox="0 0 15.722 17.5"
                >
                  <g
                    id="Group_70"
                    data-name="Group 70"
                    transform="translate(-1268.25 -54.25)"
                  >
                    <path
                      id="Path_72"
                      data-name="Path 72"
                      d="M4,7H18.222"
                      transform="translate(1265 51.556)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_75"
                      data-name="Path 75"
                      d="M5,7l.889,10.667a1.778,1.778,0,0,0,1.778,1.778h7.111a1.778,1.778,0,0,0,1.778-1.778L17.444,7"
                      transform="translate(1264.889 51.556)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_76"
                      data-name="Path 76"
                      d="M9,6.556V3.889A.889.889,0,0,1,9.889,3h3.556a.889.889,0,0,1,.889.889V6.556"
                      transform="translate(1264.444 52)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </g>
                </svg>
              </button>
            )}
            {!hasManagementAccess && !id && (
              <button className="mr-5" onClick={() => handleDeleteLease(row)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15.722"
                  height="17.5"
                  viewBox="0 0 15.722 17.5"
                >
                  <g
                    id="Group_70"
                    data-name="Group 70"
                    transform="translate(-1268.25 -54.25)"
                  >
                    <path
                      id="Path_72"
                      data-name="Path 72"
                      d="M4,7H18.222"
                      transform="translate(1265 51.556)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_75"
                      data-name="Path 75"
                      d="M5,7l.889,10.667a1.778,1.778,0,0,0,1.778,1.778h7.111a1.778,1.778,0,0,0,1.778-1.778L17.444,7"
                      transform="translate(1264.889 51.556)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_76"
                      data-name="Path 76"
                      d="M9,6.556V3.889A.889.889,0,0,1,9.889,3h3.556a.889.889,0,0,1,.889.889V6.556"
                      transform="translate(1264.444 52)"
                      fill="none"
                      stroke="#1e1e1e"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </g>
                </svg>
              </button>
            )}
            <button className="" onClick={() => handleEditLease(row.index)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.5"
                height="17.665"
                viewBox="0 0 17.5 17.665"
              >
                <g
                  id="Group_69"
                  data-name="Group 69"
                  transform="translate(-1484.25 -93.085)"
                >
                  <path
                    id="Path_68"
                    data-name="Path 68"
                    d="M6.824,7H5.882A1.882,1.882,0,0,0,4,8.882v8.471a1.882,1.882,0,0,0,1.882,1.882h8.471a1.882,1.882,0,0,0,1.882-1.882v-.941"
                    transform="translate(1481 90.765)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_69"
                    data-name="Path 69"
                    d="M19.715,6.374a1.977,1.977,0,1,0-2.8-2.8L9,11.471v2.824h2.824l7.892-7.92Z"
                    transform="translate(1480.706 91)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_70"
                    data-name="Path 70"
                    d="M16,5l2.824,2.824"
                    transform="translate(1480.294 90.882)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                </g>
              </svg>
            </button>
            <CustomImage src={printIcon} />
            {/* {id && ( */}
            <button onClick={() => handleLeaseDocuments(row)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.617"
                height="16.5"
                viewBox="0 0 15.617 16.5"
              >
                <g
                  id="Group_301"
                  data-name="Group 301"
                  transform="translate(-8318.25 -2321.25)"
                >
                  <path
                    id="Path_149"
                    data-name="Path 149"
                    d="M4,17v1.765a1.765,1.765,0,0,0,1.765,1.765H16.353a1.765,1.765,0,0,0,1.765-1.765V17"
                    transform="translate(8315 2316.471)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_150"
                    data-name="Path 150"
                    d="M7,8.412,11.412,4l4.412,4.412"
                    transform="translate(8314.647 2318)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    id="Path_151"
                    data-name="Path 151"
                    d="M12,4V14.588"
                    transform="translate(8314.059 2318)"
                    fill="none"
                    stroke="#1e1e1e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                </g>
              </svg>
            </button>
            {/* )} */}
            {/* 
            <input
              type="file"
              id={`upload-${row.index}`}
              className="hidden"
              onChange={(event) => handleUploadLeaseDocument(event, row)}
            />
            <button
              className="ml-3"
              onClick={() =>
                document.getElementById(`upload-${row.index}`).click()
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.5"
                height="17.5"
                viewBox="0 0 17.5 17.5"
              >
                <path
                  d="M8.75,0a8.75,8.75,0,1,1-8.75,8.75A8.75,8.75,0,0,1,8.75,0ZM7.5,13.125h2.5V8.75h2.5L8.75,4.375,5,8.75H7.5Z"
                  fill="#1e1e1e"
                />
              </svg>
            </button> */}
          </div>
        ),
      },
    ],
    []
  );

  const handleLeaseDocuments = (row) => {
    console.log("row", row);
    setSelectedLease(row.original);
    setShowLeasesDocModal(true);
  };
  // Delete rent cheque handler
  const handleDeleteRentCheque = (row) => {
    if (!id) {
      setRentCheques((prevCheques) =>
        prevCheques.filter((_, i) => i !== row.index)
      );
    } else {
      setRentChequeDeleteId(row.original.id);
      setShowDltRentChequeModal(true);
    }
  };

  // Delete security cheque handler
  const handleDeleteSecurityCheque = (row) => {
    if (!id) {
      setSecurityCheques((prevCheques) =>
        prevCheques.filter((_, i) => i !== row.index)
      );
    } else {
      setSecurityChequeDeleteId(row.original.id);
      setShowDltSecurityChequeModal(true);
    }
  };

  const handleDeleteLease = (row) => {
    if (!id) {
      setLeases((prevLeases) => prevLeases.filter((_, i) => i !== row.index));
    } else {
      setLeaseDeleteId(row.original.id);
      // setLeases((prevLeases) => prevLeases.filter((_, i) => i !== row.index));

      setShowDltLeaseModal(true);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    sewerageAccountNoGeneral: Yup.string().required(
      "sewerage Account No is required"
    ),

    fewaAccountNoGeneral: Yup.string().required("fewa Account No is required"),

    // idExpiryDate: Yup.date().required("id Expiry Date is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    flatId: Yup.string().required("Flat is required"),
  });

  const filters = [
    { name: "lease", count: leases.length > 0 ? leases.length : 0 },
    {
      name: "rent cheque/cash",
      count: rentCheques.length > 0 ? rentCheques.length : 0,
    },
    {
      name: "security cheque/cash",
      count: securityCheques.length > 0 ? securityCheques.length : 0,
    },
  ];

  const initialValues = {
    name: tenantDetails?.name || "",
    phone: tenantDetails?.phone || "",
    email: tenantDetails?.email || "",
    optionalId: tenantDetails?.optionalId || "",
    idExpiryDate: tenantDetails?.idExpiryDate || "",
    sewerageAccountNoGeneral: tenantDetails?.sewerageAccountNo || "",
    fewaAccountNoGeneral: tenantDetails?.fewaAccountNo || "",

    locationId: tenantDetails?.flat?.building?.location?.id || "",
    buildingId: tenantDetails?.flat?.building?.id || "",

    flatId: tenantDetails?.flatId || "",

    description: tenantDetails?.description || "",
  };

  const handleSubmit = (formValues) => {
    let description = "";
    if (selectedFlat) {
      description = selectedFlat.description;
    }
    if (!id) {
      const processedRentCheques = rentCheques.map((cheque) => {
        if (cheque.amountTypeText.toLowerCase() === "cheque") {
          return {
            ...cheque,
            status: cheque.statusText,
            chequeNo: cheque.chequeNo,
            amountTypeText: cheque.amountTypeText.toLowerCase(),
          };
        } else {
          const { statusText, chequeNo, ...remainingFields } = cheque;
          return remainingFields;
        }
      });

      const processedSecurityCheques = securityCheques.map((cheque) => {
        if (cheque.amountTypeText.toLowerCase() === "cheque") {
          return {
            ...cheque,
            status: cheque.statusText,
            chequeNo: cheque.chequeNo,
            amountTypeText: cheque.amountTypeText.toLowerCase(),
          };
        } else {
          const { statusText, chequeNo, ...remainingFields } = cheque;
          return remainingFields;
        }
      });

      const processedLeases = leases.map((lease) => {
        return {
          ...lease,
          leaseStatus: lease.leaseStatusText,
          contractFile: documentPaths.join(","),
        };
      });

      // Build the payload
      const payload = {
        ...formValues,
        flatId: formValues.flatId ? Number(formValues.flatId) : null,
        idImages: imagePaths.join(","), // Convert array to comma-separated string
        // idExpiryDate: formValues.idExpiryDate && formValues.idExpiryDate, // Convert Date to string
        idExpiryDate: formatDateForBackend(formValues.idExpiryDate),
        sewerageAccountNo: formValues.sewerageAccountNoGeneral || "",
        fewaAccountNo: formValues.fewaAccountNoGeneral || "",
        description,
        // idImages: idImages,
        cheques: [...processedRentCheques, ...processedSecurityCheques], // Use the processed rentCheques array
        leases: processedLeases,
      };

      addTenantMutation(payload);
    } else {
      const payload = {
        ...formValues,
        id: id,
        flatId: formValues.flatId ? Number(formValues.flatId) : null,
        sewerageAccountNo: formValues.sewerageAccountNoGeneral,
        fewaAccountNo: formValues.fewaAccountNoGeneral,
        description,
        idImages: imagePaths.join(","), // Convert array to comma-separated string
        // idExpiryDate: formValues.idExpiryDate && formValues.idExpiryDate, // Convert Date to string
        idExpiryDate: formatDateForBackend(formValues.idExpiryDate),
      };

      updateTenantMutation(payload);

      // console.log("payload edit", payload);
    }
  };

  const handleLocationChange = (e, setFieldValue) => {
    const selectedLocationId = e.target.value;
    setLocationId(selectedLocationId); // Update state
    setFieldValue("locationId", selectedLocationId); // Update Formik value
  };

  const handleBuildingChange = (e, setFieldValue) => {
    const selectedBuildingId = e.target.value;
    setBuildingId(selectedBuildingId); // Update locationId state if needed
    setFieldValue("buildingId", selectedBuildingId);
  };

  const handleFileChange = (e) => {
    console.log("tenant images");
    setSelectedFile(e.target.files[0]);

    const file = e.target.files[0];
    const folder = "Tenants/idImages"; // Replace with the desired folder name
    if (file) {
      uploadImageMutation(file, folder);
      e.target.value = "";
    } else {
      toast.error("No file selected!");
    }
  };

  let flatsFiltered = flatsData
    ? flatsData.filter((flat) => {
        return (
          tenantDetails?.flatId === flat.id ||
          flat.flatStatusText === FlatStatuses.Vacant.label
        );
      })
    : [];

  // Map flatsData to options
  const flatOptions = flatsFiltered
    ? flatsFiltered.map((flat) => ({
        value: flat.id,
        label: flat.flatType.name
          ? `#${flat.number}-${flat.flatType.name} - ${flat.flatStatusText}`
          : `#${flat.number}`,
        statusColor: flat.flatStatusText === "Occupied" ? "red" : "black", // Text color
      }))
    : [];

  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const openModal = (img) => {
    setSelectedImage(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const handleFlatSelect = (flatId) => {
    // Perform any actions with the selected flat ID
    const flatExists = flatsData.find((flat) => flat.id === flatId);
    if (flatExists) {
      setSelectedFlat(flatExists);
    } else {
      setSelectedFlat(null);
    }
  };

  return (
    <div className="p-5">
      {/* <div className="mb-4 flex justify-between">
        <LocationsBreadcrumb
          title1="Tenants"
          title2={`${!id ? "Add New Tenant" : "Edit Tenant"}`}
        />
      </div> */}
      <Formik
        initialValues={{
          ...initialValues,
          location:
            locationsData && locationsData.length > 0
              ? locationsData[0].id
              : "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="mb-4 p-5 bg-white border border-custom-gray rounded-[10px]">
              <div className="flex justify-end gap-4">
                <Link to={"/tenants"}>
                  <button
                    type="button"
                    className="text-sm w-[66px] bg-white border border-custom-gray text-[#1E1E1E] hover:text-white hover:bg-custom-gradient-red group cursor-pointer py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="text-sm w-[66px] cursor-pointer p-2 rounded-md border text-white bg-custom-gradient-green active:bg-custom-gradient-green"
                >
                  {!id ? "Add" : "Update"}
                </button>
              </div>
              <h2 className="text-xl leading-5 text-black font-semibold mb-6">
                General Info
              </h2>

              {!isLocationsLoading ? (
                <>
                  <div className="grid grid-cols-5 gap-4">
                    <div>
                      <label className="text-[13px] text-[#1E1E1E] font-medium">
                        Name
                      </label>
                      <ReusableInput
                        inpType="text"
                        inpName="name"
                        inpPlaceholder="Enter Name"
                      />
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[13px] text-[#1E1E1E] font-medium">
                        Phone
                      </label>
                      <ReusableInput
                        inpType="text"
                        inpName="phone"
                        inpPlaceholder="Enter Phone (Optional)"
                      />
                    </div>
                    <div>
                      <label className="text-[13px] text-[#1E1E1E] font-medium">
                        Email
                      </label>
                      <ReusableInput
                        inpType="email"
                        inpName="email"
                        inpPlaceholder="Enter Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[13px] text-[#1E1E1E] font-medium">
                        ID Number
                      </label>
                      <ReusableInput
                        inpType="text"
                        inpName="optionalId"
                        inpPlaceholder="Enter ID # (Optional)"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`idExpiryDate`}
                        className="text-sm font-medium"
                      >
                        ID Expiry Date
                      </label>
                      <Field
                        name={`idExpiryDate`}
                        component={DatePickerField}
                        placeholderText="Lease Start Date"
                      />
                      <ErrorMessage
                        name={`idExpiryDate`}
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 mt-4">
                    <div>
                      <label className="text-[13px] text-[#1E1E1E] font-medium">
                        Sewerage Account Number
                      </label>
                      <ReusableInput
                        inpType="text"
                        inpName="sewerageAccountNoGeneral"
                        inpPlaceholder="Sewerage Account Number"
                      />
                      <ErrorMessage
                        name={`sewerageAccountNoGeneral`}
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-[13px] text-[#1E1E1E] font-medium">
                        FEWA Account Number
                      </label>
                      <ReusableInput
                        inpType="text"
                        inpName="fewaAccountNoGeneral"
                        inpPlaceholder="FEWA Account Number"
                      />

                      <ErrorMessage
                        name={`fewaAccountNoGeneral`}
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    {/* image uploader  */}

                    <CustomImageUploader
                      id="tenant-images"
                      handleFileChange={handleFileChange}
                      fetchedImages={fetchedImages}
                      uploadingImages={uploadingImages}
                      modalOpen={modalOpen}
                      openModal={openModal}
                      closeModal={closeModal}
                      selectedImage={selectedImage}
                      deleteIdImg={deleteIdImg}
                      postionImages={"right"}
                      btnText={"Upload ID Image"}
                      imageWidth={"150px"}
                    />
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(8)].map((_, index) => (
                    <div key={index}>
                      <Skeleton height={20} width={80} className="mb-2" />
                      <Skeleton height={40} className="rounded-md" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-4 p-5 bg-white border border-custom-gray rounded-[10px]">
              <h2 className="text-xl leading-5 text-black font-semibold mb-6">
                Assign Accommodation
              </h2>

              {!isLocationsLoading ? (
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="text-[13px] text-[#1E1E1E] font-medium">
                      Location
                    </label>
                    {locationsData && locationsData.length > 0 ? (
                      <div className="custom-select">
                        <Field
                          name="locationId"
                          as="select"
                          className="w-full mt-[10px] select-m p-3 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
                          value={values.locationId || ""}
                          onChange={(e) =>
                            handleLocationChange(e, setFieldValue)
                          }
                        >
                          {locationsData.map((location, index) => (
                            <option key={index} value={location.id}>
                              {location.name}
                            </option>
                          ))}
                        </Field>
                      </div>
                    ) : (
                      <>No locations found</>
                    )}
                  </div>
                  <div>
                    <label className="text-[13px] text-[#1E1E1E] font-medium">
                      Building
                    </label>
                    <div className="custom-select">
                      <Field
                        name="buildingId"
                        as="select"
                        className="w-full mt-[10px] select-m p-3 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
                        value={values.buildingId || ""}
                        onChange={(e) => handleBuildingChange(e, setFieldValue)}
                      >
                        <option value="" label="Select Building" />
                        {buildingsDataOwn &&
                          buildingsDataOwn.map((building, index) => (
                            <option key={index} value={building.id}>
                              {building.name}
                            </option>
                          ))}
                      </Field>
                    </div>
                  </div>
                  <div>
                    <label className="text-[13px] text-[#1E1E1E] font-medium">
                      Flat
                    </label>
                    <div>
                      {/* <Field
                        name="flatId"
                        as="select"
                        className="w-full mt-[10px] select-m p-3 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
                      >
                        <option value="" label="Select Flat" />
                        {flatsData &&
                          flatsData.map((flat, index) => (
                            <option key={index} value={flat.id}>
                              {flat.flatType.name
                                ? `#${flat.number}-${flat.flatType.name}`
                                : `#${flat.number}`}
                            </option>
                          ))}
                      </Field> */}
                      <Field
                        name="flatId"
                        component={CustomSelect}
                        options={flatOptions}
                        className="w-full mt-[10px] text-[14px]"
                        onCustomAction={handleFlatSelect} // Pass the custom handler
                      />
                    </div>

                    <ErrorMessage
                      name="flatId"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[13px] text-[#1E1E1E] font-medium">
                      Description
                    </label>

                    <Field
                      name={`description`}
                      type="text"
                      value={selectedFlat ? selectedFlat.description ?? "" : ""}
                      readOnly
                      className="w-full mt-[10px] select-m p-3 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
                    />
                  </div>
                  <div>
                    <label className="text-[13px] text-[#1E1E1E] font-medium">
                      Sewerage ID
                    </label>
                    <Field
                      type="text"
                      value={
                        selectedFlat ? selectedFlat.sewerageAccountId ?? "" : ""
                      }
                      readOnly
                      className="w-full mt-[10px] select-m p-3 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
                    />
                  </div>
                  <div>
                    <label className="text-[13px] text-[#1E1E1E] font-medium">
                      FEWA ID
                    </label>
                    <Field
                      type="text"
                      value={
                        selectedFlat ? selectedFlat.fewaAccountId ?? "" : ""
                      }
                      readOnly
                      className="w-full mt-[10px] select-m p-3 rounded-lg border border-[#1E1E1E1A] hover:border-custom-green text-black placeholder:text-[#959595] focus-visible:outline-custom-green placeholder:text-[14px] text-[14px]"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index}>
                      <Skeleton height={20} width={80} className="mb-2" />
                      <Skeleton height={40} className="rounded-md" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>

      {/* tabs  */}

      <div className="flex gap-4 my-5">
        {filters.map((building, index) => (
          <button
            key={index}
            onClick={() => setActiveBox(building.name)} // Set active box
            className={`flex gap-3 justify-between items-center group px-2.5 py-2 rounded-md border border-custom-gray bg-white ${
              activeBox === building.name
                ? "bg-custom-gradient-green text-white"
                : "hover:bg-custom-gradient-green hover:text-white"
            }`}
          >
            <h2
              className={`text-[15px]  ${
                activeBox === building.name
                  ? "text-white"
                  : "text-[#1E1E1E] group-hover:text-white"
              }`}
            >
              {building.name.charAt(0).toUpperCase() +
                building.name.slice(1).toLowerCase()}
            </h2>
            <div
              className={`rounded-full p-1 text-[10px] ${
                activeBox === building.name
                  ? "text-white bg-[#32a733]"
                  : "text-[#1E1E1E] group-hover:text-white group-hover:bg-[#32a733]"
              }`}
            >
              {building.count}
            </div>
          </button>
        ))}
      </div>

      {activeBox === "lease" && (
        <div className="p-5 bg-white border border-custom-gray rounded-[10px]">
          <h2 className="text-xl leading-5 text-black font-semibold mb-2">
            Lease
          </h2>
          {/* Add your lease form or content here */}
          <div className="px-[0px] flex flex-row w-full justify-between p-6 flex-wrap gap-2">
            <div className="flex justify-between flex-row gap-4 flex-wrap">
              {/* <div>
                <SearchField />
              </div> */}
            </div>

            {!id ? (
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowLeasesModal(true), setEditingLease(null);
                  }}
                  className="flex justify-center items-center gap-[10px] text-nowrap rounded-[10px] border border-custom-gray p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
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
                        stroke="#1e1e1e"
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
                        stroke="#1e1e1e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                    </g>
                  </svg>
                  Add Lease
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowNewLeasesModal(true), setEditingLease(null);
                  }}
                  className="flex justify-center items-center gap-[10px] text-nowrap rounded-[10px] border border-custom-gray p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
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
                        stroke="#1e1e1e"
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
                        stroke="#1e1e1e"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                    </g>
                  </svg>
                  Add Lease
                </button>
              </>
            )}
          </div>

          {showLeasesModal && (
            <AddLeaseModal
              onClose={() => setShowLeasesModal(false)}
              onSave={handleLeaseSaveCheques}
              title={editingLease !== null ? "Edit Lease" : "Add Lease"}
              editingCheque={editingLease}
              initialValues={
                editingLease !== null ? leases[editingLease] : null
              } // Pre-fill data if editing
            />
          )}

          {showNewLeasesModal && (
            <AddLeaseModal
              onClose={() => setShowNewLeasesModal(false)}
              onSave={handleSaveNewLeases}
              title={"Add Lease"}
              editingCheque={editingLease}
              initialValues={
                editingLease !== null ? leases[editingLease] : null
              } // Pre-fill data if editing
            />
          )}
          {leases.length > 0 ? (
            <ManualTable columns={leaseColumns} data={leases} />
          ) : (
            <p className="text-gray-500 text-base text-center w-100 pb-3">
              No Leases Available.
            </p>
          )}
        </div>
      )}

      {activeBox === "rent cheque/cash" && (
        <div className="p-5 bg-white border border-custom-gray rounded-[10px]">
          <h2 className="text-xl leading-5 text-black font-semibold mb-2">
            Rent Cheque/Cash
          </h2>

          <div className="px-[0px] flex flex-row w-full justify-between p-6 flex-wrap gap-2">
            <div className="flex justify-between flex-row gap-4 flex-wrap">
              {/* <div>
                <SearchField />
              </div> */}
            </div>
            {!id ? (
              <>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowRentChequesModal(true), setEditingRentCheque(null);
                    }}
                    className="flex justify-center items-center gap-[10px] text-nowrap rounded-[10px] border border-custom-gray p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
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
                          stroke="#1e1e1e"
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
                          stroke="#1e1e1e"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                        />
                      </g>
                    </svg>
                    Add Rent Cheque/Cash
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowNewRentChequesModal(true),
                        setEditingRentCheque(null);
                    }}
                    className="flex justify-center items-center gap-[10px] text-nowrap rounded-[10px] border border-custom-gray p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
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
                          stroke="#1e1e1e"
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
                          stroke="#1e1e1e"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                        />
                      </g>
                    </svg>
                    Add Rent Cheque/Cash
                  </button>
                </div>
              </>
            )}
          </div>

          {showRentChequesModal && (
            <AddChequeModal
              tenantId:id={id}
              onClose={() => setShowRentChequesModal(false)}
              onSave={handleSaveRentCheques}
              title={
                editingRentCheque !== null
                  ? "Edit Cheque/Cash"
                  : "Add Rent Cheque/Cash"
              }
              editingCheque={editingRentCheque}
              initialValues={
                editingRentCheque !== null
                  ? rentCheques[editingRentCheque]
                  : null
              } // Pre-fill data if editing
            />
          )}

          {showNewRentChequesModal && (
            <AddChequeModal
              tenantId:id={id}
              onClose={() => setShowNewRentChequesModal(false)}
              onSave={handleSaveNewRentCheques}
              title={"Add Rent Cheque/Cash"}
              editingCheque={editingRentCheque}
              initialValues={
                editingRentCheque !== null
                  ? rentCheques[editingRentCheque]
                  : null
              } // Pre-fill data if editing
            />
          )}

          {rentCheques.length > 0 ? (
            <ManualTable columns={rentChequeColumns} data={rentCheques} />
          ) : (
            <p className="text-gray-500 text-base text-center w-100 pb-3">
              No Cheques/Cash Available.
            </p>
          )}
        </div>
      )}

      {activeBox === "security cheque/cash" && (
        <div className="p-5 bg-white border border-custom-gray rounded-[10px]">
          <h2 className="text-xl leading-5 text-black font-semibold mb-2">
            Security Cheque/Cash
          </h2>

          <div className="px-[0px] flex flex-row w-full justify-between p-6 flex-wrap gap-2">
            <div className="flex justify-between flex-row gap-4 flex-wrap">
              {/* <div>
                <SearchField />
              </div> */}
            </div>
            {!id ? (
              <>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowSecurityChequesModal(true),
                        setEditingSecurityCheque(null);
                    }}
                    className="flex justify-center items-center gap-[10px] text-nowrap rounded-[10px] border border-custom-gray p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
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
                          stroke="#1e1e1e"
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
                          stroke="#1e1e1e"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                        />
                      </g>
                    </svg>
                    Add Security Cheque/Cash
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowNewSecurityChequesModal(true),
                        setEditingSecurityCheque(null);
                    }}
                    className="flex justify-center items-center gap-[10px] text-nowrap rounded-[10px] border border-custom-gray p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
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
                          stroke="#1e1e1e"
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
                          stroke="#1e1e1e"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                        />
                      </g>
                    </svg>
                    Add Security Cheque/Cash
                  </button>
                </div>
              </>
            )}
          </div>

          {showSecurityChequesModal && (
            <AddSecurityModal
              tenantId:id={id}
              onClose={() => setShowSecurityChequesModal(false)}
              onSave={handleSaveSecurityCheques}
              title={
                editingSecurityCheque !== null
                  ? "Edit Cheque/Cash"
                  : "Add Security Cheque/Cash"
              }
              editingCheque={editingSecurityCheque}
              initialValues={
                editingSecurityCheque !== null
                  ? securityCheques[editingSecurityCheque]
                  : null
              } // Pre-fill data if editing
            />
          )}

          {showNewSecurityChequesModal && (
            <AddSecurityModal
              tenantId:id={id}
              onClose={() => setShowNewSecurityChequesModal(false)}
              onSave={handleSaveNewSecurityCheques}
              title={"Add Security Cheque/Cash"}
              editingCheque={editingSecurityCheque}
              initialValues={
                editingSecurityCheque !== null
                  ? securityCheques[editingSecurityCheque]
                  : null
              } // Pre-fill data if editing
            />
          )}

          {securityCheques.length > 0 ? (
            <ManualTable
              columns={securityChequeColumns}
              data={securityCheques}
            />
          ) : (
            <p className="text-gray-500 text-base text-center w-100 pb-3">
              No Cheques/Cash Available.
            </p>
          )}
        </div>
      )}

      {showDltLeaseModal && (
        <DeleteModal
          onClose={() => setShowDltLeaseModal(!showDltLeaseModal)}
          title={`Are you sure you want to delete?`}
          setShowDltModal={setShowDltLeaseModal}
          deleteMutation={deleteLeaseMutation}
          deleteId={leaseDeleteId}
        />
      )}

      {showDltRentChequeModal && (
        <DeleteModal
          onClose={() => setShowDltRentChequeModal(!showDltRentChequeModal)}
          title={`Are you sure you want to delete?`}
          setShowDltModal={setShowDltRentChequeModal}
          deleteMutation={deleteChequeMutation}
          deleteId={rentChequeDeleteId}
        />
      )}

      {showDltSecurityChequeModal && (
        <DeleteModal
          onClose={() =>
            setShowDltSecurityChequeModal(!showDltSecurityChequeModal)
          }
          title={`Are you sure you want to delete?`}
          setShowDltModal={setShowDltSecurityChequeModal}
          deleteMutation={deleteChequeMutation}
          deleteId={securityChequeDeleteId}
        />
      )}

      {showLeasesDocModal && (
        <AddLeaseDocModal
          setShowLeasesDocModal={setShowLeasesDocModal}
          selectedLease={selectedLease}
          handleUploadLeaseDocs={handleUploadLeaseDocs}
          handleFileChangeLease={handleFileChangeLease}
          deleteLeaseDocument={deleteLeaseDocument}
          fetchedDocuments={fetchedDocuments}
          uploadingDocuments={uploadingDocuments}
        />
      )}
    </div>
  );
};

export default AddNewTenantOld;
