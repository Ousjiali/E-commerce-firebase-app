import { Box, Typography } from "@material-ui/core";
import * as React from "react";
import { CustomSplitButton } from "../../../../shared/components/buttons/CustomSplitButton";
import styled from "styled-components";
import { Policy } from "../../../../employee/components/PolicyLandingComponent";
import { LandingPageModal } from "../modals/LandingPageModal";

type Props = {
  children: React.ReactNode;
  policy: Policy;
  id: number;
  content?: any;
  setContent?: React.Dispatch<React.SetStateAction<any>>;
};

export const PolicyDetailWrapper: React.FC<Props> = ({
  children,
  policy,
  id,
  content,
  setContent,
}) => {
  const [addLandingPageContent, setAddLandingPageContent] =
    React.useState<Policy>();
  const options: PolicyDetail[] = [
    {
      text: "Articles",
      link: `/admin/policy/${id}?section=post&filter=${policy?.PolicyTitle}&sectionId=${id}`,
    },
    {
      text: "Training Slides",
      link: `/admin/policy/${id}?section=trainingPage&filter=${policy?.PolicyTitle}`,
    },
    {
      text: "Policy Page",
      link: `/admin/policy/${id}?section=policyPage`,
    },
    {
      text: "Landing Page",
      link: `/admin/policy/${id}?section=landingPage`,
    },
  ];
  return (
    <Container style={{ minHeight: "100vh" }}>
      <Box
        py={1}
        style={{ borderBottom: "1px solid #e6e6e6", boxSizing: "border-box" }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="20%"
        width="100%"
      >
        <Typography variant="body2" style={{ fontWeight: "bold" }}>
          {policy?.PolicyTitle}
        </Typography>
        <Box ml="auto">
          <CustomSplitButton options={options} />
        </Box>
      </Box>
      <Box height="80%" width="100%">
        {children}
      </Box>
      {addLandingPageContent && (
        <LandingPageModal
          policy={addLandingPageContent}
          onClose={() => setAddLandingPageContent(null)}
          open={true}
          content={content}
          setContent={setContent}
        />
      )}
    </Container>
  );
};

export interface PolicyDetail {
  link?: string;
  text: string;
  click?: () => void;
}

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
`;
