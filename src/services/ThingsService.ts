import http from "../http-common2";
import IThingsData from "../types/Thing";
import IThingCheckData from "../types/ThingCheck";
import axios from "axios";

const API_URL = "http://localhost:8087/inventory"

const getAllChats = () => {
    return http.get<Array<IThingsData>>("/things_chats");
};

const getAll = (params: any) => {
    return http.get("/things", {params});
};

const getAllFromCategory = (id: any, params: any) => {
    return http.get(`/things/category/${id}`, {params});
};

const findByName = (name: string, params: any) => {
    return http.get(`/things?name=${name}`, {params}); //?category=${category}
};

const get = (id: any) => {
    return http.get<IThingsData>(`/thing/${id}`);
};

const chk = (id: any) => {
    return http.get<IThingCheckData>(`/check_thing/${id}`);
};

// const create = (data: IThingsData) => {
//     return http.post<IThingsData>("/thing_add", data);
// }

const create = (name: string, description: string, category: number) => {
    return axios.post(API_URL + "/thing_add", {name, description, category});
};

// const update = (id: any, data: IThingsData) => {
//     return http.put<any>(`/thing/${id}`, data);
// };

const update = (id: any, data: IThingsData) => {
    return axios.put<any>(API_URL + `/thing/${id}`, data);
};

const remove = (id: any) => {
    return http.delete<any>(`/thing/${id}`);
};

const ThingsService = {
    getAllChats,
    getAll,
    getAllFromCategory,
    findByName,
    get,
    chk,
    create,
    update,
    remove
};

export default ThingsService;