import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Adder.css";

function Adder() {
    // Initialize state variables using useState hook
    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);
    const [description, setDescription] = useState("");
    const [error, setError] = useState({
        title_err: "",
        desc_err: "",
        date_err: "",
        message: "",
        status: "",
    });

    const handleConfirmClick = (event) => {
        event.preventDefault();

        // Reset error messages
        setError({
            title_err: "",
            desc_err: "",
            date_err: "",
            message: "",
            status: "",
        });

        // Frontend validation
        if (!taskName.trim()) {
            setError((prevState) => ({
                ...prevState,
                title_err: "Task Name is required.",
            }));
        }
        if (!description.trim()) {
            setError((prevState) => ({
                ...prevState,
                desc_err: "Description is required.",
            }));
        }
        const currentDate = new Date().toISOString().split("T")[0]; // Get current date as a string
        const selectedDate = new Date(dueDate).toISOString().split("T")[0]; // Convert dueDate to Date object and then to string

        const hasError = selectedDate < currentDate;
        if (hasError) {
            setError((prevState) => ({
                ...prevState,
                date_err: "Due date cannot be before today.",
            }));
        }

        // Prepare data object to be inserted
        const taskData = {
            title: taskName,
            description: description,
            dueDate: dueDate,
        };

        // Send data to the server using fetch
        fetch("http://localhost:8888/localhost/taskmanagement/backend/insertData.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.title_err || data.desc_err) {
                    setError(data);
                } else if (data.message) {
                    console.log("Server response:", data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };


    // Render the component
    return (
        <div>
            <div className="mainCont1">
                <div className="container1">
                    <form onSubmit={handleConfirmClick} className="form">
                        <div className="fit">
                            <h1 className="AddTitle">Add Task</h1>
                            <label className="column">
                                Task Name:
                                <input
                                    className="input"
                                    type="text"
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                />
                                <span className="error" style={{ color:'pink' }} >{error.title_err}</span>
                            </label>
                            <label className="column">
                                Due Date:
                                <input
                                    className="input"
                                    type="date"
                                    name="date"
                                    id="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                                <span className="error" style={{ color:'pink' }} >{error.date_err}</span>
                            </label>
                            <label className="column">
                                Description:
                                <input
                                    className="input"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <span className="error" style={{ color:'pink' }}>{error.desc_err}</span>
                            </label>
                            <div className="buttons1">
                                <Link to="/" className="buts1">
                                    Close
                                </Link>
                                <button type="submit" className="buts1">
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Adder;
