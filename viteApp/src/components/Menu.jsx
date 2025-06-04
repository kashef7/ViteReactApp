import {Link} from "react-router-dom";
import "../css/Menu.css";


export default function Menu(){
    return(
        <div className="menu-box">
            <Link className="menu-link" to={"/"}>Home</Link>
            <Link className="menu-link" to={"/profile"}>Profile</Link>
            <Link className="menu-link" to={"/login"}>LogOut</Link>
        </div>
    )
};