import { Api } from "@/commons/api/api";
import { useQuery } from "@tanstack/react-query";

const api = Api.getInstance().getAxiosInstance();

export const useMedications = () => {
  return useQuery({
    queryKey: ["medications"],
    queryFn: () => api.get("/medication").then((res) => res.data.data),
  });
};
