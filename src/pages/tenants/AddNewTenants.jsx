import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState, useMemo, useEffect, useRef } from "react";
import "react-phone-input-2/lib/style.css";

import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReusableInput from "../../components/form-elements/input/ReusableInput";
import { useMyLocations } from "../../hooks/useMyLocations";
import { useFlats } from "../../hooks/useFlats";
import { useTenants } from "../../hooks/useTenants";
import { AmountTypeEnum, DatedOrOpenEnum } from "../../utils/enums";

import {
  formatDateForBackend,
  compareStringNumberValues,
  formatDate,
} from "../../utils/format";
import DatePickerField from "../../components/DatePicker/DatePickerField";
import { useImages } from "../../hooks/useImages";
import DeleteModal from "../../components/modal/DeleteModal";
import { CustomSelect } from "../../components/Common/CustomSelect";
import { useSelector } from "react-redux";
import CustomImageUploader from "../../components/img/CustomImageUploader";
import { ChequeStatuses, DatedOrOpen, FlatStatuses } from "../../utils/enums";
import AddLeaseDocModal from "../../components/tenants/add-tenant/AddLeaseDocModal";
import { useLeaseDocumentImages } from "../../hooks/useLeaseImages";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import TabularForm from "../../components/agGrid/TabularForm";
import { toast } from "react-toastify";
import { useChequeTabular } from "../../hooks/useChequeTabular";
import PhoneInputField from "../../components/form-elements/input/PhoneInputField";
import { validationTenantSchema } from "../../schemas/tenantSchema";
import Notifier from "../../components/errors/Notifier";
import { useLeaseTabular } from "../../hooks/useLeaseTabular";
import AddLeaseModal from "../../components/tenants/add-tenant/AddLeaseModal";
import AddChequeModal from "../../components/tenants/add-tenant/AddChequeModal";

