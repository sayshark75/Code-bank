import { SideBarTabTypes } from "./TYPES";
import { FaPager, FaReact, FaStarOfLife } from "react-icons/fa6";
import { MdOutlineGradient } from "react-icons/md";
import { SiChakraui, SiFramer, SiNextdotjs } from "react-icons/si";

export const sidebarTabs: SideBarTabTypes[] = [
  {
    title: "Snippets",
    link: "/snippets-page",
    IconName: FaPager,
  },
  {
    title: "Framer Motion",
    link: "https://www.framer.com/motion/",
    IconName: SiFramer,
  },
  {
    title: "Color Gradients",
    link: "https://cssgradient.io/",
    IconName: MdOutlineGradient,
  },
  {
    title: "React Icons",
    link: "https://react-icons.github.io/react-icons/",
    IconName: FaReact,
  },
  {
    title: "NextJs",
    link: "https://nextjs.org/",
    IconName: SiNextdotjs,
  },
  {
    title: "CSS Tricks",
    link: "https://css-tricks.com/",
    IconName: FaStarOfLife,
  },
  {
    title: "Chakra UI",
    link: "https://v2.chakra-ui.com/",
    IconName: SiChakraui,
  },
];
