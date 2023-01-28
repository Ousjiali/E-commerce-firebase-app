import { axiosInstance } from "../../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/constants";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utils";
import { getStoredUser } from "../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getAdmin() {
  const data = await axiosInstance({
    url: "/api/obl/admin/AdminUser",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });

  return data?.data?.data;
}

const createAdmin = async (formData) => {
  const data = await axiosInstance({
    url: "/api/obl/admin/AdminUser/Register",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

const updateAdmin = async (formData) => {
  const data = await axiosInstance({
    url: `/api/obl/admin/AdminUser/UpdateAdminRole/${formData["code"]}`,
    method: "PUT",
    data: formData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });
  return data;
};

// const deleteAdmin = async (formData) => {
//   const data = await axiosInstance({
//     url: `/api/obl/admin/Admin/${formData}`,
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${getStoredUser().jwtToken}`,
//     },
//   });
//   return data;
// };

export function useAdmin() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.admin],
    queryFn: () => getAdmin(),
    onError: (error) => {
      const err = error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return data;
}

export function useCreateAdmin() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => createAdmin(formData),
    onSuccess: (data) => {
      toast.success("Admin Created Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.admin]);
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

export function useUpdateAdmin() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => updateAdmin(formData),
    onSuccess: (data) => {
      toast.success("Admin Updated Successfully", toastOptions);
      queryClient.invalidateQueries([queryKeys.admin]);
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

// export function useDeleteAdmin() {
//   const queryClient = useQueryClient();
//   const { mutate, isSuccess, reset } = useMutation({
//     mutationFn: (formData) => deleteAdmin(formData),
//     onSuccess: (data) => {
//       toast.success("Admin Deleted Successfully", toastOptions);
//       queryClient.invalidateQueries([queryKeys.admin]);
//     },
//     onError: (error) => {
//       const err = error?.response?.data?.responseMessage
//         ? error?.response?.data?.responseMessage
//         : SERVER_ERROR;
//       toast.error(err, toastOptions);
//     },
//   });
//   return { mutate, isSuccess, reset };
// }
