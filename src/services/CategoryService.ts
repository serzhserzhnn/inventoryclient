import http from "../http-common2";
import ICategoryData from "../types/Category";
import axios from "axios";

const API_URL = "http://localhost:8087/inventory";

const getAll = () => {
    return http.get<Array<ICategoryData>>("/allCategory");
};

const get = (id: any) => {
    return http.get<ICategoryData>(`/category/${id}`);
};

// const create = (data: ICategoryData) => {
//     return http.post<ICategoryData>("/category", data);
// };

export const create = (name: string) => {
    return axios.post(API_URL + "/category", {name});
};

// const update = (id: any, data: ICategoryData) => {
//     return http.put<any>(`/category/${id}`, data);
// };

export const update = (id: any, data: ICategoryData) => {
    return axios.put<any>(API_URL +`/category/${id}`, data);
};

const remove = (id: any) => {
    return http.delete<any>(`/category/${id}`);
};

const CategoryService = {
    getAll,
    get,
    //create,
    //update,
    remove
};

export default CategoryService;