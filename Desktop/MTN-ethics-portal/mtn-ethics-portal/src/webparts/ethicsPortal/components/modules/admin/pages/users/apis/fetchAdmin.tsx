import { sp } from "@pnp/sp";

export const fetchAdmins = async () => {
  try {
    const res = await sp.web.lists.getByTitle("Admin").items.getAll();
    return res;
  } catch (err) {
    return err.message;
  }
};
