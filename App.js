import React from 'react';
import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/DataAdd" element={<AddTask /> } />
                    <Route path="/EditTask" element={<EditTask /> } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
