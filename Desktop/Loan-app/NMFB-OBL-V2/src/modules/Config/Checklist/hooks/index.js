import { axiosInstance } from "../../../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../react-query/constants";
import { toast } from "react-toastify";
import { toastOptions } from "../../../../utils";
import { getStoredUser } from "../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getChecklist() {
  const data = await axiosInstance({
    url: "/api/obl/admin/CheckList",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });

  return data?.data?.data;
}

const createChecklist = async (formData) => {
  const data = await axiosInstance({
    url: "/api/obl/admin/CheckList",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

const updateChecklist = async (formData) => {
  const data = await axiosInstance({
    url: `/api/obl/admin/CheckList/${formData["code"]}`,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

const deleteChecklist = async (formData) => {
  const data = await axiosInstance({
    url: `/api/obl/admin/CheckList/${formData}`,
    method: "DELETE",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

export function useChecklist() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.checklist],
    queryFn: () => getChecklist(),
    onError: (error) => {
      const err = error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return data;
}

export function useCreateChecklist() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => createChecklist(formData),
    onSuccess: (data) => {
      toast.success("Checklist Created Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.checklist]);
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

export function useUpdateChecklist() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => updateChecklist(formData),
    onSuccess: (data) => {
      toast.success("Checklist Updated Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.checklist]);
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

export function useDeleteChecklist() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => deleteChecklist(formData),
    onSuccess: (data) => {
      toast.success("Checklist Deleted Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.checklist]);
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
