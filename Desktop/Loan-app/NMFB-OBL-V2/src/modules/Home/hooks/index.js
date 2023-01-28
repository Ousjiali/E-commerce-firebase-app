import { axiosInstance } from "../../../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context";
import { setStoredUser } from "../../../storage";
import { toastOptions } from "../../../utils";

const SERVER_ERROR = "There was an error contacting the server.";

const userLogin = async (formData) => {
  const data = await axiosInstance({
    url: "/api/obl/admin/AdminUser/Login",
    method: "POST",
    data: { accessToken: formData },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export function useLogin() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset } = useMutation({
    mutationFn: (formData) => userLogin(formData),
    onSuccess: (data) => {
      toast.success("Login Successful", toastOptions);
      setStoredUser(data.data);
      authCtx.authenticate(data.data);
      queryClient.invalidateQueries([queryKeys.user]);
      navigate("/");
    },
    onError: (error) => {
      console.log(error, "query");
      const err = error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return { mutate, isSuccess, reset };
}
