import { Settings } from "@material-ui/icons";
import {
  FaAd,
  FaAngrycreative,
  FaDochub,
  FaImages,
  FaTextWidth,
  FaVideo,
} from "react-icons/fa";

export const adminNavItems = [
  {
    title: "Dashboard",
    icon: FaAd,
    link: "/admin/dashboard",
  },
  {
    title: "Manage Policy",
    icon: FaAd,
    link: "/admin/manage-policy",

    subNav: [
      {
        title: "All Policy Content",
        icon: FaAngrycreative,
        link: "/admin/policies",
      },
    ],
  },
  {
    title: "Gallery",
    icon: FaImages,
    link: "/admin/gallery",
    subNav: [
      {
        title: "Videos",
        icon: FaVideo,
        link: "/admin/gallery/videos",
      },
      {
        title: "Photos",
        icon: FaImages,
        link: "/admin/gallery/images",
      },
    ],
  },
  {
    title: "Ethics Quiz",
    icon: Settings,
    link: "/admin/manage-quiz",

    subNav: [
      {
        title: "Create Quiz",
        icon: FaVideo,
        link: "/admin/create-quiz",
      },
      {
        title: "Reports",
        icon: FaImages,
        link: "/admin/quiz-report",
      },

      {
        title: "Manage",
        icon: Settings,
        link: "/admin/manage-quiz",
      },
    ],
  },
  {
    title: "Ethics Champions",
    icon: FaAngrycreative,
    link: "/admin/recognition/create",

    subNav: [
      {
        title: "Manage",
        icon: Settings,
        link: "/admin/recognition/manage",
      },
      {
        title: "Spotlight",
        icon: FaImages,
        link: "/admin/recognition/spotlight",
      },
      {
        title: "Ethics Champion Activities",
        icon: FaImages,
        link: "/admin/recognition/activities",
      },
    ],
  },
  {
    title: "Training",
    icon: FaAngrycreative,
    link: "/admin/training",
  },
  {
    title: "Policy Breaches",
    icon: FaAngrycreative,
    link: "/admin/policy-breaches",

    subNav: [
      {
        title: "Ethics Defaulters",
        icon: FaDochub,
        link: "/admin/ethicsdefaulters",
      },
      {
        title: "Manage Defaulters",
        icon: FaDochub,
        link: "/admin/ethics/managedefaulters",
      },
    ],
  },
  {
    title: "Configure Users",
    icon: FaAngrycreative,
    link: "/admin/user/create",
    subNav: [
      {
        title: "Create Admin",
        icon: FaAngrycreative,
        link: "/admin/user/create",
      },
    ],
  },
  {
    title: "Scrolling Text",
    icon: FaTextWidth,
    link: "/admin/scrolling-text",
  },
  {
    title: "Carousel",
    icon: FaTextWidth,
    link: "/admin/carousel",
  },
  {
    title: "Ethics Articles",
    icon: FaDochub,
    link: "/admin/create-post",
    subNav: [
      {
        title: "Manage Articles",
        icon: Settings,
        link: "/admin/manage-posts",
      },
    ],
  },
  {
    title: "Quick Links",
    icon: FaDochub,
    link: "/admin/manage-links",
  },
];
