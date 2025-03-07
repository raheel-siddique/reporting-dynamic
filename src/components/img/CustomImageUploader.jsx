import { useState } from "react";

const CustomImageUploader = ({
  handleFileChange = () => {},
  uploadingImages = [],
  fetchedImages = [],
  modalOpen = false,
  openModal = () => {},
  closeModal = () => {},
  selectedImage = "",
  deleteIdImg = () => {},
  postionImages = "top",
  btnText = "Upload Image",
  imageWidth = "100px",
  id = "file-upload",
  descText = "No images uploaded yet.",
  hideUploader = false,
}) => {
  const [selectImage, setSelectImage] = useState(null);

  return (
    <div className="p-4">
      {!hideUploader && (
        <div
          className={`${
            postionImages === "bottom"
              ? "flex-col"
              : "gap-4 items-center mb-2 justify-center"
          } flex`}
        >
          {/* Upload Button */}
          <div className="mb-2 w-max">
            <label
              htmlFor={id}
              className="flex gap-3 text-nowrap items-center cursor-pointer p-2 px-2.5 rounded-md border bg-custom-gradient-green active:bg-custom-gradient-green"
            >
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
                    stroke="#ffff"
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
                    stroke="#ffff"
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
                    stroke="#ffff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                </g>
              </svg>
              <h2 className="text-[14px] text-white">{btnText}</h2>
              <input
                id={id}
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {uploadingImages.length + fetchedImages.length > 0 ? (
          [...uploadingImages, ...fetchedImages].map((file, index) => (
            <div
              key={index}
              className="relative flex group border-custom-green border rounded-lg overflow-hidden"
            >
              {file?.fileType === "application/pdf" ? (
                <div className="flex gap-2 items-center h-full px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14.833"
                    height="17.5"
                    viewBox="0 0 14.833 17.5"
                  >
                    <g
                      id="Group_25491"
                      data-name="Group 25491"
                      transform="translate(-7354.25 322.75)"
                    >
                      <path
                        id="Path_38703"
                        data-name="Path 38703"
                        d="M14,3V6.556a.889.889,0,0,0,.889.889h3.556"
                        transform="translate(7349 -325)"
                        fill="none"
                        stroke="#1e1e1e"
                        className="stroke-[#1E1E1E]"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_38704"
                        data-name="Path 38704"
                        d="M5,11V4.778A1.778,1.778,0,0,1,6.778,3H13l4.444,4.444V11"
                        transform="translate(7350 -325)"
                        fill="none"
                        stroke="#1e1e1e"
                        className="stroke-[#1E1E1E]"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_38705"
                        data-name="Path 38705"
                        d="M5,17.667H6.333a1.333,1.333,0,1,0,0-2.667H5v5.333"
                        transform="translate(7350 -326.333)"
                        fill="none"
                        stroke="#1e1e1e"
                        className="stroke-[#1E1E1E]"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_38706"
                        data-name="Path 38706"
                        d="M17,18h1.778"
                        transform="translate(7348.667 -326.667)"
                        fill="none"
                        stroke="#1e1e1e"
                        className="stroke-[#1E1E1E]"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_38707"
                        data-name="Path 38707"
                        d="M19.667,15H17v5.333"
                        transform="translate(7348.667 -326.333)"
                        fill="none"
                        stroke="#1e1e1e"
                        className="stroke-[#1E1E1E]"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <path
                        id="Path_38708"
                        data-name="Path 38708"
                        d="M11,15v5.333h.889a1.778,1.778,0,0,0,1.778-1.778V16.778A1.778,1.778,0,0,0,11.889,15Z"
                        transform="translate(7349.333 -326.333)"
                        fill="none"
                        stroke="#1e1e1e"
                        className="stroke-[#1E1E1E]"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                    </g>
                  </svg>
                  <a
                    href={file?.blobUrl}
                    download={`Document_${index + 1}.pdf`}
                    className="text-custom-green text-sm underline"
                  >
                    Download PDF
                  </a>
                </div>
              ) : (
                <img
                  src={file?.blobUrl || ""}
                  alt={`Uploaded ${index + 1}`}
                  className="object-cover"
                  style={{ width: imageWidth, aspectRatio: "16/9" }}
                />
              )}

              {!hideUploader && (
                <button
                  type="button"
                  onClick={() => deleteIdImg(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {/* Delete Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.722"
                    height="16"
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
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Path_75"
                        data-name="Path 75"
                        d="M5,7l.889,10.667a1.778,1.778,0,0,0,1.778,1.778h7.111a1.778,1.778,0,0,0,1.778-1.778L17.444,7"
                        transform="translate(1264.889 51.556)"
                        fill="none"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                      <path
                        id="Path_76"
                        data-name="Path 76"
                        d="M9,6.556V3.889A.889.889,0,0,1,9.889,3h3.556a.889.889,0,0,1,.889.889V6.556"
                        transform="translate(1264.444 52)"
                        fill="none"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </g>
                  </svg>
                </button>
              )}

              {/* View Icon */}
              {file?.fileType !== "application/pdf" && (
                <button
                  type="button"
                  onClick={() => {
                    openModal(file?.blobUrl);
                    setSelectImage(file?.blobUrl);
                  }}
                  className={` ${!hideUploader ? 'right-10': 'right-2'} absolute top-2 bg-blue-500 text-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.5"
                    height="16.5"
                    fill="currentColor"
                    className="bi bi-eye"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM8 4.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" />
                    <path d="M8 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                  </svg>
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">{descText}</p>
        )}
      </div>

      {/* Modal */}
      {(modalOpen || selectImage) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => {
            closeModal();
            setSelectImage(null);
          }}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg max-w-[600px] max-h-[600px]"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <div className="overflow-y-auto max-h-[500px]">
              <img
                src={selectedImage || selectImage || ""}
                alt="Selected"
                className="h-auto rounded-md"
              />
            </div>
            <div className="items-center justify-center mt-2 flex w-full">
              <button
                type="button"
                className="mt-4 bg-red-500 text-white mr-2 px-4 py-2 rounded-lg"
                onClick={() => {
                  closeModal();
                  setSelectImage(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomImageUploader;
