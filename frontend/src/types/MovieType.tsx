export interface PosterType {
    url: string,
    order: number,
    poster: string
}

export interface MovieTileType {
    id: number,
    title: string,
    posterURL: PosterType,
}

interface GenreType {
    id: number,
    name: string,
}

interface CollectionType {
    id: string,
    name: string,
    gallery: number,
    posterURL: PosterType[],
}

export interface PersonType {
    id: number,
    name: string,
    surname: string,
    gallery: number,
    posterURL: PosterType[],
}

interface CastType {
    id: number,
    character: string,
    person: PersonType,
}

interface CrewType {
    id: number,
    job: string,
    person: PersonType,
}

interface KeywordType {
    id: number,
    name: string,
}

interface CompanyType {
    id: number,
    name: string,
}

interface CountryType {
    iso_3166_1: string,
    name: string,
}

interface LanguageType {
    iso_639_1: string,
    name: string,
}

export interface MovieType {
    id: number,
    title: string,
    original_title: string,
    release_date: Date,
    runtime: number,
    genres: GenreType[],
    collection: CollectionType,
    homepage: string,
    overview: string,
    tagline: string,
    cast: CastType[]
    crew: CrewType[],
    keywords: KeywordType[],
    production_companies: CompanyType[],
    production_countries: CountryType[],
    original_language: LanguageType,
    spoken_languages: LanguageType[],
    budget: number,
    revenue: number,
    average_vote: number,
    count_vote: number,
    gallery: number,
    posterURL: PosterType[],
}
