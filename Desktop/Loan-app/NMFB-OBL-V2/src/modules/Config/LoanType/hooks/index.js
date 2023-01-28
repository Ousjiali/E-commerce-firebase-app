import { axiosInstance } from "../../../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../react-query/constants";
import { toast } from "react-toastify";
import { toastOptions } from "../../../../utils";
import { getStoredUser } from "../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getLoanType() {
  const data = await axiosInstance({
    url: "/api/obl/admin/LoanType",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });

  return data?.data?.data;
}

const createLoanType = async (formData) => {
  const data = await axiosInstance({
    url: "/api/obl/admin/LoanType",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

const updateLoanType = async (formData) => {
  const data = await axiosInstance({
    url: `/api/obl/admin/LoanType/${formData["code"]}`,
    method: "PATCH",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

const deleteLoanType = async (formData) => {
  const data = await axiosInstance({
    url: `/api/obl/admin/LoanType/${formData}`,
    method: "DELETE",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

export function useLoanType() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.loanType],
    queryFn: () => getLoanType(),
    onError: (error) => {
      const err = error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return data;
}

export function useCreateLoanType() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => createLoanType(formData),
    onSuccess: (data) => {
      toast.success("Loan Type Created Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.loanType]);
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

export function useUpdateLoanType() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => updateLoanType(formData),
    onSuccess: (data) => {
      toast.success("Loan Type Updated Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.loanType]);
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

export function useDeleteLoanType() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => deleteLoanType(formData),
    onSuccess: (data) => {
      toast.success("Loan Type Deleted Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.loanType]);
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
