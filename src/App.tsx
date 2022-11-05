import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import Categories from "./components/Categories";
import Category from "./components/Category";
import Things from "./components/Things";
import Thing from "./components/Thing";
import AddCategory from "./components/AddCategory";
import AddThing from "./components/AddThing";

const App: React.FC = () => {
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand">
            Inventory Service
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item2">
              <Link to={"/tutorials2"} className="nav-link">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/things"} className="nav-link">
                Things
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TutorialsList/>} />
            <Route path="/tutorials" element={<TutorialsList/>} />
            <Route path="/tutorials2" element={<Categories/>} />
            <Route path="/add" element={<AddTutorial/>} />
            <Route path="/tutorials/:id" element={<Tutorial/>} />
            <Route path="/category/:id" element={<Category/>} />
            <Route path="/things/" element={<Things/>} />
            <Route path="/things/:id" element={<Things/>} />
            <Route path="/thing/:id" element={<Thing/>} />
            <Route path="/category_add" element={<AddCategory/>} />
            <Route path="/thing_add" element={<AddThing/>} />
          </Routes>
        </div>
      </div>
  );
}

export default App;