import {
  Box,
  Typography,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import * as React from "react";
import { EmployeeWrapper } from "../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { FaAngleDoubleRight } from "react-icons/fa";
import { CarouselContainer } from "../../../../styles/styles";
import { MMarquee } from "../../../shared/components/marquee/MMarquee";
import { MButton } from "../../../shared/components/buttons/MButton";
import { sp } from "@pnp/sp";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import { CarouselData } from "../../../admin/pages/carousel/forms/CarouselItemForm";
import { PostPreview } from "./components/PostPreviewContainer";
import { PageNavigationLinkItem } from "./components/PageNavigationLinkItem";
import { PostSection } from "../../../admin/components/blog-set-up/sections/CreateSection";
import { LandingActivitiesContainer } from "./components/LandingActivitiesContainer";
import { EthicsChampionBanner } from "./components/EthicsChampionBanner";
import { EthicsChampionSpotLight } from "./components/EthicsChampionSpotLight";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
};

export const LandingPage = () => {
  const [pageMenu, setPageMenu] = React.useState<
    {
      label: string;
      link: string;
    }[]
  >([
    { label: "Quick Links", link: "/quick-links" },
    { label: "Click to Declare a gift", link: "" },
    { label: "Click to Declare conflict of interest", link: "" },
  ]);
  const { data, isLoading } = useQuery<any[]>(["item"], async () => {
    try {
      const res = await sp.web.lists.getByTitle("Post").items.getAll();
      const sliced = res.slice(0, 3);

      return sliced;
    } catch (e) {}
  });

  const [carouselItems, setCarouselItems] = React.useState<CarouselData[]>([]);
  const [eyesWideOpenCaption, setEyesWideOpenCaption] = React.useState("");
  const [didYouKnowCaption, setDidYouKnowCaption] = React.useState("");

  React.useEffect(() => {
    Promise.all([
      (async () => {
        try {
          const email = await sp.utility.getCurrentUserEmailAddresses();

          const findAdmin = await sp.web.lists
            .getByTitle("Admin")
            .items.filter(`StaffEmail eq '${email}'`)
            .get();

          if (findAdmin?.length > 0) {
            setPageMenu([
              ...pageMenu,
              { label: "Admin", link: "/admin/dashboard" },
            ]);
          }
        } catch (e) {
          console.log(e);
        }
      })(),
      (async () => {
        const res = await sp.web.lists
          .getByTitle("CarouselItems")
          .items.getAll();
        const sliced = res.slice(0, 4);
        setCarouselItems(res);
      })(),
      (async () => {
        const res = await sp.web.lists
          .getByTitle("Post")
          .items.filter(`PostSection eq '${PostSection.Did_You_Know}'`)
          .getAll();
        setDidYouKnowCaption(res[res.length - 1]?.PostTitle);
      })(),
      (async () => {
        const res = await sp.web.lists
          .getByTitle("Post")
          .items.filter(`PostSection eq '${PostSection.Eyes_Wide_Open}'`)
          .getAll();
        setEyesWideOpenCaption(res[res.length - 1]?.PostTitle);
      })(),
    ]);
  }, []);
  return (
    <EmployeeWrapper pageNavigation={false} backButton={false}>
      <>
        {!carouselItems.length && <Box height="300px" width="100%"></Box>}

        <Slider {...settings}>
          {carouselItems.map((item) => (
            <CarouselContainer bg={item?.CarouselImage}>
              <Box
                mt={3}
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                width="100%"
              >
                <Typography
                  variant="h1"
                  style={{
                    fontStyle: "italic",
                    width: "50%",
                    boxSizing: "border-box",
                    paddingRight: "1rem",
                    fontWeight: "bolder",
                  }}
                >
                  {item?.CarouselTitle}
                </Typography>
                <Box mt={4}>
                  <a
                    href={item?.LinkTo}
                    target="_blank"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <MButton
                      endIcon={<FaAngleDoubleRight />}
                      text="Read More..."
                    />
                  </a>
                </Box>
              </Box>
            </CarouselContainer>
          ))}
        </Slider>
        <Box
          style={{
            display: "flex",
            flexWrap: "nowrap",
            minHeight: "230px",
            margin: "2.5rem 0",
            gap: "1.5rem",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <PostPreview
            background="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/PostFiles/did%20you%20know.png"
            caption={didYouKnowCaption}
            heading="Did you Know"
            link={`/posts?postSection=${PostSection.Did_You_Know}`}
          />
          <PostPreview
            background="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/PostFiles/eyes%20wide%20open.png"
            caption={eyesWideOpenCaption}
            heading="Eyes Wide Open"
            link={`/posts?postSection=${PostSection.Eyes_Wide_Open}`}
          />
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              height: "100%",
              marginLeft: "auto",
              alignItems: "flex-end",
              paddingRight: "8rem",
              boxSizing: "border-box",
              flexBasis: ".5",
            }}
          >
            {pageMenu.map((item, i) => {
              return <PageNavigationLinkItem {...item} />;
            })}
          </Box>
        </Box>
        <LandingActivitiesContainer>
          <Typography
            variant="subtitle1"
            style={{
              fontWeight: "bold",
            }}
          >
            Ethical Employee of the Year
          </Typography>
          <Box
            display="flex"
            height="350px"
            style={{
              gap: "1rem",
            }}
          >
            <EthicsChampionSpotLight />
            <EthicsChampionBanner />
          </Box>
        </LandingActivitiesContainer>

        <MMarquee />
      </>
    </EmployeeWrapper>
  );
};
