import { axiosInstance } from "../../../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../react-query/constants";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utils";
import { getStoredUser } from "../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getAudit() {
  const data = await axiosInstance({
    url: "/api/obl/admin/Audit",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });

  return data?.data?.data;
}

export function useAudit() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.audit],
    queryFn: () => getAudit(),
    onError: (error) => {
      const err = error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return data;
}
