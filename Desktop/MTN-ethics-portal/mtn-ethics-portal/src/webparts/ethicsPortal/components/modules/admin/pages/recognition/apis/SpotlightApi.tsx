import { sp } from "@pnp/sp";

export const getAllSpotLights = async () => {
  return await sp.web.lists.getByTitle("SPOTLIGHT").items.getAll();
};
export const deleteSpotLight = async (id: number) => {
  return await sp.web.lists.getByTitle("SPOTLIGHT").items.getById(id).delete();
};
export const editSpotLight = async (id: number, data: any) => {
  return await sp.web.lists
    .getByTitle("SPOTLIGHT")
    .items.getById(id)
    .update(data);
};
