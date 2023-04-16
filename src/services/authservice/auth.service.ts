import axios from "axios";
import http from "../../http-common2";
import IUserData from "../../types/User";

const API_URL = "http://localhost:8097/api/auth/";

export const register = (username: string, email: string, password: string) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

export const login = (username: string, password: string) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
};

export const updatePass = (id: any, password: string) => {
    return axios.put<any>(API_URL +`user_password_change/${id}`, {password});
};

const getAll = () => {
    return http.get<Array<IUserData>>(API_URL + "users");
};

const findByName = (name: string) => { //, category: number
    return http.get<Array<IUserData>>(API_URL + `users?name=${name}`); //?category=${category}
};

const remove = (id: any) => {
    return http.delete<any>(API_URL + `users/${id}`);
};

const UsersService = {
    getAll,
    findByName,
    remove
};

export default UsersService;