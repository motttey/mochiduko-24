declare module "@/types/api" {
  export interface Tag {
    name: string, 
    translated_name: string
  }
  export interface Illust {
    src: string | undefined;
    title: string,
    date: string,
    id: number,
    view: number,
    bookmark: number,
    comments: number,
    url: string,
    tags: Array<Tag>,
    width: number,
    height: number,
    "tsne-X": number,
    "tsne-Y": number
    "tsne-Z": number
  }
  export interface IllustResponse {
    illusts: Array<Illust>;
  }
}
