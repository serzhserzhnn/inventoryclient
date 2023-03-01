import React, {useState, ChangeEvent} from "react";
import ThingDataService from "../../services/ThingsService";
import IThingData from '../../types/Thing';

const AddThing: React.FC = () => {
    const initialThingState = {
        id: null,
        name: "",
        description: "",
        category: 0
    };
    const [thing, setThing] = useState<IThingData>(initialThingState);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setThing({...thing, [name]: value});
    };

    const saveThing = () => {
        let data = {
            name: thing.name,
            description: thing.description,
            category: thing.category
        };

        ThingDataService.create(data)
            .then((response: any) => {
                setThing({
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description,
                    category: response.data.category
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const newThing = () => {
        setThing(initialThingState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newThing}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={thing.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={thing.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Category</label>
                        <input
                            type="text"
                            className="form-control"
                            id="category"
                            required
                            value={thing.category}
                            onChange={handleInputChange}
                            name="category"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Category</label>
                        <select
                            value={thing.category}
                            className="form-control"
                            id="category"
                            required
                            // onChange={handleInputChange}
                            name="category">
                            <option selected>Выберите категорию</option>
                            <option value={1}>Лекарства</option>
                            <option value={2}>Инструменты</option>
                            <option value={3}>Прочее</option>
                        </select>
                    </div>

                    <button onClick={saveThing} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddThing;