import { useImages } from "../../../hooks/useImages";
import CustomImageUploader from "../../../components/img/CustomImageUploader";
import { useState } from "react";
import { useLeaseDocumentImages } from "../../../hooks/useLeaseImages";

const AddLeaseDocModal = ({
  setShowLeasesDocModal,
  selectedLease,
  handleUploadLeaseDocs,
  handleFileChangeLease,
  deleteLeaseDocument,
  fetchedDocuments,
  uploadingDocuments,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (img) => {
    setSelectedImage(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 bg-[#1E1E1E33] left-0 right-0 z-50 w-full p-3 overflow-x-hidden overflow-y-auto flex justify-center items-center h-screen">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 border-b border-custom-gray rounded-t-[10px]">
              <div></div>
              <h3 className="text-base font-semibold text-[#1E1E1E]">
                Upload Lease Contract
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowLeasesDocModal(false);
                }}
                className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div>
              <CustomImageUploader
                id="lease-images"
                handleFileChange={handleFileChangeLease}
                fetchedImages={fetchedDocuments}
                uploadingImages={uploadingDocuments}
                modalOpen={modalOpen}
                openModal={openModal}
                closeModal={closeModal}
                selectedImage={selectedImage}
                deleteIdImg={deleteLeaseDocument}
                postionImages={"right"}
                btnText={"Upload File"}
                descText={"No files uploaded yet."}
                imageWidth={"150px"}
              />
            </div>
            <div className="flex justify-center items-center p-4 gap-4 border-t border-custom-gray rounded-[10px]">
              <button
                type="button"
                onClick={() => {
                  setShowLeasesDocModal(false);
                }}
                className="text-sm w-[66px] border border-custom-gray text-[#1E1E1E] hover:text-white hover:bg-custom-gradient-red py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadLeaseDocs}
                type="submit"
                className="text-sm w-[66px] bg-custom-gradient-green text-white py-2 px-3 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLeaseDocModal;
