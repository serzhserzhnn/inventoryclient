import React, {useState, useEffect, ChangeEvent} from "react";
import {useParams, useNavigate} from 'react-router-dom';

import ThingDataService from "../services/ThingsService";
import IThingData from "../types/Thing";

const Thing: React.FC = () => {
    const {id} = useParams();
    let navigate = useNavigate();

    const initialThingState = {
        id: null,
        name: "",
        description: ""
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

    const updatePublished = (status: boolean) => {
        var data = {
            id: currentThing.id,
            name: currentThing.name,
            description: currentThing.description
        };

        ThingDataService.update(currentThing.id, data)
            .then((response: any) => {
                console.log(response.data);
                setMessage("The status was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const updateThing = () => {
        ThingDataService.update(currentThing.id, currentThing)
            .then((response: any) => {
                console.log(response.data);
                setMessage("The Thing was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteCategory = () => {
        ThingDataService.remove(currentThing.id)
            .then((response: any) => {
                console.log(response.data);
                //navigate("/things");
                navigate(-1);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentThing ? (
                <div className="edit-form">
                    <h4>Thing</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentThing.name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>

                    <button className="badge badge-danger mr-2" onClick={deleteCategory}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateThing}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                    <br/>
                    <div>
                        <label>Наименование: </label>
                        {currentThing.name}
                    </div>

                </div>
            ) : (
                <div>
                    <br/>
                    <p>Please click on a Thing...</p>
                </div>
            )}
        </div>
    );
};

export default Thing;