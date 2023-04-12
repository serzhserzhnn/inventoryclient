import React, {useState, useEffect, ChangeEvent} from "react";
import {useParams, useNavigate, Link} from 'react-router-dom';

import ThingsListDataService from "../../services/ThingsListService";
import IThingsData from '../../types/ThingList';
import {getCurrentUser} from "../../services/authservice/auth.service";
import ThingDataService from "../../services/ThingsService";

const ThingsList: React.FC = () => {
    const {id} = useParams();
    let navigate = useNavigate();

    const [things, setThings] = useState<Array<IThingsData>>([]);
    const [currentThing, setCurrentThing] = useState<IThingsData | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchName, setSearchName] = useState<string>("");

    const [currentThingCheck, setCurrentThingCheck] = useState<boolean>();

    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        retrieveThings();
    }, []);

    const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveThings = () => {
        if (currentUser !== null)
            ThingsListDataService.getAll(currentUser.id)
                .then((response: any) => {
                    const newData = response.data.map((item: any, idx: any) => {
                        console.log("thingId: " + item.thingId);
                        if (item.thingId != 5)
                            return {...item, ...{check_thing: "true"}, ...{color: "text-danger"}}
                        else return {...item, ...{check_thing: "false"}, ...{color: "text-danger"}};
                    });
                    setThings(newData);
                    console.log((newData))
                })
                .catch((e: Error) => {
                    console.log(e);
                });
    };

    const setCategory = new Set<boolean>();

    function logSetElementsC(value1: any) {
        ThingDataService.chk(value1)
            .then((response: any) => {
                console.log(response.data)
                setCategory.add(response.data)
                console.log(setCategory.size)
            })
    }

    const getThingCheck = (id: any) => {
        ThingDataService.chk(id)
            .then((response: any) => {
                //console.log(response.data)
                setCurrentThingCheck(response.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteThing = (id: any) => {
        ThingsListDataService.remove(id)
            .then((response: any) => {
                navigate("/things_list");
                window.location.reload();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteThingAll = (user: any) => {
        ThingsListDataService.removeAll(user)
            .then((response: any) => {
                navigate("/things_list");
                window.location.reload();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const sendMail = () => {
        ThingsListDataService.sendMail(currentUser.id);
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

    let colorThing;

    const currentUser = getCurrentUser();

    if (currentUser !== null) {
        if (things.length !== 0)
            return (
                <div className="list row">
                    <div className="col-md-6">
                        <h4>Things List</h4>
                        <button className="badge badge-success mr-2"
                                onClick={() => sendMail()}>
                            sendMail
                        </button>
                        <button className="badge badge-danger mr-2"
                                onClick={() => deleteThingAll(currentUser.id)}>
                            Delete All
                        </button>

                        <table className="table table-dark">
                            <thead>
                            <tr>
                                <th scope="col">chk</th>
                                <th scope="col">id</th>
                                <th scope="col">thingId</th>
                                <th scope="col">name</th>
                                <th scope="col">description</th>
                                <th scope="col">category</th>
                                <th scope="col">user</th>
                                <th scope="col">action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {things &&
                            things.map((thing, index) => (
                                // {colorThing = thing.color})
                                <tr className={`text-${thing.color}`}>
                            {/*className={getName(thing.thingId)}*/}
                                <th scope="row">{thing.check_thing + "  " + thing.color}</th>
                                <th scope="row">{thing.id}</th>
                                <th scope="row">{thing.thingId}</th>
                                <td>{thing.name}</td>
                                <td>{thing.description}</td>
                                <td>{thing.category}</td>
                                <td>{thing.user}</td>
                                <td>
                            {<Link
                                to={"/thing/" + thing.thingId}
                                className="badge badge-warning"
                                >
                                View
                                </Link>}
                                <button className="badge badge-danger mr-2"
                                onClick={() => deleteThing(thing.id)}>
                                Delete
                                </button>
                                </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        else return (<div>
            <h5>List is empty.&nbsp;<a href="/things"> Add Things?</a></h5>
        </div>)
    } else return (<div>
        <h5>Access is denied .&nbsp;<a href="/login"> Зарегистрироваться?</a></h5>
    </div>);
};

export default ThingsList;

function Enter(): React.MouseEventHandler<HTMLInputElement> | undefined {
    throw new Error("Function not implemented.");
}
