import { sp } from "@pnp/sp";

export const editPolicy = async (id: number, data: any) => {
  return await sp.web.lists
    .getByTitle("Policies")
    .items.getById(id)
    .update(data);
};
