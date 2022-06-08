import { IUser } from "./IUser";

export interface IReview {
    reviewId: number,
    rating: number,
    content: string,
    reviewer: IUser
}