// Register Required Modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const AddNewTenant = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [leasePage, setLeasePage] = useState(1);
  const [leasePageSize, setLeasePageSize] = useState(10);
  const [chequePage, setChequePage] = useState(1);
  const [chequePageSize, setChequePageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [dialCode, setDialCode] = useState(null);

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
  } = useTenants(
    page,
    pageSize,
    search,
    leasePage,
    leasePageSize,
    chequePage,
    chequePageSize
  );

  const childRentRef = useRef();
  const childSecurityRef = useRef();
  const childLeaseRef = useRef();

  const { data: tenantDetails, isLoading } = useTenantById(id);

  const [locationId, setLocationId] = useState(null);
  const [buildingId, setBuildingId] = useState(null);

  const [activeBox, setActiveBox] = useState("lease");

  const [rentCheques, setRentCheques] = useState(null);
  const [securityCheques, setSecurityCheques] = useState(null);
  const [leases, setLeases] = useState(null);
  const [selectedLease, setSelectedLease] = useState(null);

  const [showNewLeasesModal, setShowNewLeasesModal] = useState(false);

  const [showLeasesModal, setShowLeasesModal] = useState(false);
  const [showLeasesDocModal, setShowLeasesDocModal] = useState(false);

  const [showChequeModal, setShowChequeModal] = useState(false);
  const [selectedChequeView, setSelectedChequeView] = useState(null);

  const [selectedLeaseView, setSelectedLeaseView] = useState(null);
  const [showDltLeaseModal, setShowDltLeaseModal] = useState(false);
  const [showDltRentChequeModal, setShowDltRentChequeModal] = useState(false);
  const [showDltSecurityChequeModal, setShowDltSecurityChequeModal] =
    useState(false);

  const [leaseDeleteId, setLeaseDeleteId] = useState(null);
  const [rentChequeDeleteId, setRentChequeDeleteId] = useState(null);
  const [securityChequeDeleteId, setSecurityChequeDeleteId] = useState(null);
  const { hasManagementAccess } = useSelector((state) => state.auth);

  const viewCheque = (data) => {
    setShowChequeModal(true);
    setSelectedChequeView(data);
  };

  const { rowColumns, newRowObj } = useChequeTabular(
    activeBox === "security cheque/cash" ? "Security" : "Rent",
    (params) =>
      activeBox !== "security cheque/cash"
        ? childRentRef.current?.handleAddRow?.(params)
        : childSecurityRef.current?.handleAddRow?.(params),
    (params) =>
      activeBox !== "security cheque/cash"
        ? childRentRef.current?.handleEditRow?.(params)
        : childSecurityRef.current?.handleEditRow?.(params),
    (params) =>
      activeBox !== "security cheque/cash"
        ? childRentRef.current?.handleDeleteRow?.(params)
        : childSecurityRef.current?.handleDeleteRow?.(params),
    viewCheque
  );

  const handleLeaseDocuments = (row) => {
    setSelectedLease(row);
    setShowLeasesDocModal(true);
  };

  const viewLease = (data) => {
    setShowLeasesModal(true);
    setSelectedLeaseView(data);
  };

  const {
    rowColumns: leaseRowColumns,
    newRowObj: leaseNewRowObj,
    handleCellValueChanged,
    handleAddLease,
    handleEditLease,
    handleDeleteLease,
    formatPayload: formatLeasePayload,
    handleAddDocument: handleAddLeaseDocument,
    checkForValidation,
  } = useLeaseTabular(
    id ?? null,
    (params) => childLeaseRef.current?.handleAddRow?.(params),
    (params) => childLeaseRef.current?.handleEditRow?.(params),
    (params) => childLeaseRef.current?.handleDeleteRow?.(params),
    (columnName, id, value) =>
      childLeaseRef.current?.manuallyUpdateColumn?.(columnName, id, value),
    handleLeaseDocuments,
    viewLease
  );

  const {
    uploadLeaseDocument,
    deleteLeaseDocument,
    fetchedDocuments,
    uploadingDocuments,
    documentPaths,
    clearData,
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
  const [leaseCount, setLeaseCount] = useState(0);
  const [rentChequeCount, setRentChequeCount] = useState(0);
  const [securityChequeCount, setSecurityChequeCount] = useState(0);

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
            (rc) => rc.depositTypeText == "Rent"
          );
          const securityCheques = tenantDetails.cheques.filter(
            (sc) => sc.depositTypeText == "Security"
          );
          setRentCheques(rentCheques);

          setSecurityCheques(securityCheques);
        }
      }
    }
  }, [tenantDetails]);

  const formatPayload = (payload) => {
    const formattedRentCheques = {
      amountType: payload.amountType || "Cheque",
      amount: payload.amount ? Number(payload.amount) : null,
      vat: payload.vat ? Number(payload.vat) : null,
      discount: payload.discount ? Number(payload.discount) : null,
      note: payload.note,
      tenantId: id,
      datedOrOpen: payload.datedOrOpen || DatedOrOpen.Open.label,
      depositType: payload.depositType,
    };

    // Include these fields only if amountType is "Cheque"
    if (compareStringNumberValues(AmountTypeEnum, payload.amountType, 1)) {
      formattedRentCheques.bankId = payload.bankId;
      formattedRentCheques.depositBankId = payload.depositBankId;
      formattedRentCheques.chequeNo = payload.chequeNo;
      formattedRentCheques.status =
        payload.statusText || ChequeStatuses.PDC.label;
    }

    // Ensure 'date' is required when datedOrOpen is "Dated"
    if (compareStringNumberValues(DatedOrOpenEnum, payload.datedOrOpen, 1)) {
      if (!payload.date) {
        toast.error("Date is required when selecting 'Dated'", {
          position: "top-center",
        });
        return null;
      }
      formattedRentCheques.date = formatDateForBackend(payload.date);
    }

    if (payload?.id) formattedRentCheques.id = payload.id;

    return formattedRentCheques;
  };

  const handleAddChequeRow = async (payload) => {
    let obj = formatPayload(payload);

    if (!obj) return; // Stop execution if date validation fails

    if (!obj.amount || isNaN(obj.amount)) {
      toast.error(`All rows must have a valid amount greater than 0!`, {
        position: "top-center",
      });
      return;
    }

    if (id) {
      try {
        const response = await addChequeMutation.mutateAsync([obj]);
        return response.message;
      } catch (error) {}
    } else {
      toast.success("Changes saved successfully", {
        position: "top-center",
      });
    }
  };

  const handleEditChequeRow = (payload) => {
    let obj = formatPayload(payload);

    if (!obj) return; // Stop execution if date validation fails

    if (!obj.amount || isNaN(obj.amount)) {
      toast.error(`All rows must have a valid amount greater than 0!`, {
        position: "top-center",
      });
      return;
    }

    updateChequesMutation({ ...obj, tenantId: id });
  };

  const handleDeleteChequeRow = (id) => {
    deleteChequeMutation(id);
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

      annualRentAsPerContract: lease.annualRentAsPerContract,
      actualRent: lease.actualRent,
      leaseStatus: lease.leaseStatusText || LeaseStatuses.Pending.label, // Default to "Pending"
      tenantId: id,
    }));

    const payload = [...formattedLeases];

    addLeaseMutation(payload);
    setShowNewLeasesModal(false);
  };

  const filters = [
    {
      name: "lease",
      isNotify: tenantDetails?.isLeaseNotify,

      count: leaseCount,
    },
    {
      name: "rent cheque/cash",
      count: rentChequeCount,
      isNotify: tenantDetails?.isRentChequeNotify,
    },
    {
      name: "security cheque/cash",
      count: securityChequeCount,
      isNotify: tenantDetails?.isSecurityChequeNotify,
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
      const rowRentData = childRentRef.current.getRowValues();
      const rowSecurityData = childSecurityRef.current.getRowValues();
      const rowLeaseData = childLeaseRef.current.getRowValues();
      const rowData = [...rowRentData, ...rowSecurityData];

      const hasInvalidAmount = rowData.some(
        (row) => !row.amount || Number(row.amount) <= 0
      );

      if (hasInvalidAmount) {
        toast.error(`All rows must have a valid amount greater than 0!`, {
          position: "top-center",
        });
        return;
      }
      const processedRentCheques = rowData.map((cheque) => {
        if (cheque.amountType.toLowerCase() === "cheque") {
          return {
            ...cheque,
            date: formatDateForBackend(cheque.date),
            amount: cheque.amount ? Number(cheque.amount) : null,
            vat: cheque.vat ? Number(cheque.vat) : null,
            discount: cheque.discount ? Number(cheque.discount) : null,
            status: cheque.statusText,
          };
        } else {
          const {
            status,
            chequeNo,
            date,
            amount,
            vat,
            discount,
            ...remainingFields
          } = cheque;

          return {
            ...remainingFields,
            date: formatDateForBackend(date),
            amount: amount ? Number(amount) : null,
            vat: vat ? Number(vat) : null,
            discount: discount ? Number(discount) : null,
          };
        }
      });

      let validationError = false;
      let processedLeases = [];

      for (const lease of rowLeaseData) {
        if (!checkForValidation(lease)) {
          validationError = true;
          break; // Stop iteration when validation fails
        }
        processedLeases.push(formatLeasePayload(lease));
      }

      if (validationError) return;

      // Build the payload
      const payload = {
        ...formValues,
        flatId: formValues.flatId ? Number(formValues.flatId) : null,
        idImages: imagePaths.join(","), // Convert array to comma-separated string
        idExpiryDate: formatDateForBackend(formValues.idExpiryDate),
        sewerageAccountNo: formValues.sewerageAccountNoGeneral || "",
        fewaAccountNo: formValues.fewaAccountNoGeneral || "",
        phoneCountryCode: dialCode,
        description,
        cheques: processedRentCheques,
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
        phoneCountryCode: dialCode,

        idImages: imagePaths.join(","),

        idExpiryDate: formatDateForBackend(formValues.idExpiryDate),
      };

      updateTenantMutation(payload);
    }
  };

  const handleLocationChange = (e, setFieldValue) => {
    const selectedLocationId = e.target.value;
    setLocationId(selectedLocationId);
    setFieldValue("locationId", selectedLocationId);
  };

  const handleBuildingChange = (e, setFieldValue) => {
    const selectedBuildingId = e.target.value;
    setBuildingId(selectedBuildingId);
    setFieldValue("buildingId", selectedBuildingId);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

    const file = e.target.files[0];
    const folder = "Tenants/idImages";
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

  const flatOptions = flatsFiltered
    ? flatsFiltered.map((flat) => ({
        value: flat.id,
        label: flat.flatType.name
          ? `#${flat.number}-${flat.flatType.name} - ${flat.flatStatusText}`
          : `#${flat.number}`,
        statusColor: flat.flatStatusText === "Occupied" ? "red" : "black",
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
    const flatExists = flatsData.find((flat) => flat.id === flatId);
    if (flatExists) {
      setSelectedFlat(flatExists);
    } else {
      setSelectedFlat(null);
    }
  };

  return (
    <div className="p-5">
      <Formik
        initialValues={{
          ...initialValues,
          location:
            locationsData && locationsData.length > 0
              ? locationsData[0].id
              : "",
        }}
        validationSchema={validationTenantSchema}
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
                    <PhoneInputField
                      value={values.phone}
                      onChange={(phone, countryData) => {
                        setFieldValue("phone", phone);
                        setDialCode(countryData.countryCode);
                      }}
                    />

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
            {building?.isNotify && <Notifier />}

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

      <div
        className={`p-5 bg-white border border-custom-gray rounded-[10px] ${
          activeBox === "lease" ? "block" : "hidden"
        }`}
      >
        <h2 className="text-xl leading-5 text-black font-semibold mb-2">
          Lease
        </h2>
        <TabularForm
          ref={childLeaseRef}
          initialData={leases}
          addRow={handleAddLease}
          editRow={handleEditLease}
          deleteRow={handleDeleteLease}
          getRowCount={setLeaseCount}
          rowColumns={leaseRowColumns}
          newRowObj={leaseNewRowObj}
          handleCellValueChanged={handleCellValueChanged}
        />
      </div>

      <div
        className={`p-5 bg-white border border-custom-gray rounded-[10px] ${
          activeBox === "rent cheque/cash" ? "block" : "hidden"
        }`}
      >
        <h2 className="text-xl leading-5 text-black font-semibold mb-2">
          Rent Cheque/Cash
        </h2>
        <TabularForm
          ref={childRentRef}
          initialData={rentCheques}
          addRow={handleAddChequeRow}
          editRow={handleEditChequeRow}
          deleteRow={handleDeleteChequeRow}
          getRowCount={setRentChequeCount}
          rowColumns={rowColumns}
          newRowObj={newRowObj}
        />
      </div>

      <div
        className={`p-5 bg-white border border-custom-gray rounded-[10px]} ${
          activeBox === "security cheque/cash" ? "block" : "hidden"
        }`}
      >
        <h2 className="text-xl leading-5 text-black font-semibold mb-2">
          Security Cheque/Cash
        </h2>
        <TabularForm
          ref={childSecurityRef}
          initialData={securityCheques}
          addRow={handleAddChequeRow}
          editRow={handleEditChequeRow}
          deleteRow={handleDeleteChequeRow}
          getRowCount={setSecurityChequeCount}
          rowColumns={rowColumns}
          newRowObj={newRowObj}
        />
      </div>

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
          handleUploadLeaseDocs={() => {
            handleAddLeaseDocument(selectedLease, documentPaths);
            setShowLeasesDocModal(false);
            clearData();
          }}
          handleFileChangeLease={handleFileChangeLease}
          deleteLeaseDocument={deleteLeaseDocument}
          fetchedDocuments={fetchedDocuments}
          uploadingDocuments={uploadingDocuments}
        />
      )}

      {showLeasesModal && (
        <AddLeaseModal
          onClose={() => setShowLeasesModal(false)}
          // onSave={handleLeaseSaveCheques}
          title={"View Lease"}
          viewOnly={true}
          editingCheque={selectedLeaseView}
          initialValues={selectedLeaseView !== null ? selectedLeaseView : null} // Pre-fill data if editing
        />
      )}

      {showChequeModal && (
        <AddChequeModal
          onClose={() => setShowChequeModal(false)}
          title={activeBox !== "security cheque/cash" ? "View Rent cheque/cash" : "View Security cheque/cash"}
          viewOnly={true}
          editingCheque={selectedChequeView}
          initialValues={
            selectedChequeView !== null ? selectedChequeView : null
          }
        />
      )}
    </div>
  );
};

export default AddNewTenant;
