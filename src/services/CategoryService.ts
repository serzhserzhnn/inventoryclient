import http from "../http-common2";
import ICategoryData from "../types/Category";

const getAll = () => {
    return http.get<Array<ICategoryData>>("/allCategory");
};

const get = (id: any) => {
    return http.get<ICategoryData>(`/category/${id}`);
};

const create = (data: ICategoryData) => {
    return http.post<ICategoryData>("/category", data);
};

const update = (id: any, data: ICategoryData) => {
    return http.put<any>(`/category/${id}`, data);
};

const remove = (id: any) => {
    return http.delete<any>(`/category/${id}`);
};
//
// const findByTitle = (title: string) => {
//     return http.get<Array<ICategoryData>>(`/tutorials?title=${title}`);
// };

const CategoryService = {
    getAll,
    get,
    create,
    update,
    remove
};

export default CategoryService;