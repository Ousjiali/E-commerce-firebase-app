import { Box } from "@material-ui/core";
import { sp } from "@pnp/sp";
import * as React from "react";
import { EmployeeWrapper } from "../../../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { PaginationContainer } from "../../../../components/pagination/PaginationContainer";
import { ListItem } from "./components/ListItem";
import { PageHeaderWithImage } from "../../../../../shared/components/PageHeaderWithImage";
import { ContentType } from "../../../../../admin/pages/recognition/EthicsActivity";
import { Link } from "react-router-dom";
import "../styles.css";

export const EthicsChampionsActivties = () => {
  const [items, setItems] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(null);
  const rowsPerPage = 10;

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`EthicsActivities`)
      .items.get()
      .then((res) => {
        setItems(res);
        setPageSize(Math.ceil(res.length / rowsPerPage));
      });
  }, []);

  const [dataItem, setDataItem] = React.useState([]);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`EthicsActivities`)
      .items.get()
      .then((res) => {
        setDataItem(res);
        console.log(res);
      });
  }, []);

  const dataList = dataItem && dataItem[0];
  console.log(dataList);

  return (
    <EmployeeWrapper pageNavigation={false} backButton={true} showFooter={true}>
      <Box width="90%" m="auto">
        <PageHeaderWithImage
          bg={`https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/mtn-ethicslogo.png`}
          text="Champion Recognition Activities"
        />
      </Box>

      <Box>
        <h4 style={{ textAlign: "center" }}>Ethics Champion Activities</h4>
        <PaginationContainer
          data={items}
          onUpdate={(splicedItems) => setData(splicedItems)}
          pageSize={pageSize}
          rowsPerPage={rowsPerPage}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              minHeight: "250px",
              margin: "auto",
              padding: "0.5rem",
              gap: "1rem",
              width: "95%",
              boxSizing: "border-box",
            }}
          >
            <Box
              style={{
                width: "30%",
                height: "200px",
                backgroundColor: "whitesmoke",
                padding: "1rem",
                borderRadius: "10px",
                textDecoration: "none",
              }}
            >
              <div className="photos">
                <Link to="/recognition/allphotos" className="photos">
                  <img
                    style={{
                      width: "100%",
                      height: "150px",
                      borderRadius: "5px",
                    }}
                    src="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/gallery-folder-pic.png"
                    alt=""
                  />
                  Photos
                </Link>
              </div>
            </Box>
            <Box
              style={{
                width: "30%",
                height: "200px",
                backgroundColor: "whitesmoke",
                padding: "1rem",
                borderRadius: "10px",
              }}
            >
              <div className="videos">
                <Link to="/recognition/allvideos">
                  <img
                    style={{
                      width: "100%",
                      height: "150px",
                      borderRadius: "5px",
                    }}
                    src="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/video-gallery.png"
                    alt=""
                  />
                  Videos
                </Link>
              </div>
            </Box>
            <Box
              style={{
                width: "30%",
                height: "200px",
                backgroundColor: "whitesmoke",
                padding: "1rem",
                borderRadius: "10px",
              }}
            >
              <div className="write-up">
                <Link to="/recognition/allwriteup">
                  <img
                    style={{
                      width: "100%",
                      height: "150px",
                      borderRadius: "5px",
                    }}
                    src="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/write-up-pic.jpg"
                    alt=""
                  />
                  Write Up
                </Link>
              </div>
            </Box>
            {/* {dataItem?.map((item) => (
              <ListItem {...item} />
            ))} */}
          </Box>
        </PaginationContainer>
      </Box>
    </EmployeeWrapper>
  );
};
