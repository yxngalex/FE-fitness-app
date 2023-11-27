import redaxios from "redaxios";
import {User, UserDTO} from "@/model/UserDTO.ts";

const BASE_URL = "http://localhost:8080/api/auth";

interface LoginResponse {
    accessToken: string;
    tokenType: string;
}

export const registerUser = async (user: UserDTO) => {
    const response = await redaxios.post(`${BASE_URL}/register`, user);
    return response.data;
}

export const loginUser = async (username: string, password: string): Promise<string> => {
    try {
        const user = new User(username, password);

        const response = await redaxios.post<LoginResponse>(`${BASE_URL}/login`, user);

        if (response.status >= 200 && response.status < 300) {
            const { accessToken, tokenType } = response.data;
            return `${tokenType}${accessToken}`;
        } else {
            console.error("Login failed:", response.status, response.data);
            throw new Error(`Login failed: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
