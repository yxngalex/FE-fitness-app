import {GoalDTO} from "@/model/GoalDTO.ts";

export interface UserDTO {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    height: number;
    weight: number;
    age: number;
    gender: string;
    goal: GoalDTO;
}

export class User implements UserDTO {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    height: number;
    weight: number;
    age: number;
    gender: string;
    goal: GoalDTO;

    constructor(username: string, password: string, user: Partial<UserDTO> = {}) {
        this.username = username;
        this.password = password;
        this.firstName = user.firstName || '';
        this.lastName = user.lastName || '';
        this.email = user.email || '';
        this.height = user.height || 0;
        this.weight = user.weight || 0;
        this.age = user.age || 0;
        this.gender = user.gender || '';
        this.goal = user.goal || {} as GoalDTO;
    }

}