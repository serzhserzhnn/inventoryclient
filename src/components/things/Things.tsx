import React, {useState, useEffect, ChangeEvent} from "react";
import {useParams, Link} from 'react-router-dom';

import ThingsDataService from "../../services/ThingsService";
import IThingsData from '../../types/Thing';
import {getCurrentUser} from "../../services/authservice/auth.service";
import {Pagination} from "@material-ui/lab";
import ThingListDataService from "../../services/ThingsListService";

const Things: React.FC = () => {
    const {id} = useParams();

    const [things, setThings] = useState<Array<IThingsData>>([]);
    const [searchName, setSearchName] = useState("");

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [totalItems, setTotalItems] = useState(0)

    const pageSizes = [3, 6, 9];

    const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const getRequestParams = (searchName: any, page: number, pageSize: any) => {
        let params = {};

        if (searchName) {
            // @ts-ignore
            params["name"] = searchName;
        }

        if (page) {
            // @ts-ignore
            params["page"] = page - 1;
        }

        if (pageSize) {
            // @ts-ignore
            params["size"] = pageSize;
        }

        return params;
    };

    const retrieveThings = (id?: string | undefined) => {

        const params = getRequestParams(searchName, page, pageSize);

        if (typeof id !== "undefined")
            ThingsDataService.getAllFromCategory(id, params)
                .then((response) => {
                    const {things, totalPages, totalItems} = response.data;
                    setThings(things);
                    setCount(totalPages);
                    setTotalItems(totalItems);
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        else
            ThingsDataService.getAll(params)
                .then((response) => {
                    const {things, totalPages, totalItems} = response.data;
                    setThings(things);
                    setCount(totalPages);
                    setTotalItems(totalItems);
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
    };

    const deleteThing = (id: any) => {
        ThingsDataService.remove(id)
            .then((response: any) => {
                retrieveThings();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveThings(id);
    }, [id, page, pageSize]);

    const handlePageChange = (event: any, value: React.SetStateAction<number>) => {
        setPage(value);
    };

    const handlePageSizeChange = (event: { target: { value: React.SetStateAction<unknown>; }; }) => {
        setPageSize(event.target.value as number);
        setPage(1);
    };

    const addToList =
        (thingId: string, name: string, description: string, location: string,
         category: number, quantity: number, dateEnd: string, user: number) => {
            ThingListDataService.create(thingId, name, description, location, category, quantity, dateEnd, user)
                .then((response: any) => {
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }

    const currentUser = getCurrentUser();

    let adminUser = false;

    if (currentUser !== null) {
        adminUser = currentUser.roles.includes("ROLE_MODERATOR") ||
            currentUser.roles.includes("ROLE_ADMIN");
    }

    if (currentUser !== null) {
        if (things.length !== 0) {
            return (
                <div className="list row">
                    <div className="col-md-8">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name"
                                value={searchName}
                                onChange={onChangeSearchName}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => retrieveThings(id)}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Add Thing</h5>
                            <a href="/thing_add" className="btn btn-primary">Create thing </a>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>Things List</h4>
                        {totalItems > 3 && (
                            <div className="mt-3">
                                {"Items per Page: "}
                                <select onChange={handlePageSizeChange} value={pageSize}>
                                    {pageSizes.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>

                                <Pagination
                                    className="my-3"
                                    count={count}
                                    page={page}
                                    siblingCount={1}
                                    boundaryCount={1}
                                    variant="outlined"
                                    shape="rounded"
                                    onChange={handlePageChange}
                                />
                            </div>)
                        }
                        <table className="table table-dark">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">name</th>
                                <th scope="col">description</th>
                                <th scope="col">action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {things &&
                            things.map((thing, index) => (
                                <tr>
                                    <th scope="row">{thing.id}</th>
                                    <td>{thing.name}</td>
                                    <td>{thing.description}</td>
                                    <td>
                                        <Link
                                            to={"/thing/" + thing.id}
                                            className="badge badge-warning mr-2"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            to={"/thing/" + thing.id}
                                            className="badge badge-warning mr-2"
                                        >
                                            Edit
                                        </Link>
                                        {adminUser &&
                                        <button className="badge badge-danger mr-2"
                                                onClick={() => deleteThing(thing.id)}>
                                            Delete
                                        </button>}
                                        <button className="badge badge-info mr-2"
                                                onClick={() => addToList(
                                                    thing.id, thing.name, thing.description,
                                                    thing.location, thing.category, thing.quantity,
                                                    thing.dateEnd, currentUser.id)
                                                }>
                                            addToList
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else return (
            <div>
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                            value={searchName}
                            onChange={onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => retrieveThings(id)}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    <h5>Things not found in search.&nbsp;<a href="/thing_add"> Create?</a></h5>
                </div>

            </div>)
    } else return (<div>
        <h5>Access is denied .&nbsp;<a href="/login"> Зарегистрироваться?</a></h5>
    </div>);
};

export default Things;

function Enter(): React.MouseEventHandler<HTMLInputElement> | undefined {
    throw new Error("Function not implemented.");
}
