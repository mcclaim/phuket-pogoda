export interface BlogData {
  title?: string;
  desc?: string;
  date?: string;
  img?: string;
  urlPath?: string;
  [key: string]: any;
}

export interface BlogListData {
  cardClass?: string | object | Array<string | object>;
  title: string | unknown;
  desc: string | unknown;
  path: string;
  id: string;
  img?: string | null;
}
export interface BlogCardData {
  cardClass?: string | object | Array<string | object>;
  title: string | unknown;
  desc: string | unknown;
  link: string;
  img?: string | null;
}
