export const ChequeStatuses = Object.freeze({
  PDC: {
    label: "PDC",
    value: 1,
  },
  Deposited: {
    label: "Deposited",
    value: 3,
  },
  Cleared: {
    label: "Cleared",
    value: 4,
  },
  Bounced: {
    label: "Bounced",
    value: 5,
  },
  SecurityReturn: {
    label: "Security return",
    value: 14,
  },
  Replaced: {
    label: "Replaced",
    value: 15,
  },

  SecurityReturn: {
    label: "Replaced cheque",
    value: 16,
  },
  Replaced: {
    label: "Replaced cash",
    value: 17,
  },
});

export const LeaseStatuses = Object.freeze({
  Pending: {
    label: "Pending",
    value: 1,
  },
  Active: {
    label: "Active",
    value: 2,
  },
  Expired: {
    label: "Expired",
    value: 3,
  },
  Cancelled: {
    label: "Cancelled",
    value: 8,
  },
});

export const LeaseStatusesReverse = {
  1: "Pending",
  2: "Active",
  3: "Expired",
  8: "Cancelled",
};

export const DepositType = Object.freeze({
  Rent: {
    label: "Rent",
    value: 1,
  },
  Security: {
    label: "Security",
    value: 2,
  },
});

export const FlatCategory = Object.freeze({
  Residential: {
    label: "Residential",
    value: 1,
  },
  Commercial: {
    label: "Commercial",
    value: 2,
  },
});

export const DatedOrOpen = Object.freeze({
  Dated: {
    label: "Dated",
    value: 1,
  },
  Open: {
    label: "Open",
    value: 2,
  },
});

export const FlatStatuses = Object.freeze({
  Vacant: {
    label: "Vacant",
    value: 1,
  },
  Occupied: {
    label: "Occupied",
    value: 2,
  },
});

export const ReceiptType = Object.freeze({
  Receipt: {
    label: "Receipt",
    value: 1,
  },
  Deposit: {
    label: "Deposit",
    value: 2,
  },
});

export const DatedOrOpenEnum = {
  Dated: 1,
  Open: 2,
};

export const DatedOrOpenEnumReverse = {
  1: "Dated",
  2: "Open",
};

export const AmountTypeEnum = {
  Cheque: 1,
  Cash: 2,
};

export const AmountTypeEnumReverse = {
  1: "Cheque",
  2: "Cash",
};
