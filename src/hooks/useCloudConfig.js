
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  addAgentServ, addCloudConfig, fetchInstances, fetchInstanceSpec, fetchProviders, fetchRegions } from "../api/cloudService";

import { toast } from "react-toastify";

export const useCloudConfig = (

) => {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: [
      "providers",
     
    ],
    queryFn: fetchProviders,
    keepPreviousData: true,
    staleTime: 5000,
  });

 const { data:instanceData } = useQuery({
    queryKey: [
      "instances",
     
    ],
    queryFn: fetchInstances,
    keepPreviousData: true,
    staleTime: 5000,
  });


//   const { data: instanceSpecData, isPending: isSpecLoading } = useQuery({
//   queryKey: ["instanceSpec", { instanceId, day, duration }],
//   queryFn: () =>
//     fetchInstanceSpec({
//       instanceId,
//       day,
//       duration,
//     }),
//   enabled: !!instanceId, // jab instanceId ho tabhi call chale
//   staleTime: 5000,
// });


  const { data:regionsData } = useQuery({
    queryKey: [
      "regions",
     
    ],
    queryFn: fetchRegions,
    keepPreviousData: true,
    staleTime: 5000,
  });

 
  console.log("data:::", data)

  const { mutate:createCloudConfig, isLoading: isAddingConfig } = useMutation({
    mutationFn: addCloudConfig,
    onSuccess: () => {
      toast.success("Cloud config added successfully!", { position: "top-center" });
      queryClient.invalidateQueries(["clouds"]);
    },
    onError: (error) => {
      console.error("Failed to add clouds:", error);
      toast.error(`${error.response.data.message}`, { position: "top-center" });
    },
  });


    const { mutateAsync: addAgent} = useMutation({
      mutationFn: addAgentServ,
      onSuccess: () => {
        toast.success("agent added successfully!", { position: "top-center" });
              queryClient.invalidateQueries(["clouds"]);

      },
      onError: (error) => {
        console.error("Failed to add agent:", error);
        toast.error(`${error.response.data.message}`, { position: "top-center" });
      },
    });
  

  return {
   
    createCloudConfig,
    providersData:data,
    isAddingConfig,
    regionsData,
    instanceData,
      // instanceSpecData, 
    addAgent     
   
  };
};
