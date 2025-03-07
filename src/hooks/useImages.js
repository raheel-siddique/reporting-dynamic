import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchImages, uploadImage } from "../api/imageService";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";

export const useImages = (tenantDetails) => {
  // console.log("tenantDetails:::", tenantDetails?.idImages);

  const [imagePaths, setImagePaths] = useState([]);
  const [fetchedImages, setFetchedImages] = useState([]);
  const [uploadingImages, setUploadingImages] = useState([]);
  const tempImageRef = useRef(null);

  useEffect(() => {
    if (tenantDetails?.idImages) {
      const paths = tenantDetails.idImages
        .split(",")
        .map((path) => path.trim());
      setImagePaths(paths);
    }
  }, [tenantDetails]);

  const {
    data,
    isLoading: isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["images", imagePaths],
    queryFn: async () => {
      const fetchedData = await Promise.all(
        imagePaths.map(async (path) => {
          const imageData = await fetchImages({
            queryKey: ["images", { uploadedPath: path }],
          });

          const fileType = path.endsWith(".pdf")
            ? "application/pdf"
            : "image/jpeg";
          const blob = new Blob([new Uint8Array(imageData)], {
            type: fileType,
          });
          return { blobUrl: URL.createObjectURL(blob), fileType };
        })
      );
      return fetchedData;
    },
    enabled: imagePaths.length > 0,
    onSuccess: (data) => {
      console.log("Fetched files:", data);
      setFetchedImages(data);
    },
    onError: (error) => {
      console.error("Failed to fetch files:", error);
      toast.error("Failed to fetch files.", { position: "top-center" });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setFetchedImages(data);
    }
  }, [isSuccess]);

  const { mutate: uploadImageMutation, isLoading: isUploading } = useMutation({
    mutationFn: (file) => uploadImage(file),

    onMutate: (file) => {
      const tempImageURL = URL.createObjectURL(file);
      tempImageRef.current = tempImageURL;
      setUploadingImages((prevImages) => [...prevImages, tempImageURL]);
    },
    onSuccess: (response) => {
      toast.success("uploaded successfully!", { position: "top-center" });

      const uploadedPath = response?.message;
      console.log("Uploaded Path:", uploadedPath);

      setImagePaths((prevImages) => [...prevImages, uploadedPath]);

      setUploadingImages((prevImages) =>
        prevImages.filter((img) => img !== tempImageRef.current)
      );
    },
    onError: (error) => {
      console.error("Failed to upload image:", error);
      toast.error(`${error.response?.data?.message || "Upload failed"}`, {
        position: "top-center",
      });

      setUploadingImages((prevImages) =>
        prevImages.filter((img) => img !== tempImageRef.current)
      );
    },
  });

  const deleteIdImg = (index) => {
    const updatedFetchedImages = [...fetchedImages];
    updatedFetchedImages.splice(index, 1);
    setFetchedImages(updatedFetchedImages);

    const updatedImagePaths = [...imagePaths];
    updatedImagePaths.splice(index, 1);
    setImagePaths(updatedImagePaths);
  };
  return {
    uploadImageMutation,
    isUploading,
    setImagePaths,
    imagePaths,
    fetchedImages,
    isFetching,
    fetchedImages,
    deleteIdImg,
    uploadingImages,
  };
};
