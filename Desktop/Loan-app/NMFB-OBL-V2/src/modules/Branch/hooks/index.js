import { axiosInstance } from "../../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/constants";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utils";
import { getStoredUser } from "../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getBranch() {
  const data = await axiosInstance({
    url: "/api/obl/admin/Branch",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });

  return data?.data?.data;
}

const createBranch = async (formData) => {
  const data = await axiosInstance({
    url: "/api/obl/admin/Branch",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

const updateBranch = async (formData) => {
  const data = await axiosInstance({
    url: `/api/obl/admin/Branch/${formData["code"]}`,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

const deleteBranch = async (formData) => {
  const data = await axiosInstance({
    url: `/api/obl/admin/Branch/${formData}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

export function useBranch() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.branch],
    queryFn: () => getBranch(),
    onError: (error) => {
      const err = error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return data;
}

export function useCreateBranch() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => createBranch(formData),
    onSuccess: (data) => {
      toast.success("Branch Created Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.branch]);
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

export function useUpdateBranch() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => updateBranch(formData),
    onSuccess: (data) => {
      toast.success("Branch Updated Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.branch]);
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

export function useDeleteBranch() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => deleteBranch(formData),
    onSuccess: (data) => {
      toast.success("Branch Deleted Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.branch]);
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
