import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addBuilding, addLocation, deleteLocation, editLocation, fetchLocations } from "../api/locationService";
import { toast } from "react-toastify";

export const useMyLocations = (page, pageSize) => {
  const queryClient = useQueryClient();

  const {data, isPending} = useQuery({
    queryKey: ['locations', { page, pageSize }],
    queryFn: fetchLocations,
    keepPreviousData: true, // Retain old data during new fetches
    staleTime: 10 * 1000, // Data remains fresh for 10 seconds
    cacheTime: 5 * 60 * 1000, // Data remains in cache for 5 minutes       
  });



  const { mutate: deleteLocationMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {

        toast.success("Location deleted successful!", {
            position: "top-center",
          });
      queryClient.invalidateQueries(['locations']);

   
    },
    onError: (error) => {
      console.error('Failed to delete Location:', error);
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
      });
    },
  });


  const { mutate: addLocationMutation, isLoading: isAdding } = useMutation({
    mutationFn: addLocation,
    onSuccess: () => {
      toast.success("Location added successfully!", { position: "top-center" });
      queryClient.invalidateQueries(['locations']); // Refetch locations after addition
    },
    onError: (error) => {
      console.error('Failed to add location:', error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });

  const { mutate: addBuildingMutation, isLoading: isBuildAdding } = useMutation({
    mutationFn: addBuilding,
    onSuccess: () => {
      toast.success("Building added successfully!", { position: "top-center" });
      queryClient.invalidateQueries(['locations']); // Refetch locations after addition
    },
    onError: (error) => {
      console.error('Failed to add Building:', error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });


  const { mutate: editLocationMutation, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, name }) => editLocation(id, name),
    onSuccess: () => {
      toast.success("Location updated successfully!", { position: "top-center" });
      queryClient.invalidateQueries(['locations']); // Refetch locations after update
    },
    onError: (error) => {
      console.error('Failed to update location:', error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });
  
  return { locationsData:data, isLocationsLoading:isPending, deleteLocationMutation,addLocationMutation,addBuildingMutation, editLocationMutation };
};


;