import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import ICategoryData from '../../types/Category';
import {getCurrentUser} from "../../services/authservice/auth.service";
import CategoryDataService from "../../services/CategoryService";

const Categories: React.FC = () => {

    const [categories, setCategories] = useState<Array<ICategoryData>>([]);

    useEffect(() => {
        retrieveCategories();
    }, []);

    const retrieveCategories = () => {
        CategoryDataService.getAll()
            .then((response: any) => {
                setCategories(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteCategory = (id: any) => {
        if (window.confirm("Delete Category?") == true)
            CategoryDataService.remove(id)
                .then((response: any) => {
                    console.log(response.data);
                    retrieveCategories();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
    };

    const currentUser = getCurrentUser();

    let adminUser = false;

    if (currentUser !== null) {
        adminUser = currentUser.roles.includes("ROLE_MODERATOR") ||
            currentUser.roles.includes("ROLE_ADMIN");
    }

    if (currentUser !== null)
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
                                <h5>
                                    {category.name}
                                </h5>
                                <Link
                                    to={"/category/" + category.id}
                                    className="badge badge-warning mr-2"
                                >
                                    Edit
                                </Link>
                                <Link
                                    to={"/things/" + category.id}
                                    className="badge badge-warning mr-2"
                                >
                                    Things from Category
                                </Link>
                                {adminUser &&
                                <button className="badge badge-danger mr-2"
                                        onClick={() => deleteCategory(category.id)}>
                                    Delete
                                </button>}
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
                    {adminUser &&
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Add Category</h5>
                            {/*<p className="card-text">View all things.</p>*/}
                            <a href="/category_add" className="btn btn-primary">Create category </a>
                        </div>
                    </div>}
                </div>
            </div>
        );
    else return (<div>
        <h5>Access is denied .&nbsp;<a href="/login"> Зарегистрироваться?</a></h5>
    </div>);
};

export default Categories;