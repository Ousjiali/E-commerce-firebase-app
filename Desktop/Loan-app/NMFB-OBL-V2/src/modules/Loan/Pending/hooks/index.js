import { axiosInstance } from "../../../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../react-query/constants";
import { toast } from "react-toastify";
import { toastOptions } from "../../../../utils";
import { getStoredUser } from "../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getPending() {
  const data = await axiosInstance({
    url: "/api/obl/admin/Loan/AwaitingApprovalLoan",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });

  return data?.data?.data;
}

async function getSinglePending(loanCode) {
  const data = await axiosInstance({
    url: `/api/obl/admin/Loan/${loanCode}/single`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });

  return data?.data?.data;
}

async function approveLoan(formData) {
  const data = await axiosInstance({
    url: `/api/obl/admin/Loan/${formData["code"]}`,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });

  return data?.data?.data;
}
async function getSummary(loanCode) {
  const data = await axiosInstance({
    url: `/api/obl/admin/Loan/${loanCode}/BankAccountSummary`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });

  return data?.data?.data;
}

export function usePendingLoan() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.pending],
    queryFn: () => getPending(),
    onError: (error) => {
      const err = error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return data;
}

export function useSinglePendingLoan(loanCode) {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.pending, loanCode],
    queryFn: () => getSinglePending(loanCode),
    onError: (error) => {
      const err = error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return data;
}

export function useSummary(loanCode) {
  const fallback = [];
  const { data = fallback, refetch } = useQuery({
    enabled: false,
    queryKey: [queryKeys.summary],
    queryFn: () => getSummary(loanCode),
    onError: (error) => {
      const err = error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return { data, refetch };
}

export function useApproveLoan() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => approveLoan(formData),
    onSuccess: (data) => {
      toast.success("Success", toastOptions);
      queryClient.invalidateQueries([queryKeys.pending]);
    },
    onError: (error) => {
      const err = error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return { mutate, isSuccess, reset };
}
