import { sp } from "@pnp/sp";
import { useQueryClient } from "@tanstack/react-query";

export const getAllPolicies = async () => {
  return await sp.web.lists
    .getByTitle("Policies")
    .items.select(
      "Id, ID, PolicyTitle, PolicySection, Created, SectionId/PolicyTitle"
    )
    .expand("SectionId")
    .getAll();
};
export const getPolicy = async (id: number) => {
  return await sp.web.lists
    .getByTitle("Policies")
    .items.getById(id)
    .select()
    .expand("SectionId")
    .get();
};
