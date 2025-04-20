import { Api } from "@/commons/api/api";
import { useQuery } from "@tanstack/react-query";

const api = Api.getInstance().getAxiosInstance();

export const useTreatments = () => {
  return useQuery({
    queryKey: ["treatments"],
    queryFn: () => api.get("/treatment").then((res) => res.data.data),
  });
};
