import http from "../http-common3";
import IThingsData from "../types/Thing";
import axios from "axios";

const API_URL = "http://localhost:8088/inventory"

const getAll = (user: any) => {
    return http.get<Array<IThingsData>>(`/things_list?user=${user}`);
};

const create = (thingId: string, name: string, description: string, location: string,
                category: number, quantity: number, dateEnd: string, user: number) => {
    return axios.post<any>(API_URL + `/add_thing`, {
        thingId,
        name,
        description,
        location,
        category,
        quantity,
        dateEnd,
        user
    });
};

const remove = (id: any) => {
    return http.delete<any>(`/things_list/${id}`);
};

const removeAll = (user: any) => {
    return http.delete<any>(`/remove_things_list/${user}`);
};

const removeSelected = (ids: any) => {
    return axios.post<any>(API_URL + `/remove_things_selected`, ids);
};

const sendMail = (user: any) => {
    return http.get(`/things_list/sendmail?user=${user}`);
};

const ThingsListService = {
    getAll,
    create,
    remove,
    removeAll,
    removeSelected,
    sendMail
};

export default ThingsListService;