// Utility functions for formatting
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const formatDate = (date) => {
  if (!date) return "-";
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Intl.DateTimeFormat("en-GB", options)?.format(new Date(date));
};

export const formatDateForBackend = (date) => {
  if (!date) return null;

  const formattedDate = new Date(date);

  formattedDate.setMinutes(
    formattedDate.getMinutes() - formattedDate.getTimezoneOffset()
  );

  return formattedDate.toISOString().split("T")[0]; // YYYY-MM-DD format
};

export const formatAmount = (amount) => {
  if (amount == null || amount == undefined) return "-";
  return new Intl.NumberFormat("en-US", {}).format(amount);
};

export const formatPhoneNumber = (phone, phoneCountryCode = "AE") => {
  if (!phone) return "-";

  const phoneStr = String(phone).trim();
  const countryCode = phoneCountryCode && phoneCountryCode.toUpperCase();

  let parsedPhone = parsePhoneNumberFromString(phoneStr);

  if (!parsedPhone && countryCode) {
    parsedPhone = parsePhoneNumberFromString(phoneStr, countryCode);
  }

  return parsedPhone ? parsedPhone.formatInternational() : phone;
};

export function sumVacantBreakdown(data) {
  const totalBreakdown = {
    expired: 0,
    withoutTenant: 0,
    withoutLease: 0,
    deActivated: 0,
  };

  if (!data || data.length == 0) return totalBreakdown;

  data.forEach((location) => {
    location.buildings.forEach((building) => {
      const breakdown = building.flatCount.vacantBreakDown;
      totalBreakdown.expired += breakdown.expired;
      totalBreakdown.withoutTenant += breakdown.withoutTenant;
      totalBreakdown.withoutLease += breakdown.withoutLease;
      totalBreakdown.deActivated += breakdown.deActivated;
    });
  });

  return totalBreakdown;
}

export const chequesStatus = [
  { value: 1, name: "PDC" }, // The cheque is created but not yet processed
  //   { value: 2, name: "Issued" }, // The cheque has been issued to the payee
  { value: 3, name: "Deposited" }, // The cheque has been deposited for processing
  { value: 4, name: "Cleared" }, // The cheque has been successfully processed
  { value: 5, name: "Bounced" }, // The cheque was returned due to insufficient funds or other issues
  { value: 14, name: "Security return" }, // The cheque was returned due to insufficient funds or other issues
  { value: 15, name: "Replaced" }, // The cheque was returned due to insufficient funds or other issues
  { value: 16, name: "Replaced cheque" }, // The cheque was returned due to insufficient funds or other issues
  { value: 17, name: "Replaced cash" }, // The cheque was returned due to insufficient funds or other issues
];

export const chequeStatusStyle = {
  Pending: "bg-yellow-200 text-yellow-800 px-2 py-1 rounded",
  Issued: "bg-blue-200 text-blue-800 px-2 py-1 rounded",
  Deposited: "bg-green-200 text-green-800 px-2 py-1 rounded",
  Cleared: "bg-teal-200 text-teal-800 px-2 py-1 rounded",
  Bounced: "bg-red-200 text-red-800 px-2 py-1 rounded",
  Cancelled: "bg-gray-200 text-gray-800 px-2 py-1 rounded",
  Expired: "bg-purple-200 text-purple-800 px-2 py-1 rounded",
  OnHold: "bg-orange-200 text-orange-800 px-2 py-1 rounded",
  Stopped: "bg-pink-200 text-pink-800 px-2 py-1 rounded",
  Lost: "bg-indigo-200 text-indigo-800 px-2 py-1 rounded",
  Reissued: "bg-lime-200 text-lime-800 px-2 py-1 rounded",
  Fraudulent: "bg-rose-200 text-rose-800 px-2 py-1 rounded",
};

