import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PrincipalSource, PrincipalType, sp } from "@pnp/sp";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Menu } from "../../../Container/AppNavigation";
import { AppWrapper } from "../../../Container/AppWrapper";
import { StaffData } from "../../../Container/PeoplePicker";
import { sendEmail } from "../../../utils/sendEmail";
import { errorAlert, successAlert } from "../../../utils/toast-messages";
import { Course } from "../../employee/training/components/Courses";
import { CreateCourseForm } from "../components/CreateCourseForm";

type Props = {
  context: WebPartContext;
};

export interface ReadOnlyURLSearchParams extends URLSearchParams {
  append: never;
  set: never;
  delete: never;
  sort: never;
}

export const TrainerPage: React.FC<Props> = ({ context }) => {
  const { search } = useLocation();
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    (async () => {
      try {
        const e = await sp.utility.getCurrentUserEmailAddresses();
        setEmail(e);
      } catch (e) {}
    })();
  }, []);

  const toast = useToasts().addToast;

  const searchParams = React.useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );

  const [staffEmail, setStaffEmail] = React.useState("");
  const [staffName, setStaffName] = React.useState("");
  const [staffId, setStaffId] = React.useState<number>();

  const { data: trainerDetails } = useQuery<StaffData>(
    ["staff-data"],
    async () => {
      try {
        const user = await sp.utility.resolvePrincipal(
          email,
          PrincipalType.User,
          PrincipalSource.All,
          true,
          false
        );
        return {
          Department: user.Department,
          DisplayName: user.DisplayName,
          Email: user.Email,
        };
      } catch (e) {
        return e;
      }
    },
    {
      enabled: !!email,
    }
  );

  React.useEffect(() => {
    if (!searchParams) return;
    setStaffEmail(searchParams.get("StaffEmail"));
  }, []);

  const { data, isLoading, isError } = useQuery<any>(
    ["getStaffDetails"],
    async () => {
      try {
        const staff = await sp.web.lists
          .getByTitle("StaffProfile")
          .items.filter(`StaffEmail eq '${staffEmail}'`)
          .get();
        if (staff.length > 0) {
          setStaffName(staff[0].StaffName);
          setStaffId(staff[0].ID);
        }
        return staff;
      } catch (e) {
        return e;
      }
    },
    {
      enabled: !!staffEmail,
    }
  );

  const [course, setCourse] = React.useState<Course>();

  const { data: courses } = useQuery<Course[]>(
    ["getCourses"],
    async () => {
      try {
        const courses = await sp.web.lists
          .getByTitle("Courses")
          .items.filter(`Department eq '${trainerDetails?.Department}'`)
          .get();
        return courses;
      } catch (e) {
        return e;
      }
    },
    {
      enabled: !!trainerDetails,
    }
  );

  React.useEffect(() => {
    (async () => {
      try {
        const e = await sp.utility.getCurrentUserEmailAddresses();
        setEmail(e);
      } catch (e) {}
    })();
  }, []);

  const mutation = useMutation(
    async () => {
      return await sp.web.lists.getByTitle("Courses").items.add({
        Resources: JSON.stringify(course?.Resources),
        ["StaffEmailId"]: staffId,
        ThumbNail: course?.ThumbNail,
        Course: course?.Course,
        Department: trainerDetails?.Department,
        Trainer: trainerDetails?.Email,
        TrainerName: trainerDetails?.DisplayName,
      });
    },
    {
      onSuccess: (data) => {
        successAlert(toast, "Course Added");
        sendEmail(
          {
            Body: `Hello <b>${staffName}</b>, You have been assigned a new course by ${trainerDetails?.DisplayName}<br> <hr> <a href="${context.pageContext.web.absoluteUrl}/employee/${data?.data?.Id}/training">Go to Course</a>`,
            Subject: "Course Assignment",
            To: [staffEmail],
            CC: [],
          },
          toast
        );
        setCourse(null);
      },
      onError: () => {
        errorAlert(toast);
      },
    }
  );

  return (
    <AppWrapper menu={menu} showBackButton={false}>
      <Box
        mt={2}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
        width="70%"
        m="0 auto"
        p={3}
        boxShadow="1px 1px 4px rgba(0,0,0,0.5)"
        borderRadius="4px"
      >
        <Box>
          <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
            Assigned Staff
          </Typography>
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            {staffName}
          </Typography>
        </Box>
        <CreateCourseForm
          context={context}
          course={course}
          onUpdate={(newCourse) => setCourse(newCourse)}
          courses={courses}
        />
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            endIcon={
              mutation.isLoading ? <CircularProgress size={20} /> : <></>
            }
            onClick={() => mutation.mutate()}
            disabled={!course || mutation.isLoading}
          >
            Assign
          </Button>
        </Box>
      </Box>
    </AppWrapper>
  );
};

const menu: Menu[] = [
  {
    link: "/trainer-list",
    title: "My List",
  },
];
