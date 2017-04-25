import { Saying } from "./Saying";

export interface Sage {
    id: number;
    name: string;
    userName: string;
    email: string;
    dateOfBirth: string;
    sagacity: number;
    sayings?: Saying[];
}
