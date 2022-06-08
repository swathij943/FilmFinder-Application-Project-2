import { IReview } from "./IReview"

export interface IMovie {
    movieId: number,
    description: string,
    title: string,
    genre: Genre,
    image: string,
    year: number,
    reviews: IReview[]
}

export type Genre = {
    genreId: number,
    genreName: string
}