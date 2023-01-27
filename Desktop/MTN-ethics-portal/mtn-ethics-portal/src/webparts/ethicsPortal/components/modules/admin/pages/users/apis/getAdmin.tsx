import { sp } from "@pnp/sp";

export const getAdmin = async (adminId: string) => {
  try {
    const res = await sp.web.lists
      .getByTitle("Admin")
      .items.getItemByStringId(adminId)
      .get();
    return res.data;
  } catch (err) {
    return err.message;
  }
};
