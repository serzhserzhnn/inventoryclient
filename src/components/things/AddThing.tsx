import React, {useEffect, useState} from "react";
import ThingDataService from "../../services/ThingsService";
import IThingData from '../../types/Thing';
import * as Yup from 'yup';
import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import ICategoryData from "../../types/Category";
import CategoryDataService from "../../services/CategoryService";
import {getCurrentUser} from "../../services/authservice/auth.service";

const AddThing: React.FC = () => {
    let navigate = useNavigate();

    const currentUser = getCurrentUser();

    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [categories, setCategories] = useState<Array<ICategoryData>>([]);

    //const [currentDate, setCurrentDate] = useState(String);
    const [expdate, setExpdate] = useState(false);

    const initialValues: IThingData = {
        name: "", category: 0, dateEnd: "9999-12-31",
        description: "", location: "", quantity: 1, userId: currentUser.id
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
        location: Yup.string()
            .required('location is required'),
        category: Yup.number()
            .min(1, "Category not selected")
            .required('Category not selected'),
        quantity: Yup.number()
            .typeError('Quantity must be a number')
            .min(1, "Quantity less than one")
            .required('quantity is required'),
        dateEnd: Yup.date()
            .typeError('Quantity must be a number')
            .required('quantity is required')
    });

    const handleRegister = (formValue: IThingData) => {
        const {
            name, description, location,
            category,
            quantity,
            dateEnd,
            userId
        } = formValue;

        ThingDataService.create(name,
            description,
            location,
            category,
            quantity,
            dateEnd,
            userId).then(
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

    const checkboxHandler = () => {
        // if (expdate === true) {
        //     setCurrentDate(initialValues.dateEnd);
        // } else {
        //     setCurrentDate((new Date()).toDateString());
        // }
        setExpdate(!expdate);
    }

    if (currentUser !== null) {
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
                                    <label htmlFor="location"> location </label>
                                    <Field name="location" type="text" className="form-control"/>
                                    <ErrorMessage
                                        name="location"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category"> category </label>
                                    <Field as="select" name="category" className="form-control" id="category">
                                        <option value="">Select category</option>
                                        {categories &&
                                        categories.map((category, index) => (
                                            <option value={category.id}>{category.name}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage
                                        name="category"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="quantity"> quantity </label>
                                    <Field name="quantity" type="text" className="form-control"/>
                                    <ErrorMessage
                                        name="quantity"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="container">
                                    <div>
                                        <input type="checkbox" id="expdate" onChange={checkboxHandler}/>
                                        <label htmlFor="expdate"> expiration date</label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <Field name="dateEnd" type="date" className="form-control" hidden={!expdate}/>
                                    <ErrorMessage
                                        name="dateEnd"
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
    } else return (<div>
        <h5>Access is denied .&nbsp;<a href="/login"> Зарегистрироваться?</a></h5>
    </div>);
};

export default AddThing;