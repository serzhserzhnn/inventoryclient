// https://schema.org/Product
//     https://schema.org/Thing

import React, {useState, useEffect, ChangeEvent} from "react";
import {useParams, useNavigate} from 'react-router-dom';

import ThingDataService from "../../services/ThingsService";
import ThingListDataService from "../../services/ThingsListService";
import IThingData from "../../types/Thing";
import {getCurrentUser} from "../../services/authservice/auth.service";

const Thing: React.FC = () => {
    const {id} = useParams();
    let navigate = useNavigate();

    const initialThingState = {
        id: null,
        name: "",
        description: "",
        category: 0
    };
    const [currentThing, setCurrentThing] = useState<IThingData>(initialThingState);
    const [message, setMessage] = useState<string>("");

    const getThing = (id: string) => {
        ThingDataService.get(id)
            .then((response: any) => {
                setCurrentThing(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getThing(id);
    }, [id]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setCurrentThing({...currentThing, [name]: value});
    };

    const updateThing = () => {
        ThingDataService.update(currentThing.id, currentThing)
            .then((response: any) => {
                console.log(response.data);
                setMessage("The Thing was updated successfully!");
                navigate(-1);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteThing = () => {
        ThingDataService.remove(currentThing.id)
            .then((response: any) => {
                console.log(response.data);
                navigate(-1);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const addToList =
        (thingId: string, name: string, description: string, category: number, user: number) => {
            ThingListDataService.create(thingId, name, description, category, user)
                .then((response: any) => {
                    console.log(response.data);
                    setMessage("The Thing added successfully to List!");
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }

    const currentUser = getCurrentUser();

    if (currentUser !== null) {
        return (
            <div>
                {currentThing ? (
                    <div className="edit-form">
                        <h4>Thing</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={currentThing.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={currentThing.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="category"
                                    name="category"
                                    value={currentThing.category}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>

                        <button className="badge badge-danger mr-2" onClick={deleteThing}>
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success mr-2"
                            onClick={updateThing}
                        >
                            Update
                        </button>
                        <button className="badge badge-info mr-2"
                                onClick={() => addToList(
                                    currentThing.id, currentThing.name,
                                    currentThing.description, currentThing.category, currentUser.id)
                                }>
                            addToList
                        </button>
                        <p>{message}</p>
                        <br/>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Thing...</p>
                    </div>
                )}
            </div>
        );
    } else return (<div>
        <h5>Access is denied .&nbsp;<a href="/login"> Зарегистрироваться?</a></h5>
    </div>);
};

export default Thing;