import { BiHomeAlt } from "react-icons/bi";
import {
  BsBuilding,
  BsFillBookmarkXFill,
  BsFillCursorFill,
  BsFillFileEarmarkCheckFill,
  BsFillJournalBookmarkFill,
  BsFillPatchCheckFill,
  BsFillPatchQuestionFill,
  BsFlower2,
  BsPeopleFill,
  BsPersonBadgeFill,
  BsUiChecks,
} from "react-icons/bs";
import { FaBuilding, FaCogs, FaRegFileAlt, FaUserShield } from "react-icons/fa";

export const adminLinks = [
  {
    route: "/",
    name: "Dashboard",
    Icon: BiHomeAlt,
    allowed: ["Super Admin", "Team Lead"],
  },
  {
    // route: "/app/loan",
    name: "Loan Request",
    Icon: BsFillCursorFill,
    children: [
      {
        route: "/app/loan/pending",
        name: "Pending Request",
        Icon: BsFillPatchQuestionFill,
      },
      {
        route: "/app/loan/approved",
        name: "Approved Request",
        Icon: BsFillPatchCheckFill,
      },
      {
        route: "/app/loan/declined",
        name: "Declined Request",
        Icon: BsFillBookmarkXFill,
      },
    ],
    allowed: [
      "Super Admin",
      "Team Lead",
      "OBL Team",
      "Product Manager",
      "Head of Credit and Marketing",
      "ED Banking",
      "MD CEO",
    ],
  },
  {
    route: "/app/loan/all",
    name: "All Loan Request",
    Icon: BsUiChecks,

    allowed: [
      "Super Admin",
      "Team Lead",
      "OBL Team",
      "Product Manager",
      "Head of Credit and Marketing",
      "ED Banking",
      "MD CEO",
    ],
  },
  {
    route: "/app/branch",
    name: "Branch",
    Icon: BsBuilding,
    allowed: ["Super Admin", "Team Lead", "OBL Team"],
  },
  {
    route: "/app/bank",
    name: "Bank",
    Icon: FaBuilding,
    allowed: ["Super Admin", "Team Lead", "OBL Team"],
  },
  {
    route: "/app/roles",
    name: "Roles",
    Icon: BsPersonBadgeFill,
    allowed: ["Super Admin"],
  },
  {
    route: "/app/groups",
    name: "Groups",
    Icon: BsPeopleFill,
    allowed: ["Super Admin"],
  },
  {
    route: "/app/admin",
    name: "Admin",
    Icon: FaUserShield,
    allowed: ["Super Admin"],
  },
  {
    name: "Loan Config",
    Icon: FaCogs,
    allowed: ["Super Admin"],
    children: [
      {
        route: "/app/config/loantype",
        name: "Loan Type",
        Icon: BsFlower2,
      },
      {
        route: "/app/config/checklist",
        name: "Checklist",
        Icon: BsFillFileEarmarkCheckFill,
      },
      {
        route: "/app/config/document",
        name: "Document",
        Icon: BsFillJournalBookmarkFill,
      },
    ],
  },
  {
    route: "/app/audit",
    name: "Audit Log",
    Icon: FaRegFileAlt,
    allowed: ["Super Admin"],
  },
  //   { route: "/app/services", name: "Logout", Icon: FaLayerGroup },
];
