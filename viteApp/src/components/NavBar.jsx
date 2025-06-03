import "../css/NavBar.css"
import profileIcon from '../assets/profile-svgrepo-com.svg';
import menuIcon from '../assets/menu-svgrepo-com.svg';
import { useState } from "react";
import Menu from "./Menu";
export default function NavBar(){
    const [showMenu,setShowMenu] = useState(false);
    const onMenuClick = ()=>{
        setShowMenu(!showMenu);
    }
    return(
        <div className="navBar">
            <button className="Profile">
                <img src={profileIcon}></img>
            </button>
            <button onClick={onMenuClick} className="Menu">
                <img src={menuIcon}></img>
            </button>
                {showMenu && <Menu className="Menu-box"/>}
        </div> 
    )
}