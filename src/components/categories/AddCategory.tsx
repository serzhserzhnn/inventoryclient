import React, {useState} from "react";
import {create} from "../../services/CategoryService";
import ICategoryData from '../../types/Category';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";

const AddCategory: React.FC = () => {
    let navigate = useNavigate();

    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const initialValues: ICategoryData = {
        name: ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .test(
                "len",
                "The name must be between 2 and 25 characters.",
                (val: any) =>
                    val &&
                    val.toString().length >= 2 &&
                    val.toString().length <= 25
            )
            .required("This field is required!")
    });

    const handleRegister = (formValue: ICategoryData) => {
        const {name} = formValue;

        create(name).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                navigate("/categories");
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        );
    };

    return (
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
                                <label htmlFor="name"> name </label>
                                <Field name="name" type="text" className="form-control"/>
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    successful ? "alert alert-success" : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                </Form>
            </Formik>
        </div>
    );
};

export default AddCategory;