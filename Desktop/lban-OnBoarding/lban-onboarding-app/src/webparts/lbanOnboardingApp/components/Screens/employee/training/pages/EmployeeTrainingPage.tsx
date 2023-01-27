import * as React from "react";
import { Menu } from "../../../../Container/AppNavigation";
import { AppWrapper } from "../../../../Container/AppWrapper";
import { PeoplePicker, StaffData } from "../../../../Container/PeoplePicker";
import { Courses } from "../components/Courses";
import { WelcomeVideo } from "../components/WelcomeVideo";

type Props = {};

export const EmployeeTrainingPage = (props: Props) => {
  return (
    <AppWrapper menu={menu} showBackButton={true}>
      <div>
        <WelcomeVideo />
        <Courses />
      </div>
    </AppWrapper>
  );
};

const menu: Menu[] = [{ title: "Profile Update", link: "/employee/profile" }];
