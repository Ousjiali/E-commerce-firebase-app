import { Box, MenuItem, Select } from "@material-ui/core";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { errorAlert, successAlert } from "../../../../utils/toast-messages";
import { AdminWrapper } from "../../../shared/components/app-wrapper/admin/AdminWrapper";
import { ReadOnlyURLSearchParams } from "../policies/ManagePoliciesPage";
import { TrainingTable } from "./components/TrainingTable";
import { TrainingCategoryEnum } from "./enums/TrainingCategoryEnum";
import { courseCategories, VideoCourseForm } from "./forms/VideoCourseForm";
import { TrainingType } from "./types/TrainingTypes";
import { useLocation } from "react-router-dom";
import { Container } from "../ethics-policies-management/components/PolicyDetailWrapper";

export const VideoTrainingPage: React.FC<{ context: WebPartContext }> = ({
  context,
}) => {
  const { data: trainings, isLoading } = useQuery<TrainingType[]>(
    ["getVideoCourses"],
    async () => {
      try {
        const res = await sp.web.lists.getByTitle("Training").items.getAll();
        return res.filter((it) => courseCategories.includes(it.Category));
      } catch (e) {
        return e;
      }
    }
  );
  const [component, setComponent] = React.useState("form");
  const queryClient = useQueryClient();
  const toast = useToasts().addToast;
  const { search } = useLocation();
  const searchParams = React.useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );

  const [training, setTraining] = React.useState<TrainingType>({
    Category: "" as TrainingCategoryEnum,
    TrainingTitle: "",
    Video: "",
    FileType: "",
    ThumbNail: "",
  });
  const mutation = useMutation(
    async () => {
      return await sp.web.lists.getByTitle("Training").items.add({
        ...training,
        ["SectionIdId"]: Number(searchParams.get("sectionId")),
      });
    },
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries({
            queryKey: ["getVideoCourses"],
          })
          .then(() => {
            setTraining(null);
            successAlert(toast, "Training Created Successfully");
          });
      },
      onError: () => {
        errorAlert(toast);
      },
    }
  );

  return (
    <AdminWrapper>
      <Container style={{ height: "100vh" }}>
        <Box display="flex" justifyContent="space-between">
          <Select
            value={component}
            onChange={(e) => setComponent(e.target.value as string)}
          >
            <MenuItem value="form">Add Training Video</MenuItem>
            <MenuItem value="table">Manage Training Videos</MenuItem>
          </Select>
          <Box></Box>
        </Box>

        {(() => {
          if (component === "form")
            return (
              <VideoCourseForm
                training={training}
                onUpdate={(items) => {
                  setTraining(items);
                }}
                isLoading={mutation?.isLoading}
                onSubmit={(e) => {
                  e.preventDefault();
                  mutation.mutate();
                }}
                context={context}
              />
            );
          return (
            <Box>
              <TrainingTable
                trainings={trainings}
                loading={isLoading}
                context={context}
              />
            </Box>
          );
        })()}
      </Container>
    </AdminWrapper>
  );
};
