import { sp } from "@pnp/sp";
import { ContentType } from "../EthicsActivity";

export const getAllRecognition = async () => {
  return await sp.web.lists.getByTitle("EthicsRecognition").items.getAll();
};
export const getRecognition = async (id: number) => {
  return await sp.web.lists
    .getByTitle("EthicsRecognition")
    .items.getById(id)
    .get();
};

export const getEthicsPhotoActivities = async (id: number) => {
  return await sp.web.lists
    .getByTitle("EthicsActivitiesPhoto")
    .items.getById(id)
    .get();
};

export const getAllEthicsPhotoActivities = async () => {
  return await sp.web.lists.getByTitle("EthicsActivities").items.getAll();
};

export const getAllEthicsActivities = async (filter: ContentType) => {
  return await sp.web.lists
    .getByTitle("EthicsActivities")
    .items.filter(
      `
  ActivityType eq '${filter}'
  `
    )
    .getAll();
};

export const getAllEthicsWriteUpActivities = async () => {
  return await sp.web.lists.getByTitle("EthicsActivities").items.getAll();
};

export const getAllChampionOfTheYear = async () => {
  return await sp.web.lists.getByTitle("SPOTLIGHT").items.getAll();
};
