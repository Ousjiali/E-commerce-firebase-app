import styled from "styled-components";
import React from "react";
import { Box } from "@material-ui/core";
import { sp } from "@pnp/sp";
import { asyncHandler } from "../../../../../utils/asyncHandler";
import { Label } from "../../../components/Label";

export const EthicsChampionSpotLight = () => {
  const [champion, setChampion] = React.useState<Champion>();
  React.useEffect(() => {
    asyncHandler(async () => {
      const res = await sp.web.lists
        .getByTitle("SPOTLIGHT")
        .items.filter(
          `Year eq '${new Date(Date.now()).getFullYear().toString()}'`
        )
        .get();
      setChampion(res[res.length - 1]);
    })();
  }, []);
  return champion?.ChampionImage ? (
    <StyledContainer>
      <CurvedImageContainer bg={champion?.ChampionImage}></CurvedImageContainer>
      <Box display="flex" flexDirection="column" style={{ gap: "1rem" }}>
        <Label header="Name" content={champion?.ChampionName} />
        <Label header="Division" content={champion?.ChampionDivision} />
        <Label header="Location" content={champion?.ChampionLocation} />
        <Label header="Ethics Message" content={champion?.ChampionMessage} />
      </Box>
    </StyledContainer>
  ) : (
    <Box
      style={{
        flex: "0.5",
      }}
    >
      <ImageContainer
        bg={
          "https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/PostFiles/who-2.png"
        }
      ></ImageContainer>
    </Box>
  );
};

const StyledContainer = styled.div<{ bg: string }>((props) => ({
  flex: "0.5",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  paddingBottom: "1rem",
  borderRadius: "26px",
  boxShadow: "2px 2px 10px rgba(0,0,0,0.4)",
}));
const CurvedImageContainer = styled.div<{ bg: string }>((props) => ({
  backgroundImage: `url('${props.bg}')`,
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  padding: "1rem",
  borderRadius: "0 0 60% 60%",
}));
const ImageContainer = styled.div<{ bg: string }>((props) => ({
  backgroundImage: `url('${props.bg}')`,
  width: "100%",
  height: "100%",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  boxSizing: "border-box",
  padding: "1rem",
  borderRadius: "26px",
}));

interface Champion {
  ChampionImage: string;
  ChampionDivision: string;
  ChampionLocation: string;
  ChampionName: string;
  ChampionMessage: string;
}
