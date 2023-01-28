import { axiosInstance } from "../../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/constants";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utils";
import { getStoredUser } from "../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getBank() {
  const data = await axiosInstance({
    url: "/api/obl/admin/Bank",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });

  return data?.data?.data;
}

const createBank = async (formData) => {
  const data = await axiosInstance({
    url: "/api/obl/admin/Bank",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

const updateBank = async (formData) => {
  const data = await axiosInstance({
    url: `/api/obl/admin/Bank/${formData["bankCode"]}`,
    method: "PATCH",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

const deleteBank = async (formData) => {
  const data = await axiosInstance({
    url: `/api/obl/admin/Bank/${formData}`,
    method: "DELETE",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

export function useBank() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.bank],
    queryFn: () => getBank(),
    onError: (error) => {
      const err = error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return data;
}

export function useCreateBank() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => createBank(formData),
    onSuccess: (data) => {
      toast.success("Bank Created Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.bank]);
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

export function useUpdateBank() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => updateBank(formData),
    onSuccess: (data) => {
      toast.success("Bank Updated Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.bank]);
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

export function useDeleteBank() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => deleteBank(formData),
    onSuccess: (data) => {
      toast.success("Bank Deleted Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.bank]);
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
