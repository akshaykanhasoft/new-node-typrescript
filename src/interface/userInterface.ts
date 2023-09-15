import { Document } from "mongoose";

export default interface IUser extends Document {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    address: string,
    state: string,
    city: string,
    zipcode: string,
    user_lat: number,
    user_lng: number,
    profile_pics:string,
    isActive:string
}
