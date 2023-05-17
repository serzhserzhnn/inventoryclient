import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import ICategoryData from '../../types/Category';
import {getCurrentUser} from "../../services/authservice/auth.service";
import CategoryDataService from "../../services/CategoryService";
import ThingsDataService from "../../services/ThingsService";

import {INITIAL_CONFIG} from "../../config-dummy";
import * as S from "../modals/styles";
import Modal from "../modals/Modal";

const Categories: React.FC = () => {

    const [categories, setCategories] = useState<Array<ICategoryData>>([]);
    const [count, setCount] = useState<any>("");
    const [categoryId, setCategoryId] = useState<number>();
    const [showDelete, setShowDelete] = useState<boolean>(false)

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
        CategoryDataService.remove(id)
            .then((response: any) => {
                console.log(response.data);
                retrieveCategories();
            })
            .catch((e: Error) => {
                console.log(e);
            });
        setShowDelete(!showDelete)
    };

    const btnShow = (id: any) => {
        ThingsDataService.getCountFromCategory(id)
            .then((response: any) => {
                setCount(response.data.length);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        setShowDelete(true);
        setCategoryId(id);
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
                                        onClick={() => btnShow(category.id)}>
                                    Delete
                                </button>}
                            </div>
                        </div>
                    ))}
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">All Things</h5>
                            <p className="card-text">View all things.</p>
                            <Link to={"/things"}
                                  className="btn btn-primary">
                                Get all things
                            </Link>
                        </div>
                    </div>
                    {adminUser &&
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Add Category</h5>
                            <Link to={"/category_add"}
                                  className="btn btn-primary">
                                Create category
                            </Link>
                        </div>
                    </div>}
                </div>
                <Modal show={showDelete} setShow={setShowDelete} config={INITIAL_CONFIG.modal1}>
                    <>
                        {count > 0 && <p>This Category include {count} Things.</p>}
                    </>
                    <p>Delete Category?</p>
                    <S.ModalFooter>
                        <S.ModalButtonSecondary onClick={() => setShowDelete(!showDelete)}>
                            Cancel
                        </S.ModalButtonSecondary>
                        <S.ModalButtonPrimary onClick={() => deleteCategory(categoryId)}>
                            Delete
                        </S.ModalButtonPrimary>
                    </S.ModalFooter>
                </Modal>
            </div>
        );
    else return (<div>
        <h5>Access is denied .&nbsp;<a href="/login"> Зарегистрироваться?</a></h5>
    </div>);
};

export default Categories;