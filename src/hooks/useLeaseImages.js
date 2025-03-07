import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchImages, uploadImage } from "../api/imageService";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";

export const useLeaseDocumentImages = () => {
  const [documentPaths, setDocumentPaths] = useState([]);
  const [fetchedDocuments, setFetchedDocuments] = useState([]);
  const [uploadingDocuments, setUploadingDocuments] = useState([]);
  const tempDocumentRef = useRef(null);


  const {
    data,
    isLoading: isFetchingDocuments,
    isSuccess: isDocumentsFetched,
  } = useQuery({
    queryKey: ["leaseDocuments", documentPaths],
    queryFn: async () => {
      const fetchedData = await Promise.all(
        documentPaths.map(async (path) => {
          const documentData = await fetchImages({
            queryKey: ["leaseDocuments", { uploadedPath: path }],
          });

          const fileType = path.endsWith(".pdf")
            ? "application/pdf"
            : "image/jpeg";
          const blob = new Blob([new Uint8Array(documentData)], {
            type: fileType,
          });
          return { blobUrl: URL.createObjectURL(blob), fileType };
        })
      );
      return fetchedData;
    },
    enabled: documentPaths.length > 0,
    onSuccess: (data) => {
      console.log("Fetched lease documents:", data);
      setFetchedDocuments(data);
    },
    onError: (error) => {
      console.error("Failed to fetch lease documents:", error);
      toast.error("Failed to fetch lease documents.", {
        position: "top-center",
      });
    },
  });

  useEffect(() => {
    if (isDocumentsFetched) {
      setFetchedDocuments(data);
    }
  }, [isDocumentsFetched]);

  const {
    mutate: uploadLeaseDocument,
    isLoading: isUploadingDocument,
    isSuccess,
  } = useMutation({
    mutationFn: (file) => uploadImage(file),

    onMutate: (file) => {
      const tempDocumentURL = URL.createObjectURL(file);
      tempDocumentRef.current = tempDocumentURL;
      setUploadingDocuments((prevDocuments) => [
        ...prevDocuments,
        tempDocumentURL,
      ]);
    },
    onSuccess: (response) => {
      toast.success("Lease document uploaded successfully!", {
        position: "top-center",
      });

      const uploadedPath = response?.message;
      console.log("Uploaded Lease Document Path:", uploadedPath);

      setDocumentPaths((prevDocuments) => [...prevDocuments, uploadedPath]);

      setUploadingDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc !== tempDocumentRef.current)
      );
    },
    onError: (error) => {
      console.error("Failed to upload lease document:", error);
      toast.error(`${error.response?.data?.message || "Upload failed"}`, {
        position: "top-center",
      });

      setUploadingDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc !== tempDocumentRef.current)
      );
    },
  });

  const clearData = () => {
    setFetchedDocuments([]);
    setDocumentPaths([]);
    setUploadingDocuments([]);
  }

  const deleteLeaseDocument = (index) => {
    const updatedFetchedDocuments = [...fetchedDocuments];
    updatedFetchedDocuments.splice(index, 1);
    setFetchedDocuments(updatedFetchedDocuments);

    const updatedDocumentPaths = [...documentPaths];
    updatedDocumentPaths.splice(index, 1);
    setDocumentPaths(updatedDocumentPaths);
  };

  return {
    uploadLeaseDocument,
    isUploadingDocument,
    setDocumentPaths,
    documentPaths,
    fetchedDocuments,
    clearData,
    isFetchingDocuments,
    deleteLeaseDocument,
    uploadingDocuments,
    isSuccess,
  };
};
