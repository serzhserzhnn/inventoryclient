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
//
import * as AuthService from "./services/authservice/auth.service";
import IUser from './types/User';

import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./components/authentication/Home";
import Profile from "./components/authentication/Profile";
import BoardUser from "./components/authentication/BoardUser";
import BoardModerator from "./components/authentication/BoardModerator";
import BoardAdmin from "./components/authentication/BoardAdmin";

import EventBus from "./common/EventBus";

const App: React.FC = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
    const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }

        EventBus.on("logout", logOut);

        return () => {
            EventBus.remove("logout", logOut);
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setShowModeratorBoard(false);
        setShowAdminBoard(false);
        setCurrentUser(undefined);
    };

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    Inventory Service
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                    </li>

                    {showModeratorBoard && (
                        <li className="nav-item">
                            <Link to={"/mod"} className="nav-link">
                                Moderator Board
                            </Link>
                        </li>
                    )}

                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link">
                                Admin Board
                            </Link>
                        </li>
                    )}

                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/user"} className="nav-link">
                                User
                            </Link>
                        </li>
                    )}
                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/categories"} className="nav-link">
                                Categories
                            </Link>
                        </li>
                    )}

                </div>

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
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
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/user" element={<BoardUser/>}/>
                    <Route path="/mod" element={<BoardModerator/>}/>
                    <Route path="/admin" element={<BoardAdmin/>}/>
                    <Route path="/" element={<Categories/>}/>
                    <Route path="/categories" element={<Categories/>}/>
                    <Route path="/category/:id" element={<Category/>}/>
                    <Route path="/things/" element={<Things/>}/>
                    <Route path="/things/:id" element={<Things/>}/>
                    <Route path="/thing/:id" element={<Thing/>}/>
                    <Route path="/category_add" element={<AddCategory/>}/>
                    <Route path="/thing_add" element={<AddThing/>}/>
                    <Route path="/profile" element={<ThingsList/>}/>
                </Routes>
            </div>

            { /*<AuthVerify logOut={this.logOut}/> */}
        </div>
    );
};

export default App;

//

// const App: React.FC = () => {
//   return (
//       <div>
//         <nav className="navbar navbar-expand navbar-dark bg-dark">
//           <a href="/categories" className="navbar-brand">
//             Inventory Service
//           </a>
//           <div className="navbar-nav mr-auto">
//             <li className="nav-item2">
//               <Link to={"/categories"} className="nav-link">
//                 Categories
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/things"} className="nav-link">
//                 Things
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/thing_add"} className="nav-link">
//                 Add Thing
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/profile"} className="nav-link">
//                 User profile
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/profile"} className="nav-link">
//                 User profile
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/profile"} className="nav-link">
//                 User profile
//               </Link>
//             </li>
//           </div>
//         </nav>
//
//         <div className="container mt-3">
//           <Routes>
//             <Route path="/" element={<Categories/>} />
//             <Route path="/categories" element={<Categories/>} />
//             <Route path="/category/:id" element={<Category/>} />
//             <Route path="/things/" element={<Things/>} />
//             <Route path="/things/:id" element={<Things/>} />
//             <Route path="/thing/:id" element={<Thing/>} />
//             <Route path="/category_add" element={<AddCategory/>} />
//             <Route path="/thing_add" element={<AddThing/>} />
//             <Route path="/profile" element={<ThingsList/>} />
//           </Routes>
//         </div>
//       </div>
//   );
// }
