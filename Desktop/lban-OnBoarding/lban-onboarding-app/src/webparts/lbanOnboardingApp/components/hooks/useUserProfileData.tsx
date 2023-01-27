import { sp } from "@pnp/sp";
import { useQuery } from "@tanstack/react-query";
import { dataTool } from "echarts";

const fetchUserData = async () => {
  try {
    const res = await sp.profiles.myProperties.get();
    return res;
  } catch (error) {
    return error;
  }
};
export const getUserProfileData = () => {
  const { data, isLoading, isError, isFetching } = useQuery(
    ["user-profile-data"],
    fetchUserData,
    {
      select: (data) => {
        const userDatas = data;
        return userDatas;
      },
    }
  );
  return { data, isLoading, isError, isFetching };
};

const fetchStaffData = async () => {
  try {
    const response = await sp.profiles.myProperties.get();
    console.log(response);
    const res = await sp.web.lists
      .getByTitle("StaffProfile")
      .items.filter(`StaffEmail eq '${response?.Email}'`)
      .get();
    const Biodata = JSON.parse(res[0].Biodata);
    return Biodata;
  } catch (error) {
    return error;
  }
};
export const getStaffData = () => {
  const { data, isLoading, isError, isFetching } = useQuery(
    ["staff-profile-data"],
    fetchStaffData,
    {
      select: (data) => {
        const staffDatas = data;
        return staffDatas;
      },
    }
  );
  return { data, isLoading, isError, isFetching };
};

const fetchStaffID = async () => {
  try {
    const response = await sp.profiles.myProperties.get();
    console.log(response);
    const res = await sp.web.lists
      .getByTitle("StaffProfile")
      .items.filter(`StaffEmail eq '${response?.Email}'`)
      .get();
    const staffID = res[0].ID;
    return staffID;
  } catch (error) {
    return error;
  }
};

export const getStaffID = () => {
  const { data, isLoading, isError, isFetching } = useQuery(
    ["staff-ID"],
    fetchStaffID,
    {
      select: (data) => {
        const staffDatas = data;

        return staffDatas;
      },
    }
  );
  return { data, isLoading, isError, isFetching };
};
