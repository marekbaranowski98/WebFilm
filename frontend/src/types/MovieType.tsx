interface PosterType {
    url: string,
    order: number,
    poster: string
}

export interface MovieTileType {
    id: number,
    title: string,
    posterURL: PosterType,
}
