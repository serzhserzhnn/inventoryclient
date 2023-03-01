import React, {useState, ChangeEvent} from "react";
import TutorialDataService from "../services/CategoryService";
import ITutorialData from '../types/Category';

const AddTutorial: React.FC = () => {
    const initialTutorialState = {
        id: null,
        name: ""
    };
    const [tutorial, setTutorial] = useState<ITutorialData>(initialTutorialState);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setTutorial({...tutorial, [name]: value});
    };

    const saveTutorial = () => {
        var data = {
            name: tutorial.name
        };

        TutorialDataService.create(data)
            .then((response: any) => {
                setTutorial({
                    id: response.data.id,
                    name: response.data.name
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const newTutorial = () => {
        setTutorial(initialTutorialState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newTutorial}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={tutorial.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>
                    <button onClick={saveTutorial} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddTutorial;