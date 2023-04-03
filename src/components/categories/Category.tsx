import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import CategoryDataService from "../../services/CategoryService";
import {update} from "../../services/CategoryService";
import ICategoryData from "../../types/Category";

const Category: React.FC = () => {
    const { id }= useParams();
    let navigate = useNavigate();

    const initialCategoryState = {
        id: null,
        name: ""
    };
    const [currentCategory, setCurrentCategory] = useState<ICategoryData>(initialCategoryState);
    const [message, setMessage] = useState<string>("");

    const getCategory = (id: string) => {
        CategoryDataService.get(id)
            .then((response: any) => {
                setCurrentCategory(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getCategory(id);
    }, [id]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentCategory({ ...currentCategory, [name]: value });
    };

    const updateCategory = () => {
        update(currentCategory.id, currentCategory)
            .then((response: any) => {
                console.log(currentCategory.id);
                console.log(currentCategory);
                console.log(response.data);
                setMessage("The Category was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteCategory = () => {
        CategoryDataService.remove(currentCategory.id)
            .then((response: any) => {
                console.log(response.data);
                navigate("/categories");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentCategory ? (
                <div className="edit-form">
                    <h4>Category</h4>
                    <form>
                        <div className="form-group">
                            {/*<label htmlFor="name">Title</label>*/}
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentCategory.name}
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
                        onClick={updateCategory}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Category...</p>
                </div>
            )}
        </div>
    );
};

export default Category;