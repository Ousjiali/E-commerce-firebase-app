import { sp } from "@pnp/sp";

export const EditDefaulters = async (id: number, data: any) => {
  return await sp.web.lists
    .getByTitle("EthicsDefaulters")
    .items.getById(id)
    .update(data);
};
