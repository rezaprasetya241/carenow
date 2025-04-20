import { Api } from "@/commons/api/api";
import { ReqTransactionType } from "@/data/types/transaction/transactionType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const api = Api.getInstance().getAxiosInstance();

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReqTransactionType) =>
      api.post("/transaction", data, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
