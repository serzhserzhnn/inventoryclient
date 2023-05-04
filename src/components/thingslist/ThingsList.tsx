import React, {useState, useEffect, ChangeEvent} from "react";
import {useParams, Link} from 'react-router-dom';
import ThingsListDataService from "../../services/ThingsListService";
import IThingsData from '../../types/ThingList';
import {getCurrentUser} from "../../services/authservice/auth.service";
import ThingDataService from "../../services/ThingsService";
import {message} from "antd";
import {CSVLink} from "react-csv";

const ThingsList: React.FC = () => {

    const {id} = useParams();

    const [things, setThings] = useState<Array<IThingsData>>([]);
    const [allThings, setAllThings] = useState<Array<IThingsData>>([]);
    const [searchName, setSearchName] = useState<string>("");

    const [currentThingCheck, setCurrentThingCheck] = useState<string>("true");

    const [ids, setIds] = useState<Array<String>>([]);

    const check = "false";

    const headers = [
        {label: "Id", key: "id"},
        {label: "thingId", key: "thingId"},
        {label: "name", key: "name"},
        {label: "description", key: "description"},
        {label: "location", key: "location"},
        {label: "dateEnd", key: "dateEnd"},
        {label: "quantity", key: "quantity"}
    ];

    const csvReport = {
        data: things,
        headers: headers,
        filename: 'List_Report_' + Date.now() + '.csv',
        separator: ";"
    };

    useEffect(() => {
        //getAllThings();
        retrieveThings();
    }, []);

    const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    // const getAllThings = () => {
    //     ThingDataService.getAllChats()
    //         .then((response: any) => {
    //             setAllThings(response.data);
    //             console.log(response.data);
    //         })
    //         .catch((e: Error) => {
    //             console.log(e);
    //         });
    // }

    // const getThingCheck = (id: any) => {
    //     ThingDataService.chk(id)
    //         .then((response: any) => {
    //             console.log("getThingCheck (" + id + ") - " + response.data)
    //             if (response.data == "false") setCurrentThingCheck("false")
    //         })
    //         .catch((e: Error) => {
    //             console.log(e);
    //         });
    // };

    const retrieveThings = () => {
        if (currentUser !== null)
            ThingsListDataService.getAll(currentUser.id)
                .then((response: any) => {
                    if (response.data.length > 0) {
                        const newData = response.data.map((item: any, idx: any) => {
                            return {
                                ...item, ...{
                                    check_thing: currentThingCheck
                                }
                            }
                            //else return {...item, ...{check_thing: "false"}, ...{color: "text-danger"}};
                        });
                        setThings(newData);
                        console.log((newData))
                    }
                })
                .catch((e: Error) => {
                    console.log(e);
                });
    };

    function logSetElements(value1: any) {
        ThingDataService.chk(value1)
            .then((response: any) => {
                console.log(response.data)
                return String(response.data)
            })
    }

    const deleteThing = (id: any) => {
        ThingsListDataService.remove(id)
            .then((response: any) => {
                retrieveThings();
                if (things.length -1 < 1) {
                    window.location.reload();
                }
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteThingAll = (user: any) => {
        ThingsListDataService.removeAll(user)
            .then((response: any) => {
                window.location.reload();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    // This function will be triggered when a checkbox changes its state
    const selectThing = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedId = event.target.value;

        // Check if "ids" contains "selectedIds"
        // If true, this checkbox is already checked
        // Otherwise, it is not selected yet
        if (ids.includes(selectedId)) {
            const newIds = ids.filter((id) => id !== selectedId);
            setIds(newIds);
        } else {
            const newIds = [...ids];
            newIds.push(selectedId);
            setIds(newIds);
        }
    };

    // This function will be called when the "REMOVE SELECTED Things" is clicked
    const removeSelectedThings = () => {
        ThingsListDataService.removeSelected(ids)
            .then((response: any) => {
                window.location.reload();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const sendMail = () => {
        ThingsListDataService.sendMail(currentUser.id);
    };

    const currentUser = getCurrentUser();

    if (currentUser !== null) {
        if (things.length !== 0)
            return (
                <div className="list row">
                    <div className="col-md-6">
                        <h4>Things List</h4>
                        <button className="badge badge-success mr-2">
                            <CSVLink
                                {...csvReport}
                                onClick={() => {
                                    message.success("The file is downloading")
                                }}
                            >
                                Export to CSV
                            </CSVLink>
                        </button>
                        <button className="badge badge-success mr-2"
                                onClick={() => sendMail()}>
                            send List to Mail
                        </button>
                        <button className="badge badge-danger mr-2"
                                onClick={() => deleteThingAll(currentUser.id)}>
                            Delete All
                        </button>
                        {ids.length > 0 && (<button className="badge badge-danger mr-2"
                                                    onClick={removeSelectedThings}>
                            Remove Selected Things
                        </button>)}

                        <table className="table table-dark">
                            <thead>
                            <tr>
                                {/*<th scope="col">chk</th>*/}
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
                                <tr className={check == String(thing.check_thing) &&
                                ("text-danger") || ""}>
                                    <th scope="row">{thing.id}</th>
                                    <th scope="row">{thing.thingId}</th>
                                    {/*<th className={"false" || ("text-danger")}*/}
                                    {/*    scope="row">{thing.thingId}</th>*/}
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
                                        <input
                                            type="checkbox"
                                            value={thing.id}
                                            onChange={selectThing}
                                        />
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
