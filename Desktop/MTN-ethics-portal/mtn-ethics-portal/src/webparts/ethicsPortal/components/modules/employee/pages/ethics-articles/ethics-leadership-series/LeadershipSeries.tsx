import * as React from "react";
import { sp } from "@pnp/sp";
import { Box, CircularProgress } from "@material-ui/core";
import { EmployeeWrapper } from "../../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { PageWrapper } from "../../../../shared/components/app-wrapper/employee/PageWrapper";
import { PageHeaderWithImage } from "../../../../shared/components/PageHeaderWithImage";
import "./styles.css";
import { PostPreviewContainer } from "../../../../../styles/styles";
import { useQuery } from "@tanstack/react-query";
import { errorAlert } from "../../../../../utils/toast-messages";
import { BlogSectionEnums } from "../../../../admin/components/blog-set-up/sections/blog-section-enums/blog-section-enums";
import { useToasts } from "react-toast-notifications";
import { PostPreviewItem } from "../../../components/blog/PostPreviewItem";

export const LeadershipSeries = () => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const current = new Date();
  const date = `${current.getDate()} ${
    months[current.getMonth()]
  } ${current.getFullYear()}`;

  const { data, isLoading, isSuccess } = useQuery<any>(["post"], async () => {
    try {
      const res = await sp.web.lists
        .getByTitle("Post")
        .items.filter(`PostSection eq '${BlogSectionEnums.Conflict}'`)
        .get();
      return res;
    } catch (e) {
      errorAlert(toast);
    }
  });
  const toast = useToasts().addToast;

  return (
    <EmployeeWrapper showFooter={true}>
      <PageWrapper>
        <PageHeaderWithImage
          bg="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/ethicslead.png"
          text="Ethics Leadership Series"
        />
        <Box
          style={{
            height: "200px",
            width: "100%",
            padding: "1rem",
            backgroundColor: "gray",
          }}
        >
          <div className="mtn__topic">
            <h3>Ethics Leadership Series</h3>
            <h4>Posted on {date}</h4>
          </div>
          <PostPreviewContainer>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                {data.map((post) => (
                  <PostPreviewItem post={post} key={post.Id} />
                ))}
              </>
            )}
          </PostPreviewContainer>
        </Box>
      </PageWrapper>
    </EmployeeWrapper>
  );
};
