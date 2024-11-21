import { SideBarTabTypes } from "./TYPES";
import { FaMessage, FaPager, FaReact, FaStarOfLife } from "react-icons/fa6";
import { MdOutlineGradient } from "react-icons/md";
import { SiChakraui, SiFramer, SiNextdotjs } from "react-icons/si";

export const sidebarTabs: SideBarTabTypes[] = [
  {
    title: "Snippets",
    link: "/snippets",
    IconName: FaPager,
  },
  {
    title: "Framer Motion",
    link: "https://www.framer.com/motion/",
    target: "_blank",
    IconName: SiFramer,
  },
  {
    title: "Color Gradients",
    link: "https://cssgradient.io/",
    target: "_blank",
    IconName: MdOutlineGradient,
  },
  {
    title: "React Icons",
    link: "https://react-icons.github.io/react-icons/",
    target: "_blank",
    IconName: FaReact,
  },
  {
    title: "NextJs",
    link: "https://nextjs.org/",
    target: "_blank",
    IconName: SiNextdotjs,
  },
  {
    title: "CSS Tricks",
    link: "https://css-tricks.com/",
    target: "_blank",
    IconName: FaStarOfLife,
  },
  {
    title: "Chakra UI V3",
    link: "https://next.chakra-ui.com/",
    target: "_blank",
    IconName: SiChakraui,
  },
  {
    title: "React Toastify",
    link: "https://fkhadra.github.io/react-toastify/introduction/",
    target: "_blank",
    IconName: FaMessage,
  },
];
