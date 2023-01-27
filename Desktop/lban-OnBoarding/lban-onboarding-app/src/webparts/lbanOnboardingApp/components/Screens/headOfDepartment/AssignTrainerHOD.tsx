import * as React from "react";
import { Menu } from "../../Container/AppNavigation";
import { AppWrapper } from "../../Container/AppWrapper";
import Select from "../../Container/Form/select";

export const AssignTrainerHOD = () => {
  return (
    <div>
      <AppWrapper menu={menu} showBackButton={true}>
        <div>
          <div>{/* <Select /> */}</div>
        </div>
      </AppWrapper>
    </div>
  );
};

const menu: Menu[] = [
  { title: "Pending Request", link: "/" },
  { title: "Assigned Training", link: "/" },
];
