import { Box, MenuItem, Select } from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import React from "react";
import { successAlert, errorAlert } from "../../../../utils/toast-messages";
import { TrainingTableForPolicy } from "./components/TrainingTableForPolicy";
import { TrainingFormForPolicy } from "./forms/TrainingFormForPolicy";
import { TrainingType } from "./types/TrainingTypes";
import { ReadOnlyURLSearchParams } from "../policies/ManagePoliciesPage";

type Props = {
  trainings: TrainingType[];
  isLoading: boolean;
};

export const PolicyTrainingPage: React.FC<Props> = ({
  trainings,
  isLoading,
}) => {
  const [component, setComponent] = React.useState("form");
  const [training, setTraining] = React.useState<TrainingType>();
  const { search } = useLocation();
  const searchParams = React.useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );
  const queryClient = useQueryClient();
  const { policyId } = useParams();
  const mutation = useMutation(
    async () => {
      return await sp.web.lists.getByTitle("Training").items.add({
        Category: training?.Category,
        TrainingTitle: training?.TrainingTitle,
        Video: training?.Video,
          ThumbNail: training?.ThumbNail,
        FileType: training?.FileType
      });
    },
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries({
            queryKey: ["trainings-policies"],
          })
          .then(() => {
            successAlert(null, "Training Created Successfully").then(() => {
              setComponent("table");
              setTraining(null);
            });
          });
      },
      onError: () => {
        errorAlert();
      },
    }
  );

  return (
    <Box
      mt={2}
      display="flex"
      flexDirection="column"
      width="100%"
      style={{ minHeight: "100%", gap: "2rem", boxSizing: "border-box" }}
      p={2}
    >
      <Box display="flex" justifyContent="flex-start">
        <Select
          value={component}
          onChange={(e) => setComponent(e.target.value as string)}
        >
          <MenuItem value="form">Upload Training</MenuItem>
          <MenuItem value="table">Manage Trainings</MenuItem>
        </Select>
      </Box>

      {(() => {
        if (component === "form") {
          return (
            <>
              <TrainingFormForPolicy
                isLoading={mutation.isLoading}
                training={training}
                onSubmit={(e) => {
                  e.preventDefault();
                  mutation.mutate();
                }}
                onUpdate={(value) => setTraining(value)}
              />
            </>
          );
        } else {
          return (
            <Box>
              <TrainingTableForPolicy
                trainings={trainings}
                loading={isLoading}
              />
            </Box>
          );
        }
      })()}
    </Box>
  );
};
