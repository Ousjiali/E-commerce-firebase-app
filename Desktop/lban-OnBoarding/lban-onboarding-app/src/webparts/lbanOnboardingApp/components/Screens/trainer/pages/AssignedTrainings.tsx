import * as React from "react";
import { Menu } from "../../../Container/AppNavigation";
import { AppWrapper } from "../../../Container/AppWrapper";
import {
  Courses,
  TrainerCourses,
} from "../../employee/training/components/Courses";
import { useLocation } from "react-router-dom";
import { ReadOnlyURLSearchParams } from "./TrainerPage";

export const AssignedTrainings = () => {
  const { search } = useLocation();
  const searchParams = React.useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );
  const [staffEmail, setStaffEmail] = React.useState("");
  const [trainer, setTrainer] = React.useState("");

  React.useEffect(() => {
    setStaffEmail(searchParams.get("StaffEmail"));
    setTrainer(searchParams.get("Trainer"));
  }, []);

  if (!staffEmail && !trainer) {
    return (
      <AppWrapper menu={menu} showBackButton={true}>
        <></>
      </AppWrapper>
    );
  }

  return (
    <AppWrapper menu={menu} showBackButton={true}>
      <TrainerCourses Trainer={trainer} staffEmail={staffEmail} />
    </AppWrapper>
  );
};

const menu: Menu[] = [
  {
    link: "/trainer-list",
    title: "My List",
  },
];
