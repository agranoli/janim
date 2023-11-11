import "./Header.css";
import {Link} from "react-router-dom";

function Header(){
    return (
        <>
            <div className="mainHead">
                <h1 className="text">Task Management</h1>
                <div className="buttonContainer">
                    <Link to="/DataAdd" className="button">Add Task</Link>
                </div>
            </div>
        </>
    );
}
export default Header;