import redaxios from "redaxios";
import {UserDTO, User} from "@/model/UserDTO.ts";

const BASE_URL = "http://localhost:8080/api/auth";

export const registerUser =  async (user: UserDTO): Promise<void> => {
    try {
        const response = await redaxios.post(`${BASE_URL}/register`, user);
        console.log(response.data)
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const loginUser =  async (username: string, password: string): Promise<void> => {
    try {
        const user = new User(username, password);

        const response = await redaxios.post(`${BASE_URL}/login`, user);

        if (response.status >= 200 && response.status < 300) {
            const {accessToken, tokenType} = response.data;
            const token = `${tokenType} ${accessToken}`;

            sessionStorage.setItem('token', token);
        } else {
            console.error('Login failed:', response.status, response.data);
        }

        console.log(response.data)
    } catch (error) {
        console.error(error)
        throw error;
    }
}
