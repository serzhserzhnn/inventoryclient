import React, {useState, useEffect, ChangeEvent} from "react";
import {useNavigate, Link} from 'react-router-dom';

import UserDataService from "../../services/authservice/auth.service";
import IUserData from '../../types/User';
import * as AuthService from "../../services/authservice/auth.service";

const Users: React.FC = () => {
    let navigate = useNavigate();

    const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<boolean>(false);
    const [users, setUsers] = useState<Array<IUserData>>([]);
    const [searchName, setSearchName] = useState<string>("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            setCurrentUser(!user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    useEffect(() => {
        retrieveUsers();
    }, []);

    const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearchName(searchValue);
    };

    const retrieveUsers = () => {
        UserDataService.getAll()
            .then((response: any) => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const findByName = () => {
        UserDataService.findByName(searchName)
            .then((response: any) => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteUser = (id: any) => {
        UserDataService.remove(id)
            .then((response: any) => {
                navigate("/users");
                window.location.reload();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    if (showAdminBoard) {
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                            value={searchName}
                            onChange={onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-primary"
                                type="button"
                                onClick={findByName}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Users List</h4>

                    <table className="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">username</th>
                            <th scope="col">email</th>
                            <th scope="col">roles</th>
                            <th scope="col">action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users &&
                        users.map((user, index) => (
                            <tr>
                                <th scope="row">{user.id}</th>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>role</td>
                                <td>
                                    <Link
                                        to={"/thing/" + user.id}
                                        className="badge badge-warning"
                                    >
                                        Edit
                                    </Link>
                                    <button className="badge badge-danger mr-2"
                                            onClick={() => deleteUser(user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else if (currentUser) return (<div>
        <h5>Admin access only.</h5>
    </div>);
    else return (<div>
            <h5>Access is denied .&nbsp;<a href="/login"> Зарегистрироваться?</a></h5>
        </div>);
};

export default Users;

function Enter(): React.MouseEventHandler<HTMLInputElement> | undefined {
    throw new Error("Function not implemented.");
}
