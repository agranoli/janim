import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Adder.css";

function Editor({ match }) {
    const [taskId, setTaskId] = useState(null);
    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState({
        title_err: "",
        desc_err: "",
        status_err: "",
        date_err: "",
        message: "",
    });

    useEffect(() => {
        if (!match || !match.params || !match.params.taskId) {
            // Handle the case where taskId is not available
            console.error("Task ID is missing in the URL parameters.");
            return;
        }

        const taskIdFromParams = match.params.taskId;
        setTaskId(taskIdFromParams);

        // Fetch existing task data based on taskId and populate the form
        fetch(`http://localhost:8888/localhost/taskmanagement/backend/GetData.php?taskId=${taskIdFromParams}`)
            .then((response) => response.json())
            .then((data) => {
                setTaskName(data.title);
                setDueDate(data.dueDate);
                setDescription(data.description);
                setStatus(data.status);
            })
            .catch((error) => {
                console.error("Error fetching task data:", error);
            });
    }, [match]);

    const handleConfirmClick = (event) => {
        event.preventDefault();
        setError({
            title_err: "",
            desc_err: "",
            status_err: "",
            date_err: "",
            message: "",
        });

        let hasError = false;

        if (!taskName.trim()) {
            setError((prevState) => ({
                ...prevState,
                title_err: "Task Name is required.",
            }));
            hasError = true;
        }
        if (!description.trim()) {
            setError((prevState) => ({
                ...prevState,
                desc_err: "Description is required.",
            }));
            hasError = true;
        }
        if (!status) {
            setError((prevState) => ({
                ...prevState,
                status_err: "Status is required.",
            }));
            hasError = true;
        }

        const currentDate = new Date().toISOString().split("T")[0];
        const selectedDate = new Date(dueDate).toISOString().split("T")[0];

        if (selectedDate < currentDate) {
            setError((prevState) => ({
                ...prevState,
                date_err: "Due date cannot be before today.",
            }));
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const taskData = {
            taskId: taskId,
            title: taskName,
            description: description,
            dueDate: dueDate,
            status: status,
        };

        console.log("Data to be updated:", taskData);

        fetch("http://localhost:8888/localhost/taskmanagement/backend/UpdateData.php", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.title_err || data.desc_err || data.status_err) {
                    setError(data);
                } else if (data.message) {
                    console.log("Server response:", data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <div className="mainCont1">
                <div className="container12">
                    <form onSubmit={handleConfirmClick} className="form">
                        <div className="fit">
                            <h1 className="AddTitle">Edit task</h1>
                            <label className="column">
                                Task Name:
                                <input
                                    className="input"
                                    type="text"
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                />
                                <span className="error" style={{ color: 'pink' }}>{error.title_err}</span>
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
                                <span className="error" style={{ color: 'pink' }}>{error.date_err}</span>
                            </label>
                            <label className="column">
                                Description:
                                <input
                                    className="input"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <span className="error" style={{ color: 'pink' }}>{error.desc_err}</span>
                            </label>
                            <label className="column">
                                Status:
                                <select
                                    name="status"
                                    id="status"
                                    className="input"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="to be done">to be done</option>
                                    <option value="in progress">in progress</option>
                                    <option value="done">done</option>
                                </select>
                                <span className="error" style={{ color: 'pink' }}>{error.status_err}</span>
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

export default Editor;
