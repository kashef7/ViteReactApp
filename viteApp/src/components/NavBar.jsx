import "../css/NavBar.css"
import profileIcon from '../assets/profile-svgrepo-com.svg';
import menuIcon from '../assets/menu-svgrepo-com.svg';
import { Link } from "react-router-dom";
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
                <Link to={"/profile"}>
                    <img src={profileIcon}></img>
                </Link>
            </button>
            <div className="navBar-title">
                <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
                    <span style={{ fontFamily: 'cursive', fontSize: '2rem', fontWeight: 'bold', letterSpacing: '2px' }}>SHARES</span>
                </Link>
            </div>
            <button onClick={onMenuClick} className="Menu">
                <img src={menuIcon}></img>
            </button>
            {showMenu && <Menu onClose={() => setShowMenu(false)} className="Menu-box"/>}
        </div> 
    )
}