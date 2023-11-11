import React, { useEffect, useState } from "react";
import "./Component.css";
import {Link} from "react-router-dom";

function Component() {
    const [items, setItems] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('http://localhost:8888/localhost/taskmanagement/backend/getAllTasks.php')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setIsDropdownOpen(new Array(data.length).fill(false));
                setItems(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const toggleDropdown = (index) => {
        const updatedDropdownState = [...isDropdownOpen];
        updatedDropdownState[index] = !updatedDropdownState[index];
        setIsDropdownOpen(updatedDropdownState);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8888/localhost/taskmanagement/backend/deleteTask.php`, {
            method: 'DELETE',
            body: JSON.stringify({ id: id }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Handle the response as needed
                // For example, you can show a message to the user or update the state
                fetchData(); // Refresh the data after deletion
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    };

    return (
        <div className="mainComponent">
            {items.map((task, index) => (
                <div className={`box ${isDropdownOpen[index] ? "expanded" : ""}`} key={task.id} onClick={() => toggleDropdown(index)}>
                    <div className="title">
                        <h1 className="taskTitle">{task.title}</h1>
                        <div className="row">
                            <h3 className="due">Due Date: </h3>
                            {task.due_date}
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="desc">
                            {task.description}
                        </div>
                        <div className="stat">
                            <div className="row">
                                <h3 className="created">Status:</h3>
                                <p className="margin"> {task.status}</p>
                            </div>
                            <div className="row">
                                <h3 className="created">Created at: </h3>
                                <p className="margin"> {task.created_at}</p>
                            </div>
                        </div>
                    </div>
                    {isDropdownOpen[index] && (
                        <div className="buttons">
                            <Link to="/EditTask" className="buts">Edit</Link>
                            <button className="buts" onClick={() => handleDelete(task.id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Component;
