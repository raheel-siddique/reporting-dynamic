import React, { useEffect, useState } from "react";
import { formatDate } from "../../format";
import numberToWords from "../../amountToWords";
const ExpenseReceiptTemplate = (props) => {
  const [data, setData] = useState(null);
  const { data: propData } = props;

  useEffect(() => {
    if (propData) {
      console.log("propData =>", propData);
      let transactions = [
        {
          srNo: 1,
          paymentMode: propData?.paymentMode,
          chequeNumber: propData?.chequeNumber,
          paymentAccount: propData?.expenseType,
          description: propData?.description,
          amountDr: propData?.totalAmount,
          bankname: propData?.bankname,
        },
        {
          srNo: 2,
          paymentMode: propData?.paymentMode,
          chequeNumber: propData?.chequeNumber,
          createdAt: propData?.createdAt,
          paymentAccount: `${propData?.paymentMode} ${propData?.bankname || ""}`,
          date: propData?.date,
          description: propData?.description,
          amountCr: propData?.totalAmount,
          bankname: propData?.bankname,
        },
      ];

      console.log({ ...propData, transactions }, propData)

      setData({ ...propData, transactions });
    }
  }, [propData]);

  return (
    <div id="receipt" className="container mx-auto border p-5 w-[900px]">
      {/* Header */}
      <div className="text-center font-bold text-lg border-b-2 pb-2 mb-3">
        CASH / BANK PAYMENT VOUCHER
      </div>

      {/* Details Section */}
      <table className="w-full border-collapse border">
        <tbody>
          <tr>
            <td className="border p-2">
              <b>EXPENSE TYPE:</b>
            </td>
            <td className="border p-2">
              {data?.expenseType?.trim() !== "" ? data?.expenseType : "-"}
            </td>
            <td className="p-2 text-right">
              <b>DATE:</b>
            </td>
            <td className="p-2">
              {data?.createdAt ? formatDate(data?.createdAt) : "-"}
            </td>
          </tr>
          <tr>
            <td className="border p-2">
              <b>BUILDING:</b>
            </td>
            <td className="border p-2">
              {data?.buildingname?.trim() !== "" ? data?.buildingname : "-"}
            </td>
            {/* <td className="p-2 text-right">
              <b>CPV / BPV:</b>
            </td>
            <td className="p-2">025</td> */}
          </tr>
          <tr>
            <td className="border p-2">
              <b>FLAT NO.:</b>
            </td>
            <td className="border p-2">
              {data?.flatname?.trim() !== "" ? "FLAT-" + data?.flatname : "-"}
            </td>
            <td className="p-2"></td>
            <td className="p-2"></td>
          </tr>
          <tr>
            <td className="border p-2">
              <b>PAYEE / PAY TO:</b>
            </td>
            <td className="border p-2">
              {data?.payeename?.trim() !== "" ? data?.payeename : "-"}
            </td>
            <td className="p-2"></td>
            <td className="p-2"></td>
          </tr>
        </tbody>
      </table>

      {/* Payment Table */}
      <table className="w-full border-collapse border mt-3">
        <thead>
          <tr className="bg-gray-200">
            <th className="border text-[14px] p-2">SR. NO.</th>
            <th className="border text-[14px] p-2">MODE OF PAYMENT</th>
            <th className="border text-[14px] p-2">CHEQUE NUMBER</th>
            <th className="border text-[14px] p-2">DATE OF CHEQUE</th>
            <th className="border text-[14px] p-2">PAYMENT ACCOUNT</th>
            <th className="border text-[14px] p-2">DESCRIPTION</th>
            <th className="border text-[14px] p-2">AMOUNT (AED) DR.</th>
            <th className="border text-[14px] p-2">AMOUNT (AED) CR.</th>
          </tr>
        </thead>
        <tbody>
          {data?.transactions.map((transaction, index) => (
            <tr>
              <td align="center" className="border p-2">{transaction?.srNo}</td>
              <td align="center" className="border p-2">
                {transaction?.paymentMode?.trim() !== ""
                  ? transaction?.paymentMode
                  : "-"}
              </td>
              <td align="center" className="border p-2">
                {transaction?.chequeNumber?.trim() !== ""
                  ? transaction?.chequeNumber
                  : "-"}
              </td>
              <td align="center" className="border p-2">
                {transaction?.date ? formatDate(transaction?.date) : "-"}
              </td>
              <td align="center" className="border p-2">
                {transaction?.paymentAccount?.trim() !== ""
                  ? transaction?.paymentAccount
                  : "-"}
              </td>
              <td align="center" className="border p-2">
                {transaction?.description?.trim() !== ""
                  ? transaction?.description
                  : "-"}
              </td>
              <td align="center" className="border font-semibold p-2">
                {transaction?.amountDr ?? "-"}
              </td>
              <td align="center" className="border font-semibold p-2">
                {transaction?.amountCr ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table>
        <tbody>
          <tr className="w-full border-collapse border-0 mt-3">
            <td className="p-2">
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp;
            </td>
            <td className="p-2">
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp;
            </td>
            <td className="p-2">
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp;
            </td>
            <td className="p-2">
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp;
            </td>
            <td className="p-2">
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            </td>
            <td className="p-2 w-[125px] text-[14px] font-semibold text-wrap">
              TOTAL AMOUNT (AED)
            </td>
            <td align="center" className="p-2 font-semibold w-[113.5px]">
              {data?.totalAmount ?? "-"}
            </td>
            <td align="center" className="p-2 font-semibold w-[110.5px]">
              {data?.totalAmount ?? "-"}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Amount Section */}
      <table className="w-full border-collapse border mt-3">
        <tbody>
          <tr className="bg-gray-200">
            <td align="left" className="p-2 font-semibold flex justify-between">
              <span>Amount: AED{" "}</span>
              <span>{data?.totalAmount ? numberToWords(data?.totalAmount) : "-"}</span>
            </td>
            <td className="p-2"></td>
          </tr>
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex justify-between mt-14 italic">
        <span>
          <b>Prepared by:</b> _____________________
        </span>
        <span>
          <b>Checked by:</b> _____________________
        </span>
      </div>
    </div>
  );
};

export default ExpenseReceiptTemplate;
