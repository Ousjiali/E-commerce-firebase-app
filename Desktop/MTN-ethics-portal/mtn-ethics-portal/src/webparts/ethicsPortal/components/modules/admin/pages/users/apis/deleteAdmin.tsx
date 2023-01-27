import { sp } from "@pnp/sp";

export const deleteAdmin = async (adminId: string) => {
  try {
    await sp.web.lists
      .getByTitle("Admin")
      .items.getItemByStringId(adminId)
      .delete();
    return true;
  } catch (e) {
    return e.message;
  }
};
