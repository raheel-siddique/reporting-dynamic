import React from "react";
import edticon from "../../assets/edticon.svg";
import { formatPhoneNumber } from "../../utils/format";

function generateUserColumns({ selectUser }) {
  const columns = [
    { Header: "User Id", accessor: "id" },
    {
      Header: "Full Name",
      accessor: "username",
      Cell: ({ row }) => <span>{row.original.username}</span>,
    },
    {
      Header: "Email",
      accessor: "email",
      Cell: ({ row }) => <span>{row.original.email}</span>,
    },
    {
      Header: "Phone",
      accessor: "phone",
      Cell: ({ row }) => (
        <span>
          {formatPhoneNumber(
            row.original.phoneNumber,
            row.original.phoneCountryCode
          )}
        </span>
      ),
    },
    {
      Header: "Role",
      accessor: "role",
      Cell: ({ row }) => (
        <span>
          {Array.isArray(row.original.role)
            ? row.original.role.join(", ")
            : row.original.role}
        </span>
      ),
    },

    // {
    //   Header: "Status",
    //   accessor: "isActive",
    //   Cell: ({ row }) => {
    //     const isActive = row.original.isActive;
    //     // console.log("acitve", isActive, row.original);
    //     return (
    //       <span className={`rounded-md text-[14px]`}>
    //         {isActive === true ? "Active" : "Inactive"} {/* Explicit check */}
    //       </span>
    //     );
    //   },
    // },
    // {
    //   Header: "Actions",
    //   accessor: "actions",
    //   Cell: ({ row }) => (
    //     <div className="flex gap-[20px]">
    //       {/* <img className="cursor-pointer" src={dlticon} alt="Delete" /> */}
    //       <img
    //         className="cursor-pointer"
    //         onClick={() => {
    //           const { id, fullName, email, phoneNumber, roles, isActive } =
    //             row.original;
    //           selectUser({
    //             id,
    //             fullName,
    //             email,
    //             phoneNumber,
    //             roles,
    //             isActive,
    //           });
    //         }}
    //         src={edticon}
    //         alt="Edit"
    //       />
    //     </div>
    //   ),
    // },
  ];

  return columns;
}

export default generateUserColumns;
