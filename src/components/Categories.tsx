import React, {useState, useEffect, ChangeEvent} from "react";
import {Link} from "react-router-dom";
import CategoryService from "../services/CategoryService";
import ICategoryData from '../types/Category';

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Array<ICategoryData>>([]);
    const [currentCategory, setCurrentCategory] = useState<ICategoryData | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    useEffect(() => {
        retrieveCategories();
    }, []);

    const retrieveCategories = () => {
        CategoryService.getAll()
            .then((response: any) => {
                setCategories(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const setActiveCategory = (category: ICategoryData, index: number) => {
        setCurrentCategory(category);
        setCurrentIndex(index);
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <div>
                    <h4>Categories</h4>
                </div>
            </div>
            <div className="card-columns">
                {categories &&
                categories.map((category, index) => (
                    <div className="card">
                        <div className="card-body">
                            <h5
                                // className={
                                //     "card-title" + (index === currentIndex ? "active" : "")
                                // }
                                // onClick={() => setActiveCategory(category, index)}
                                // key={"/things/" + category.id}
                            >
                                {category.name}
                            </h5>
                            <Link
                                to={"/category/" + category.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                            <Link
                                to={"/things/" + category.id}
                                className="badge badge-warning"
                            >
                                Things from Category
                            </Link>
                        </div>
                    </div>
                ))}
                <div className="card text-center">
                    <div className="card-body">
                        <h5 className="card-title">All Things</h5>
                        <p className="card-text">View all things.</p>
                        <a href="/things" className="btn btn-primary">Get all things</a>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="card-body">
                        <h5 className="card-title">Add Category</h5>
                        {/*<p className="card-text">View all things.</p>*/}
                        <a href="/category_add" className="btn btn-primary">Create category </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;