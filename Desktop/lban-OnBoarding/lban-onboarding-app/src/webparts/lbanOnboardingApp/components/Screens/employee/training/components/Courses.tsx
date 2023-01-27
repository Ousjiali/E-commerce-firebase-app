import * as React from "react";
import { sp } from "@pnp/sp";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import { CourseItem } from "./CourseItem";
import "../styles/styles.css";
import { takeOnly } from "../../../../utils/list.utils";
import { errorAlert } from "../../../../utils/toast-messages";
import { useToasts } from "react-toast-notifications";

type Props = {
  staffEmail?: string;
  Trainer?: string;
};

export interface Course {
  Course: string;
  Resources: any;
  ThumbNail: string;
  Id: number | string;
}

export const Courses = () => {
  const toast = useToasts().addToast;
  const [userCourses, setUserCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { data, isLoading } = useQuery<any[]>(
    ["profile"],
    async () => {
      const res = await sp.profiles.myProperties.get();
      return await sp.web.lists
        .getByTitle("StaffProfile")
        .items.filter(`StaffEmail eq '${res?.Email}' `)
        .get();
    },
    {
      onSuccess: (data) => {
        return data;
      },
    }
  );

  React.useEffect(() => {
    if (!data?.length) return;
    setLoading(true);
    (async () => {
      const courses = await sp.web.lists
        .getByTitle("Courses")
        .items.select(
          "StaffEmail/StaffEmail, StaffEmail/StaffName, Course, Resources, ThumbNail, Department, Id"
        )
        .expand("StaffEmail")
        .filter(`StaffEmailId eq '${data[0]?.Id}'`)
        .getAll();
      setUserCourses(courses);
      setLoading(false);
    })();
  }, [data]);

  const [shouldTruncate, setShouldTruncate] = React.useState(true);
  const toggleTruncate = () => setShouldTruncate((val) => !val);
  if (isLoading) return <Typography>Please wait...</Typography>;
  return (
    <Box
      mt={2}
      style={{ position: "relative", minHeight: "400px", width: "100%" }}
    >
      {loading ? (
        <Box className="center">
          <CircularProgress size={40} />
        </Box>
      ) : (
        <>
          {userCourses?.length > 0 && (
            <>
              <Typography variant="h6">My Trainings</Typography>
              <Box
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "1rem",
                  boxSizing: "border-box",
                  padding: "1rem",
                }}
              >
                {(shouldTruncate ? takeOnly(userCourses, 3) : userCourses).map(
                  (course) => (
                    <CourseItem course={course} />
                  )
                )}
              </Box>
            </>
          )}
        </>
      )}

      {userCourses?.length > 3 && (
        <Button onClick={() => toggleTruncate()} color="secondary">
          {shouldTruncate ? `+${userCourses.length - 3} More` : "Show Less"}
        </Button>
      )}

      {userCourses?.length === 0 && !loading && (
        <Box mt={2}>
          <Typography variant="h6">No training assigned</Typography>
        </Box>
      )}
    </Box>
  );
};
export const TrainerCourses: React.FC<Props> = ({ staffEmail, Trainer }) => {
  const toast = useToasts().addToast;
  const [id, setId] = React.useState("");
  const { data } = useQuery<any>(["profile"], async () => {
    try {
      const res = await sp.profiles.myProperties.get();
      const st = await sp.web.lists
        .getByTitle("StaffProfile")
        .items.filter(`StaffEmail eq '${staffEmail}' `)
        .get();

      if (st.length) {
        setId(st[0].Id);
      }
    } catch (e) {
      // errorAlert(toast);
    }
  });
  const { data: userCourses, isLoading } = useQuery<Course[]>(
    ["courses"],
    async () => {
      try {
        const res = await sp.web.lists
          .getByTitle("Courses")
          .items.select(
            "StaffEmail/StaffEmail, StaffEmail/StaffName, Course, Resources, ThumbNail, Department, Id, Trainer"
          )
          .expand("StaffEmail")
          .filter(`StaffEmailId eq '${id}' and Trainer eq '${Trainer}'`)
          .getAll();
        return res;
      } catch (e) {
        errorAlert(toast);
      }
    },
    {
      enabled: !!id && !!Trainer,
    }
  );
  const [shouldTruncate, setShouldTruncate] = React.useState(true);
  const toggleTruncate = () => setShouldTruncate((val) => !val);
  return (
    <Box
      mt={2}
      style={{ position: "relative", minHeight: "400px", width: "100%" }}
    >
      {isLoading ? (
        <Box className="center">
          <CircularProgress size={40} />
        </Box>
      ) : (
        <>
          {userCourses?.length > 0 && (
            <>
              <Typography variant="h6">My Trainings</Typography>
              <Box
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "1rem",
                  boxSizing: "border-box",
                  padding: "1rem",
                }}
              >
                {(shouldTruncate ? takeOnly(userCourses, 3) : userCourses).map(
                  (course) => (
                    <CourseItem course={course} />
                  )
                )}
              </Box>
            </>
          )}
        </>
      )}

      {userCourses?.length > 3 && (
        <Button onClick={() => toggleTruncate()} color="secondary">
          {shouldTruncate ? `+${userCourses.length - 3} More` : "Show Less"}
        </Button>
      )}

      {userCourses?.length === 0 && !isLoading && (
        <Box mt={2}>
          <Typography variant="h6">No training assigned</Typography>
        </Box>
      )}
    </Box>
  );
};
