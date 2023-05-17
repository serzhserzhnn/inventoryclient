import React, {useEffect, useState} from "react";
import {Routes, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Categories from "./components/categories/Categories";
import Category from "./components/categories/Category";
import Things from "./components/things/Things";
import Thing from "./components/things/Thing";
import AddCategory from "./components/categories/AddCategory";
import AddThing from "./components/things/AddThing";
import ThingsList from "./components/thingslist/ThingsList";

import * as AuthService from "./services/authservice/auth.service";
import IUser from './types/User';

import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Profile from "./components/authentication/Profile";
import Test from "./components/test/test"

import EventBus from "./common/EventBus";
import Charts from "./components/charts/Charts";
import Users from "./components/users/Users";
import {darkTheme, GlobalStyles, lightTheme} from "./styles/theme";
import {ThemeProvider} from "styled-components";
import ChangeTheme from "./components/layout/ChangeTheme";

const App: React.FC = () => {
    const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }

        EventBus.on("logout", logOut);

        return () => {
            EventBus.remove("logout", logOut);
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setShowAdminBoard(false);
        setCurrentUser(undefined);
    };

    const [theme, setTheme] = useState("light")
    const isDarkTheme = theme === "dark"

    return (
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <>
                <GlobalStyles/>
                <main>
                    <div>
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <Link to={"/"} className="navbar-brand">
                                Inventory Service
                            </Link>
                            <div className="navbar-nav mr-auto">
                                {currentUser && (
                                    <li className="nav-item">
                                        <Link to={"/categories"} className="nav-link">
                                            Categories
                                        </Link>
                                    </li>
                                )}
                                {currentUser && (<li className="nav-item">
                                    <Link to={"/things"} className="nav-link">
                                        Things
                                    </Link>
                                </li>)}
                                {currentUser && (<li className="nav-item">
                                    <Link to={"/things_list"} className="nav-link">
                                        List of Things
                                    </Link>
                                </li>)}
                                {currentUser && (<li className="nav-item">
                                    <Link to={"/charts"} className="nav-link">
                                        Charts
                                    </Link>
                                </li>)}
                                {showAdminBoard && (
                                    <li className="nav-item">
                                        <Link to={"/users"} className="nav-link">
                                            Users
                                        </Link>
                                    </li>
                                )}
                                {currentUser && (<li className="nav-item">
                                    <Link to={"/test"} className="nav-link">
                                        Test
                                    </Link>
                                </li>)}

                                <ChangeTheme isDarkTheme={isDarkTheme} setTheme={setTheme}/>
                            </div>

                            {currentUser ? (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/profile"} className="nav-link">
                                            {currentUser.username}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/login"} className="nav-link" onClick={logOut}>
                                            LogOut
                                        </Link>
                                    </li>
                                </div>
                            ) : (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/login"} className="nav-link">
                                            Login
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to={"/register"} className="nav-link">
                                            Sign Up
                                        </Link>
                                    </li>
                                </div>
                            )}
                        </nav>

                        <div className="container mt-3">
                            <Routes>
                                <Route path="/" element={<Categories/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/profile" element={<Profile/>}/>
                                <Route path="/categories" element={<Categories/>}/>
                                <Route path="/category/:id" element={<Category/>}/>
                                <Route path="/things/" element={<Things/>}/>
                                <Route path="/things/:id" element={<Things/>}/>
                                <Route path="/thing/:id" element={<Thing/>}/>
                                <Route path="/category_add" element={<AddCategory/>}/>
                                <Route path="/thing_add" element={<AddThing/>}/>
                                <Route path="/things_list" element={<ThingsList/>}/>
                                <Route path="/charts" element={<Charts/>}/>
                                <Route path="/users" element={<Users/>}/>
                                <Route path="/test" element={<Test/>}/>
                            </Routes>
                        </div>

                    </div>
                </main>
            </>
        </ThemeProvider>
    );
};

export default App;