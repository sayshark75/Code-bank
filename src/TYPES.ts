import { creator, favoriteSnippet } from "@prisma/client";
import { IconType } from "react-icons";

export interface WindowSize {
  width: number;
  height: number;
}
export type LinkType = {
  title: string;
  link: string;
  target?: string;
};

export type SideBarTabTypes = LinkType & { IconName: IconType };

export type CodeSnippetType = {
  title: string;
  description: string;
  code: string;
  id: string;
  creator: creator;
  favorites: favoriteSnippet[];
  language: string;
  version: string;
  likes: [];
};
