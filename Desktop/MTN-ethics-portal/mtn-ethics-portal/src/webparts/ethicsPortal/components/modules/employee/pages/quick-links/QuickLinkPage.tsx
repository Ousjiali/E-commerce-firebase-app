import React from "react";
import { EmployeeWrapper } from "../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { Box, CircularProgress } from "@material-ui/core";
import { PageHeaderWithImage } from "../../../shared/components/PageHeaderWithImage";
import { useQuery } from "@tanstack/react-query";
import { sp } from "@pnp/sp";
import { QuickLinkData } from "../../../admin/pages/quick-links/forms/QuickLinkForm";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const QuickLinkPage = () => {
  const [quickLinks, setQuickLinks] = React.useState<QuickLinkData[]>([]);
  const { isLoading } = useQuery<QuickLinkData[]>(
    ["quickLinks"],
    async () => {
      return await sp.web.lists.getByTitle("QuickLinks").items.getAll();
    },
    {
      onSuccess(data: QuickLinkData[]) {
        setQuickLinks(data);
      },
    }
  );

  if (isLoading) {
    <EmployeeWrapper showFooter={true} backButton={true}>
      <Box width="90%" m="auto">
        <PageHeaderWithImage
          bg={`https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/PostFiles/Frame%2018.png`}
          text="Quick Links"
        />
        <Box>
          <CircularProgress />
        </Box>
      </Box>
    </EmployeeWrapper>;
  }

  return (
    <EmployeeWrapper showFooter={true} backButton={true}>
      <Box width="90%" m="auto">
        <PageHeaderWithImage
          bg={`https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/PostFiles/Frame%2018.png`}
          text="Quick Links"
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        style={{ gap: "1rem" }}
        width="100%"
        minHeight="500px"
        ml="5%"
      >
        {quickLinks.map((item) => {
          return (
            <QuickLinkButton href={item?.LinkTo} target="_blank">
              {item?.QuickLinkTitle}
            </QuickLinkButton>
          );
        })}
      </Box>
    </EmployeeWrapper>
  );
};

const QuickLinkButton = styled.a`
  color: #006993;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
