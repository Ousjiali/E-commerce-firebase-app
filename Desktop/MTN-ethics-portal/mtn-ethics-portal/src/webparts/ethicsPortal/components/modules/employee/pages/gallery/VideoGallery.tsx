import { Box, CircularProgress, Typography } from "@material-ui/core";
import * as React from "react";
import { GalleryData } from "../../../admin/pages/gallery/forms/GalleryForm";
import { ReadOnlyURLSearchParams } from "../../../admin/pages/policies/ManagePoliciesPage";
import { PreviewContainer } from "../../components/blog/PostPreviewItem";
import { GalleryContainer } from "./styles";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { sp } from "@pnp/sp";
import { EmployeeWrapper } from "../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { PageHeaderWithImage } from "../../../shared/components/PageHeaderWithImage";
import { PaginationContainer } from "../../components/pagination/PaginationContainer";
import { theme } from "../../../../themes/themes";

export const VideoGallery = () => {
  const { search } = useLocation();
  const searchParams = React.useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );

  const [items, setItems] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(null);
  const rowsPerPage = 6;

  const videoType = (fileUrl: string) => {
    const test = /([A-Z])\.mp4/i.test(fileUrl);
    return test;
  };

  const { data, isLoading, isError } = useQuery<GalleryData[]>(
    ["getVideos", searchParams.get("location")],
    async () => {
      try {
        const res = await sp.web.lists.getByTitle("Gallery").items.getAll();
        return res;
      } catch (e) {
        return e;
      }
    },
    {
      onSuccess: (dt) => {
        if (searchParams.get("location")) {
          const filter = dt?.filter(
            (it) =>
              it?.location == searchParams.get("location") &&
              videoType(it?.file)
          );
          setPageSize(Math.ceil(filter.length / rowsPerPage));
          setItems(filter);
        } else {
          setItems([]);
        }
      },
    }
  );
  return (
    <EmployeeWrapper>
      <Box width="90%" m="0 auto">
        <PageHeaderWithImage
          bg="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/photopage.png"
          text={`Video Gallery for ${searchParams.get("location")} Region`}
        />
      </Box>
      {!isLoading && items?.length === 0 && (
        <Box style={{ width: "90%", height: "450px" }} mt={3} ml="5%">
          <Typography variant="h6">
            No <strong>videos</strong> at this time.<br></br> Please check back.
          </Typography>
        </Box>
      )}
      <PaginationContainer
        data={items}
        onUpdate={(splicedItems) => setFiltered(splicedItems)}
        pageSize={pageSize}
        rowsPerPage={rowsPerPage}
      >
        <GalleryContainer>
          {isLoading ? (
            <>
              <CircularProgress />
            </>
          ) : (
            <>
              {filtered?.map((item) => (
                <Box height="330px" style={GalleryStyle}>
                  <video
                    src={item?.file}
                    width="100%"
                    height="80%"
                    controls
                    autoPlay={false}
                    style={{ objectFit: "cover", borderRadius: "inherit" }}
                  ></video>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="20%"
                  >
                    <Typography variant="body2" style={{ fontWeight: "bold" }}>
                      {item?.imageLabel}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </>
          )}
        </GalleryContainer>
      </PaginationContainer>
    </EmployeeWrapper>
  );
};

export const GalleryStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "20px",
  boxShadow: `3px 3px 4px ${theme.palette.primary.main}`,
};
