import http from "../http-common3";
import IThingsData from "../types/Thing";

const getAll = (user: any) => {
    return http.get<Array<IThingsData>>(`/things_list?user=${user}`);
};

const remove = (id: any) => {
    return http.delete<any>(`/things_list/${id}`);
};

const removeAll = () => {
    return http.delete<any>(`/things_list`);
};

const ThingsListService = {
    getAll,
    remove,
    removeAll
};

export default ThingsListService;