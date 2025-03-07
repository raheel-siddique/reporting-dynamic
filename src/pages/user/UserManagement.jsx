import React, { useCallback, useEffect, useMemo, useState } from "react";
import MyTable from "../../components/myTable/MyTable";
import SearchField from "../../components/search/Searchfield";
import generateUserColumns from "../../components/user/columns";
import PlusIcon from "../../icons/PlusIcon";
import { useUser } from "../../hooks/useUser";
import UserModal from "../../components/user/UserModal";
import { useDebounce } from "use-debounce";
import { userColumnToOrderByProperty } from "../../utils/format";

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [orderBy, setOrderBy] = useState("Ascending");
  const [orderByProperty, setOrderByProperty] = useState("Id");

  const {
    users = [],
    addUserMutation,
    editUserMutation,
  } = useUser({
    page,
    pageSize,
    search: debouncedSearchQuery,
    orderBy,
    orderByProperty,
  });

  useEffect(() => {
    if (selectedUser) {
      openModal(true);
    } else {
      closeModal();
    }
  }, [selectedUser]);

  // add dependencies such as filter, page
  const columns = useMemo(
    () => generateUserColumns({ selectUser: setSelectedUser }),
    []
  );

  const openModal = () => setShowUserModal(true);
  const closeModal = () => {
    setSelectedUser(null);
    setShowUserModal(false);
  };

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  }, []);

  return (
    <div className="p-5 w-full h-full">
      <div className="relative overflow-x-auto  sm:rounded-lg bg-white border border-black/10 rounded-lg opacity-100">
        <div className="pl-[20px] pr-[20px]">
          {/* Users Heading Section */}
          {/* <span className="text-[18px] text-[#1E1E1E] font-[500]">Users</span> */}

          <div className="flex mt-5 justify-between items-center">
            {/* <SearchField /> */}
            <div>
              <SearchField
                handleSearchChange={handleSearchChange}
                searchQuery={searchQuery}
              />
            </div>
            <div className="flex w-full gap-3 justify-end items-center">
              <button
                className="flex items-center gap-[10px] h-max text-nowrap rounded-[10px] border border-custom-gray p-2.5 py-1.5 text-[14px] text-[#1E1E1E] hover:bg-custom-gradient-green hover:text-white group"
                onClick={() => setShowUserModal(!showUserModal)}
              >
                <PlusIcon />
                Add User
              </button>
            </div>
          </div>
        </div>

        <div className="table-height mt-5">
          <MyTable
            columns={columns}
            data={users}
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            totalCount={10}
            columnToOrderByProperty={userColumnToOrderByProperty}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            orderByProperty={orderByProperty}
            setOrderByProperty={setOrderByProperty}
          />
        </div>

        {showUserModal && (
          <UserModal
            title={`${selectedUser ? "Edit User" : "Add User"}`}
            description="Please log in to ask more questions."
            onClose={closeModal}
            addUserMutation={addUserMutation}
            editUserMutation={editUserMutation}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagement;
