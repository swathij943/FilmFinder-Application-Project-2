import { IMovie } from "./IMovie";

export interface IUser {
    userId: number,
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    favorites: IMovie[]
}