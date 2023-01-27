import { sp } from "@pnp/sp";

export const editRecognition = async (id: number, data: any) => {
  return await sp.web.lists
    .getByTitle("EthicsRecognition")
    .items.getById(id)
    .update(data);
};

export const editEthicsActivity = async (id: number, data: any) => {
  return await sp.web.lists
    .getByTitle("EthicsActivities")
    .items.getById(id)
    .update(data);
};
