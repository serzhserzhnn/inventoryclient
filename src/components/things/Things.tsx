import React, {useState, useEffect, ChangeEvent} from "react";
import {useParams, useNavigate, Link} from 'react-router-dom';

import ThingsDataService from "../../services/ThingsService";
import IThingsData from '../../types/Thing';

const Things: React.FC = () => {
    const {id} = useParams();
    let navigate = useNavigate();

    const [things, setThings] = useState<Array<IThingsData>>([]);
    const [currentThing, setCurrentThing] = useState<IThingsData | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchName, setSearchName] = useState<string>("");

    useEffect(() => {
        retrieveThings(id);
    }, [id]);

    const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveThings = (id?: string | undefined) => {
        if (typeof id !== "undefined")
            ThingsDataService.getAllFromCategory(id)
                .then((response: any) => {
                    setThings(response.data);
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        else
            ThingsDataService.getAll()
                .then((response: any) => {
                    setThings(response.data);
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
    };

    const refreshList = () => {
        retrieveThings();
        setCurrentThing(null);
        setCurrentIndex(-1);
    };

    const setActiveThing = (thing: IThingsData, index: number) => {
        setCurrentThing(thing);
        setCurrentIndex(index);
    };

    const findByName = () => {
        if (typeof id !== "undefined")
            ThingsDataService.findByName(searchName)
                .then((response: any) => {
                    setThings(response.data);
                    setCurrentThing(null);
                    setCurrentIndex(-1);
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        else
            ThingsDataService.findByName(searchName)
                .then((response: any) => {
                    setThings(response.data);
                    setCurrentThing(null);
                    setCurrentIndex(-1);
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
    };

    if (things.length !== 0)
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
                                onClick={findByName}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="card-body">
                        <h5 className="card-title">Add Thing</h5>
                        {/*<p className="card-text">View all things.</p>*/}
                        <a href="/thing_add" className="btn btn-primary">Create thing </a>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Things List</h4>

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
                                        className="badge badge-warning"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        to={"/thing/" + thing.id}
                                        className="badge badge-warning"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );

    else return (<div>
        <h5>В разделе вещи отсутствуют.&nbsp;<a href="/thing_add"> Добавить?</a></h5>
    </div>)
};

export default Things;

function Enter(): React.MouseEventHandler<HTMLInputElement> | undefined {
    throw new Error("Function not implemented.");
}
