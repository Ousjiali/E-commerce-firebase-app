import { sp } from "@pnp/sp";
import { StaffData } from "../../../Container/PeoplePicker";

export interface AssignRoleApiRequest extends StaffData {
  role: Roles;
  StaffName: string;
}

export enum Roles {
  Hr = "Human Resource Manager",
  Trainer = "Trainer",
  Department_Manager = "Department Manager",
}

export class RolesConfiguartion {
  public getRoles = async (): Promise<any[]> => {
    return await sp.web.lists.getByTitle("Roles").items.getAll();
  };

  public async assignUserRole(data: AssignRoleApiRequest) {
    return await sp.web.lists.getByTitle("Roles").items.add(data);
  }
  public async editUserRole(data: AssignRoleApiRequest, id: number) {
    return await sp.web.lists
      .getByTitle("Roles")
      .items.getById(id)
      .update(data);
  }
  public async deleteUserRole(id: number) {
    return await sp.web.lists.getByTitle("Roles").items.getById(id).delete();
  }
}
