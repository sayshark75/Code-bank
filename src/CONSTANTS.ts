import { BsHeartFill } from "react-icons/bs";
import { SideBarTabTypes } from "./TYPES";
import { FaPager } from "react-icons/fa6";

export const sidebarTabs: SideBarTabTypes[] = [
  {
    title: "Snippets",
    link: "/snippets-page",
    IconName: FaPager,
  },
  {
    title: "Favorites",
    link: "/favorites-page",
    IconName: BsHeartFill,
  },
];
