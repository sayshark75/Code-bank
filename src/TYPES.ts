import { ReactNode } from "react";
import { IconType } from "react-icons";

export type LinkType = {
  title: string;
  link: string;
  target?: string;
};

export type SideBarTabTypes = LinkType & { IconName: IconType };

export type TabLinkTypes = { link: string; target?: string; children: ReactNode };

export interface WindowSize {
  width: number;
  height: number;
}

type PureSnippetType = { code: string; tags: string[]; title: string; author: string; language: string; description: string; deleted: boolean };

export type SnippetAPIDataType = PureSnippetType & {
  _id: string;
};

export interface CodeHighlighterProps {
  _id: string;
  language?: string;
  author: string;
  description: string;
  code: string;
  title: string;
}

export type SearchBarType = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type RequestSnippetType = { message: string; snippets: SnippetAPIDataType[]; status: boolean };

export type AuthData = { username: string; password: string };
