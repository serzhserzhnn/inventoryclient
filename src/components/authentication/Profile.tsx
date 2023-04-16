import React, {useState} from "react";
import {getCurrentUser, updatePass} from "../../services/authservice/auth.service";
import * as Yup from "yup";
import IUser from "../../types/User";
import {ErrorMessage, Field, Form, Formik} from "formik";

const Profile: React.FC = () => {
    const currentUser = getCurrentUser();

    const [successful, setSuccessful] = useState<boolean>(false);
    const [messageAlert, setMessageAlert] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const initialValues: IUser = {
        email: "", username: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .test(
                "len",
                "The name must be between 6 and 25 characters.",
                (val: any) =>
                    val &&
                    val.toString().length >= 6 &&
                    val.toString().length <= 25
            ).required('name is required')
    });

    const handleRegister = (formValue: IUser) => {
        const {password} = formValue;

        updatePass(currentUser.id, password).then(
            (response) => {
                setMessageAlert(response.data.message);
                setMessage("The Password was updated successfully!");
                setSuccessful(true);
            },
            (error) => {
                const resMessageAlert =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessageAlert(resMessageAlert);
                setSuccessful(false);
            }
        );
    };

    if (currentUser !== null)
        return (
            <div>
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
                <div className="submit-form">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleRegister}
                    >
                        <Form>
                            {!successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="password"> password </label>
                                        <Field name="password" type="text" className="form-control"/>
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                    </div>
                                </div>
                            )}

                            {messageAlert && (
                                <div className="form-group">
                                    <div
                                        className={
                                            successful ? "alert alert-success" : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {messageAlert}
                                    </div>
                                </div>
                            )}
                        </Form>
                    </Formik>
                    <p>{message}</p>
                </div>

            </div>
        );
    else return (<div>
        <h5>Access is denied .&nbsp;<a href="/login"> Зарегистрироваться?</a></h5>
    </div>);
};

export default Profile;