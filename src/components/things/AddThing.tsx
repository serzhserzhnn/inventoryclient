import React, {useState} from "react";
import ThingDataService from "../../services/ThingsService";
import IThingData from '../../types/Thing';
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";

const AddThing: React.FC = () => {
    let navigate = useNavigate();

    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const initialValues: IThingData = {
        name: "",
        description: "",
        category: 0
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
            ).required('name is required'),
        description: Yup.string()
            .required('description is required'),
        category: Yup.number()
            .min(1, "Must be more than 1 characters")
            .required('category is required')
    });

    const handleRegister = (formValue: IThingData) => {
        const {name, description, category} = formValue;

        ThingDataService.create(name, description, category).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                navigate("/thing_add");
                window.location.reload();
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
                                <label htmlFor="description"> description </label>
                                <Field name="description" type="text" className="form-control"/>
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category"> category </label>
                                <Field name="category" type="text" className="form-control"/>
                                <ErrorMessage
                                    name="category"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </div>
                            <button type="button"
                                    // onClick={() => reset()}
                                    className="btn btn-primary btn-block"
                            >
                                Reset
                            </button>
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

    //                 <div className="form-group">
    //                     <label htmlFor="name">Category</label>
    //                     <select
    //                         value={thing.category}
    //                         className="form-control"
    //                         id="category"
    //                         required
    //                         // onChange={handleInputChange}
    //                         name="category">
    //                         <option selected>Выберите категорию</option>
    //                         <option value={1}>Лекарства</option>
    //                         <option value={2}>Инструменты</option>
    //                         <option value={3}>Прочее</option>
    //                     </select>
    //                 </div>
};

export default AddThing;