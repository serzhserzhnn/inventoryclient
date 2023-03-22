import http from "../http-common2";
import IThingsData from "../types/Thing";
import IThingCheckData from "../types/ThingCheck";

const getAll = () => {
    return http.get<Array<IThingsData>>("/things");
};

const getAllFromCategory = (id: any) => {
    return http.get<Array<IThingsData>>(`/things/category/${id}`);
};

const findByName = (name: string) => { //, category: number
    return http.get<Array<IThingsData>>(`/things?name=${name}`); //?category=${category}
};

const get = (id: any) => {
    return http.get<IThingsData>(`/thing/${id}`);
};

const chk = (id: any) => {
    return http.get<IThingCheckData>(`/check_thing/${id}`);
};

const create = (data: IThingsData) => {//(data : IThingsData) => {
    return http.post<IThingsData>("/thing", data);
}
const update = (id: any, data: IThingsData) => {
    return http.put<any>(`/thing/${id}`, data);
};

const remove = (id: any) => {
    return http.delete<any>(`/thing/${id}`);
};

const ThingsService = {
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