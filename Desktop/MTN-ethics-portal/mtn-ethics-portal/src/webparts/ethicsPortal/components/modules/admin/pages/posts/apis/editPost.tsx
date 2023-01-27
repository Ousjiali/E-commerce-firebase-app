import { sp } from "@pnp/sp";

export const editPost = async (id: number, data: any) => {
  try {
    const res = await sp.web.lists
      .getByTitle("Post")
      .items.getById(id)
      .update(data);
    return res.data;
  } catch (e) {
    return e;
  }
};
