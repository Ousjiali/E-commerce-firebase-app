import { axiosInstance } from "../../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/constants";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utils";
import { getStoredUser } from "../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getGroup() {
  const data = await axiosInstance({
    url: "/api/obl/adminGroupConfiguration",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });

  return data?.data?.data;
}

const createGroup = async (formData) => {
  const data = await axiosInstance({
    url: "/api/obl/adminGroupConfiguration",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

const updateGroup = async (formData) => {
  const data = await axiosInstance({
    url: `/api/obl/adminGroupConfiguration/${formData["code"]}`,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

const deleteGroup = async (formData) => {
  const data = await axiosInstance({
    url: `/api/obl/adminGroupConfiguration/${formData}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

export function useGroup() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.group],
    queryFn: () => getGroup(),
    onError: (error) => {
      const err = error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return data;
}

export function useCreateGroup() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => createGroup(formData),
    onSuccess: (data) => {
      toast.success("Group Created Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.group]);
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

export function useUpdateGroup() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => updateGroup(formData),
    onSuccess: (data) => {
      toast.success("Group Updated Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.group]);
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

export function useDeleteGroup() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => deleteGroup(formData),
    onSuccess: (data) => {
      toast.success("Group Deleted Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.group]);
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
