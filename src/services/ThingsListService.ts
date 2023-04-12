import http from "../http-common3";
import IThingsData from "../types/Thing";
import axios from "axios";

const API_URL = "http://localhost:8088/inventory"

const getAll = (user: any) => {
    return http.get<Array<IThingsData>>(`/things_list?user=${user}`);
};

const create = (thingId: string, name: string, description: string, category: number, user: number) => {
    return axios.post<any>(API_URL + `/add_thing`, {thingId, name, description, category, user});
};

const remove = (id: any) => {
    return http.delete<any>(`/things_list/${id}`);
};

const removeAll = (user: any) => {
    return http.delete<any>(`/remove_things_list/${user}`);
};

const sendMail = (user: any) => {
    return http.get(`/things_list/sendmail?user=${user}`);
};

const ThingsListService = {
    getAll,
    create,
    remove,
    removeAll,
    sendMail
};

export default ThingsListService;