export const leaseStatus = [
  { value: 1, name: "Pending" }, // Lease agreed but not started
  { value: 2, name: "Active" }, // Lease is currently in effect
  { value: 3, name: "Expired" }, // Lease naturally ended without renewal
  //   { value: 4, name: "Terminated" }, // Lease ended early
  //   { value: 5, name: "Renewed" }, // Lease renewed after expiration
  //   { value: 6, name: "InNegotiation" }, // Lease terms under discussion
  //   { value: 7, name: "Suspended" }, // Lease temporarily inactive
  { value: 8, name: "Cancelled" }, // Lease voided before start or officially terminated
];

export const leaseStatusStyle = {
  Pending: "bg-yellow-300 text-yellow-900 px-2 py-1 rounded",
  Active: "bg-green-300 text-green-900 px-2 py-1 rounded",
  Expired: "bg-gray-300 text-gray-900 px-2 py-1 rounded",
  //   Terminated: "bg-red-300 text-red-900 px-2 py-1 rounded",
  //   Renewed: "bg-teal-300 text-teal-900 px-2 py-1 rounded",
  //   InNegotiation: "bg-blue-300 text-blue-900 px-2 py-1 rounded",
  //   Suspended: "bg-orange-300 text-orange-900 px-2 py-1 rounded",
  Cancelled: "bg-purple-300 text-purple-900 px-2 py-1 rounded",
};

export const expenseTypeOptions = [
  { value: "General", label: "General" },
  { value: "BuildingName", label: "Building" },
];

export const paymentModeOptions = [
  { id: 1, value: "Cash", label: "Cash" },
  { id: 2, value: "Cheque", label: "Cheque" },
];

export const parameterTypes = [
  { id: 1, name: "Flat Type" },
  { id: 2, name: "Expense Type" },
  { id: 3, name: "Bank Name" },
  { id: 4, name: "Payee" },
];

export const compareStringNumberValues = (Enum, value1, value2) => {
  let val1, val2;
  val1 = typeof value1 === "string" ? Enum[value1] : value1;
  val2 = typeof value2 === "string" ? Enum[value2] : value2;

  return val1 === val2;
};

export const exportToCSV = ({
  data = [],
  filename = "export.csv",
  headers = [],
}) => {
  if (!data || data.length === 0) {
    console.warn("No data available for export.");
    return;
  }

  try {
    // Convert data into CSV format
    const csvHeaders = headers.map((header) => header.label).join(",");
    const csvRows = data.map((row) =>
      headers.map((header) => `"${row[header.key] || "N/A"}"`).join(",")
    );

    const csvContent = [csvHeaders, ...csvRows].join("\n");

    // Create Blob
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create download link
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting data:", error);
  }
};

export const flatsColumnToOrderByProperty = {
  id: "Id",
  name: "Name",
  flatCategoryText: "FlatCategoryText",
};

export const expenseAndBankColumnToOrderByProperty = {
  id: "Id",
  name: "Name",
};

export const payeeColumnToOrderByProperty = {
  id: "Id",
  name: "Name",
  email: "Email",
  phone: "Phone",
  trn: "TRN",
};

export const expenseAndReceiptsColumnToOrderByProperty = {
  ["expenseType.name"]: "ExpenseType.Name",
  ["building.name"]: "Building.Name",

  ["flat.number"]: "Flat.Number",

  ["payee.name"]: "Payee.Name",

  description: "Description",
  receiptType: "ReceiptTypeText",

  vatAmount: "VatAmount",
  paymentModeText: "PaymentModeText",
  date: "CreatedAt",
  vatPercentage: "VatPercentage",
  totalAmount: "TotalAmount",
  ["bank.name"]: "Bank.Name",
  invoiceNumber: "InvoiceNumber",
  receiptNumber: "ReceiptNumber",
};

export const userColumnToOrderByProperty = {
  id: "Id",
  fullName: "FullName",
  email: "Email",
  phoneNumber: "PhoneNumber",
  roles: "RolesText",
  isActive: "IsActive",
};
