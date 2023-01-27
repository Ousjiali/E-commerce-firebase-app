import { sp } from "@pnp/sp";

export const deletePost = async (id: number) => {
  await sp.web.lists.getByTitle("Post").items.getById(id).delete();
};
