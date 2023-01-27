import { sp } from "@pnp/sp";
import { StaffData } from "../components/PeoplePicker";
import { User } from "../forms/UserForm";

export const updateAdmin = async (adminId: string, data: StaffData) => {
  try {
    const res = await sp.web.lists
      .getByTitle("Admin")
      .items.getById(Number(adminId))
      .update({
        StaffName: data?.DisplayName,
        StaffEmail: data?.Email,
      });
    return res.data;
  } catch (err) {
    return err;
  }
};
