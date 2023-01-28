import { axiosInstance } from "../../../../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../react-query/constants";
import { toast } from "react-toastify";
import { toastOptions } from "../../../../utils";
import { getStoredUser } from "../../../../storage";

const SERVER_ERROR = "There was an error contacting the server.";

async function getDeclined() {
  const data = await axiosInstance({
    url: "/api/obl/admin/Loan/Declined",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredUser().jwtToken}`,
    },
  });

  return data?.data?.data;
}

export function useDeclinedLoan() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.declined],
    queryFn: () => getDeclined(),
    onError: (error) => {
      const err = error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : SERVER_ERROR;
      toast.error(err, toastOptions);
    },
  });
  return data;
}
