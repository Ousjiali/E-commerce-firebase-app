import { axiosInstance } from "../../../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../react-query/constants";
import { toast } from "react-toastify";
import { toastOptions } from "../../../../utils";
import { getStoredUser } from "../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getDocument() {
  const data = await axiosInstance({
    url: "/api/obl/admin/Document",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });

  return data?.data?.data;
}

const createDocument = async (formData) => {
  const data = await axiosInstance({
    url: "/api/obl/admin/Document",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

const updateDocument = async (formData) => {
  const data = await axiosInstance({
    url: `/api/obl/admin/Document/${formData["code"]}`,
    method: "PATCH",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

const deleteDocument = async (formData) => {
  const data = await axiosInstance({
    url: `/api/obl/admin/Document/${formData}`,
    method: "DELETE",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

export function useDocument() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.document],
    queryFn: () => getDocument(),
    onError: (error) => {
      const err = error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return data;
}

export function useCreateDocument() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => createDocument(formData),
    onSuccess: (data) => {
      toast.success("Document Created Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.document]);
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

export function useUpdateDocument() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => updateDocument(formData),
    onSuccess: (data) => {
      toast.success("Document Updated Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.document]);
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

export function useDeleteDocument() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => deleteDocument(formData),
    onSuccess: (data) => {
      toast.success("Document Deleted Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.document]);
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
