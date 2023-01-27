import { Box, CircularProgress } from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { errorAlert } from "../../../utils/toast-messages";
import { BlogContent } from "../../admin/components/blog-set-up/BlogContent";
import { EmployeeWrapper } from "../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { LandingPageHeaderWithImage } from "../../shared/components/LandingPageHeaderWithImage";
import { PageNav } from "../../shared/components/Navigation/page-navigation/PageNavigation";

export const PolicyLandingComponent = () => {
  const { policyId } = useParams();
  const [policyResponse, setPolicyResponse] = React.useState<Policy>();
  const [pageMenu, setPageMenu] = React.useState<PageNav[]>([]);
  const history = useHistory();
  const toast = useToasts().addToast;
  const { isLoading } = useQuery(
    ["policyFetch", policyId],
    async () => {
      return await sp.web.lists
        .getByTitle("PolicyConfiguration")
        .items.getById(policyId)
        .get();
    },
    {
      onSuccess(data: Policy) {
        setPolicyResponse(data);
        setPageMenu([
          {
            id: 1,
            text: `${data?.PolicyTitle} Write Ups`,
            link: `/page/writeup/${data?.Id}`,
          },
          {
            id: 2,
            text: `${data?.PolicyTitle} Policy`,
            link: `/page/policy/${data?.Id}`,
          },
          {
            id: 3,
            text: `${data?.PolicyTitle} resources`,
            link: `/page/resources/${data?.Id}?section=${data?.PolicyTitle}`,
          },
        ]);
        return data;
      },
      onError(err) {
        errorAlert(toast);
      },
    }
  );

  if (!policyId) {
    return (
      <EmployeeWrapper pageNavigation={false} backButton={false}>
        <CircularProgress />
        {() => {
          setTimeout(() => {
            history.goBack();
          }, 1000);
        }}
        ()
      </EmployeeWrapper>
    );
  }
  if (isLoading) {
    return (
      <EmployeeWrapper pageNavigation={false} backButton={false}>
        <CircularProgress className="center-item" />
      </EmployeeWrapper>
    );
  }

  return (
    <EmployeeWrapper
      pageMenu={pageMenu}
      pageNavigation={true}
      backButton={false}
    >
      <LandingPageHeaderWithImage
        bg={policyResponse?.ImageUrl}
        text={policyResponse?.PolicyTitle}
      />
      <Box>
        {policyResponse?.Content && (
          <BlogContent post={JSON.parse(policyResponse?.Content)} />
        )}
      </Box>
    </EmployeeWrapper>
  );
};

export interface Policy {
  PolicyTitle: string;
  ImageUrl: string;
  Content?: any;
  Id?: number;
}
