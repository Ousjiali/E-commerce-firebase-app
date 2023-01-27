import { sp } from "@pnp/sp";

export const getAssignedStaff = async (staffEmail: string) => {
  try {
    const staff = await sp.web.lists
      .getByTitle("StaffProfile")
      .items.filter(`StaffEmail eq '${staffEmail}'`)
      .get();
    return staff;
  } catch (e) {
    return e;
  }
};
