declare module "@/types/api" {
    export interface Illust {
        src: string | undefined;
        title: string,
        date: string,
        id: number,
        view: number,
        bookmark: number,
        comments: number,
        url: string,
        tags: Array<any>,
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