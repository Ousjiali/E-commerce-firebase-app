import { Box, CircularProgress, Typography } from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { errorAlert } from "../../../utils/toast-messages";
import { BlogContent } from "../../admin/components/blog-set-up/BlogContent";
import { BlogSectionEnums } from "../../admin/components/blog-set-up/sections/blog-section-enums/blog-section-enums";
import { EmployeeWrapper } from "../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { PageHeaderWithImage } from "../../shared/components/PageHeaderWithImage";

type Props = {
  section?: BlogSectionEnums;
  sectionId?: string;
};

export const PolicyComponent: React.FC<Props> = ({ section, sectionId }) => {
  const toast = useToasts().addToast;
  const [policy, setPolicy] = React.useState<any>();
  const { data, isLoading } = useQuery<any>(
    ["policy"],
    async () => {
      return await sp.web.lists
        .getByTitle("Policies")
        .items.select(
          "PolicyTitle, content, FileUrl, SectionId/ID, SectionId/PolicyTitle, SectionId/ImageUrl"
        )
        .expand("SectionId")
        .filter(`SectionId eq '${sectionId}'`)
        .get();
    },
    {
      enabled: !!sectionId,
      onSuccess(data: any[]) {
        if (data.length) {
          setPolicy(data[data.length - 1]);
          return data[data.length - 1];
        }
        return data;
      },
      onError(err: Error) {
        errorAlert(toast, err.message);
      },
    }
  );

  return (
    <EmployeeWrapper showFooter={true} backButton={true}>
      <Box width="90%" m="auto">
        <PageHeaderWithImage
          bg={`${policy?.FileUrl}`}
          text={policy?.PolicyTitle ?? ""}
        />

        {!isLoading && !policy?.PolicyTitle && (
          <Box style={{ width: "90%", height: "450px" }} mt={3} ml="5%">
            <Typography variant="h6">
              No <strong>Item</strong> at this time.<br></br> Please check back.
            </Typography>
          </Box>
        )}

        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {policy && (
              <Box minHeight="450px">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h5">{policy?.PolicyTitle}</Typography>
                  <Box></Box>
                </Box>
                <Box>
                  {policy?.content && (
                    <BlogContent post={JSON.parse(policy?.content)} />
                  )}
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </EmployeeWrapper>
  );
};
