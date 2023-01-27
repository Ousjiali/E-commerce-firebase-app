import {
  Box,
  CircularProgress,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Menu } from "../../../../Container/AppNavigation";
import { AppWrapper } from "../../../../Container/AppWrapper";
import { errorAlert } from "../../../../utils/toast-messages";
import { CourseComments } from "../components/CourseComments";
import { CourseResources } from "../components/CourseResources";
import { Course } from "../components/Courses";
import "../styles/styles.css";

export const TakeCoursePage = () => {
  const { courseId } = useParams();

  const toast = useToasts().addToast;
  const [tab, setTab] = React.useState("resources");
  const [course, setCourse] = React.useState<Course>();
  const { data, isLoading } = useQuery<Course>(
    ["course"],
    async () => {
      return await sp.web.lists
        .getByTitle("Courses")
        .items.getById(courseId)
        .get();
    },
    {
      enabled: !!courseId,
      onSuccess(data) {
        setCourse(data);
      },
      onError(err) {
        errorAlert(toast);
      },
    }
  );

  return (
    <AppWrapper menu={menu} showBackButton={true}>
      <Box style={{ position: "relative" }}>
        {isLoading ? (
          <Box className="center">
            <CircularProgress size={40} />
          </Box>
        ) : (
          <Box>
            <Typography variant="h5">{course?.Course}</Typography>
            <Box mt={2}>
              <Paper square>
                <Tabs
                  value={tab}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={(e, v) => {
                    setTab(v);
                  }}
                >
                  <Tab
                    label="Resources"
                    value="resources"
                    style={{ textTransform: "none", fontSize: "1.09rem" }}
                  />
                  <Tab
                    label="Comments"
                    value="comments"
                    style={{ textTransform: "none", fontSize: "1.09rem" }}
                  />
                </Tabs>
              </Paper>
              {tab === "resources" ? (
                <>
                  {course?.Resources?.length > 0 ? (
                    <CourseResources course={course} />
                  ) : (
                    <Typography style={{ marginTop: "2rem" }}>
                      No resources added to this course at the moment
                    </Typography>
                  )}
                </>
              ) : (
                <>
                  <CourseComments courseId={courseId} />
                </>
              )}
              <></>
            </Box>
          </Box>
        )}

        {!isLoading && !course && (
          <Typography variant="h6">No Course Found</Typography>
        )}
      </Box>
    </AppWrapper>
  );
};

const menu: Menu[] = [{ title: "Profile Update", link: "/employee/profile" }];
