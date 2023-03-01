import React from "react";
import { getCurrentUser } from "../../services/authservice/auth.service";

const Profile: React.FC = () => {
    const currentUser = getCurrentUser();

    if (currentUser !== null)
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.roles &&
                currentUser.roles.map((role: string, index: number) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    );
    else return (<div>
        <h5>Access is denied  .&nbsp;<a href="/login"> Зарегистрироваться?</a></h5>
    </div>);
};

export default Profile;