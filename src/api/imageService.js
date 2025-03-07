import axiosInstance from "./axiosInstance";

// Fetch images (handles streaming responses)
export const fetchImages = async ({ queryKey }) => {
  const [, { uploadedPath }] = queryKey; // Extract fileName from queryKey

  console.log("uploadedPath:", uploadedPath); // Log for debugging

  // Ensure uploadedPath is a string and encode it properly
  const fileNameString = String(uploadedPath);
  const encodedFileName = encodeURIComponent(fileNameString);

  console.log("Encoded file path:", encodedFileName); // Log for debugging

  try {
    const response = await axiosInstance.get(
      `/api/Storage/download-file-stream/${encodedFileName}`,
      {
        responseType: "arraybuffer", // Request the response as an ArrayBuffer
      }
    );

    return response?.data;
  } catch (error) {
    console.error("Failed to fetch images:", error);
    throw error; // Re-throw for error handling in the calling code
  }
};

// Upload image (improved error handling)
export const uploadImage = async (file, folder = "tenants/image") => {
  try {
    const formData = new FormData();
    formData.append("File", file); // Ensure field name matches API
    formData.append("Folder", folder); // Optional 'Folder' field

    const response = await axiosInstance.post(
      "/api/Storage/upload-file",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error; // Re-throw for error handling in the calling code
  }
};

// Delete image (no changes required)
export const deleteImage = async (id) => {
  const response = await axiosInstance.delete(`/api/Blobs/${id}`);
  return response.data;
};
