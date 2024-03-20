import { ReactNode } from "react";
import { IconType } from "react-icons";

export type LinkType = {
  title: string;
  link: string;
};

export type SideBarTabTypes = LinkType & { IconName: IconType };

export type TabLinkTypes = { link: string; children: ReactNode };

export interface WindowSize {
  width: number;
  height: number;
}

export type SnippetDataType = {
  _id: string;
  code: string;
  title: string;
  tags?: string[];
  author?: string;
  language?: string | undefined;
  delete?: boolean;
  description?: string;
  isFavorite?: boolean;
  getFavoriteData?: () => void;
};

export interface CodeHighlighterProps {
  _id: string;
  language?: string;
  code: string;
  title: string;
  isFavorite?: boolean;
  getFavoriteData?: () => void;
}

export type SearchBarType = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type RequestSnippetType = { message: string; snippets: SnippetDataType[]; status: boolean };

export type AuthData = { username: string; password: string };
