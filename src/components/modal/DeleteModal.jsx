import React from "react";
const DeleteModal = ({
  title,
  onClose,
  deleteMutation,
  deleteId,
  setShowDltModal,
  hideDltIcon = false,
}) => {
  const mutationCalled = () => {
    deleteMutation(deleteId);
    setShowDltModal(false);
  };
  return (
    <div className="fixed cursor-auto top-0 bg-[#1E1E1E33] left-0 right-0 z-50 w-full p-3 overflow-x-hidden overflow-y-auto flex justify-center items-center h-screen">
      <div className="w-[300px] relative">
        <div className="relative bg-white rounded-lg shadow">
          <div className="p-5 text-center">
            {!hideDltIcon && (
              <svg
                className="m-auto"
                xmlns="http://www.w3.org/2000/svg"
                width="23.397"
                height="26"
                viewBox="0 0 23.397 26"
              >
                <g
                  id="Group_23344"
                  data-name="Group 23344"
                  transform="translate(-707.001 -453)"
                >
                  <path
                    id="Path_38331"
                    data-name="Path 38331"
                    d="M25.1,6a1.3,1.3,0,0,1,.152,2.591L25.1,8.6h-.105L23.8,22.9a3.9,3.9,0,0,1-3.671,3.894L19.9,26.8H9.5a3.882,3.882,0,0,1-3.89-3.575L5.6,23.008,4.4,8.6H4.3a1.3,1.3,0,0,1-.152-2.591L4.3,6H25.1Z"
                    transform="translate(704 452.2)"
                    fill="#d82323"
                  />
                  <path
                    id="Path_38332"
                    data-name="Path 38332"
                    d="M15.8,2a2.6,2.6,0,0,1,2.6,2.6,1.3,1.3,0,0,1-2.591.152L15.8,4.6H10.6l-.009.152A1.3,1.3,0,0,1,8,4.6a2.6,2.6,0,0,1,2.405-2.593L10.6,2Z"
                    transform="translate(705.5 451)"
                    fill="#d82323"
                  />
                </g>
              </svg>
            )}
            <h3 className="text-[14px] text-[#1E1E1E] mt-5">{title}</h3>
          </div>
          <div className="flex justify-center items-center p-4 gap-4 border-t border-custom-gray rounded-[10px]">
            <button
              type="button"
              onClick={() => setShowDltModal(false)}
              className="text-sm w-[66px] border border-custom-gray text-[#1E1E1E] hover:text-white hover:bg-custom-gradient-red group cursor-pointer py-2 px-3 rounded-md"
            >
              No
            </button>
            <button
              onClick={mutationCalled}
              type="button"
              className="text-sm w-[66px] cursor-pointer p-2 rounded-md border text-white bg-custom-gradient-green active:bg-custom-gradient-green"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
