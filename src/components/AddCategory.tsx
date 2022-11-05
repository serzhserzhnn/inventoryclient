import React, { useState, ChangeEvent } from "react";
import CategoryDataService from "../services/CategoryService";
import ICategoryData from '../types/Category';

const AddCategory: React.FC = () => {
    const initialCategoryState = {
        id: null,
        name: ""
    };
    const [category, setCategory] = useState<ICategoryData>(initialCategoryState);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCategory({ ...category, [name]: value });
    };

    const saveCategory = () => {
        let data = {
            name: category.name
        };

        CategoryDataService.create(data)
            .then((response: any) => {
                setCategory({
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

    const newCategory = () => {
        setCategory(initialCategoryState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newCategory}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Category</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={category.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>
                    <button onClick={saveCategory} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddCategory;