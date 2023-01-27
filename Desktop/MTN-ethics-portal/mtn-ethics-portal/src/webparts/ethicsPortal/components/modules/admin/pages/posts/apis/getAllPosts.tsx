import { sp } from "@pnp/sp";
import { useQueryClient } from "@tanstack/react-query";

export const getAllPosts = async () => {
  return await sp.web.lists
    .getByTitle("Post")
    .items.select("PostTitle, Created, SectionId/PolicyTitle, ID")
    .expand("SectionId")
    .getAll();
};
export const getPost = async (id: number) => {
  return await sp.web.lists.getByTitle("Post").items.getById(id).get();
};
