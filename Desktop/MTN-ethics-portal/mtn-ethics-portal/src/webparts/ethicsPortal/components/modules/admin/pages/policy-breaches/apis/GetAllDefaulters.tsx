import { sp } from "@pnp/sp";

export const getAllDefaulters = async () => {
  return await sp.web.lists.getByTitle("EthicsDefaulters").items.getAll();
};
export const getDefaulters = async (id: number) => {
  return await sp.web.lists
    .getByTitle("EthicsDefaulters")
    .items.getById(id)
    .get();
};
