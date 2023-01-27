import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import * as React from "react";
import { EmployeeWrapper } from "../../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { LandingPageHeaderWithImage } from "../../../../shared/components/LandingPageHeaderWithImage";
import { ImageContainerEthics } from "../../../../../styles/styles";
import "./styles.css";
import { sp } from "@pnp/sp";
import { Label } from "../../../components/Label";

const pageMenu = [
  { id: 1, text: "Ethics Champions", link: "/recognition/ethicschampion" },
];

export const ChampionLandingPage = () => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`EthicsRecognition`)
      .items.get()
      .then((res) => {
        setItems(res.slice(0, 3));
        setItems(res);
      });
  }, []);

  return (
    <EmployeeWrapper
      pageNavigation={true}
      pageMenu={pageMenu}
      backButton={false}
      showFooter={true}
    >
      <LandingPageHeaderWithImage
        bg="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/mtn-ethicslogo.png"
        text="Champion Recognition"
      />

      <div className="titleH3">
        <h3>Meet Your Ethics Champions</h3>
      </div>

      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          // minHeight: "350px",
          alignItems: "center",
          padding: "3rem",
          gap: "3rem",
          marginLeft: "17%",
          justifyContent: "center",
          // position: "relative",
          width: "65%",
        }}
      >
        {items?.map((item) => (
          <ImageContainerEthics bg={item?.RecognitionImage}>
            <Box className="mtn__coverImage">
              <div className="mtn__CoverImageSpan">
                <Label header="Name" content={item?.Name} />
                <Label header="Division" content={item?.Division} />
                <Label header="Location" content={item?.Location} />
                <Label header="Ethics Message" content={item?.EthicalMessage} />
              </div>
            </Box>
          </ImageContainerEthics>
        ))}
      </Box>
    </EmployeeWrapper>
  );
};
