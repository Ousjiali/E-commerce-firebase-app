import { sp } from "@pnp/sp";

export const DeleteDefaulters = async (id: number) => {
  return await sp.web.lists
    .getByTitle("EthicsDefaulters")
    .items.getById(id)
    .delete();
};
