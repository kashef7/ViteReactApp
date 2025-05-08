import "../css/NavBar.css"
import profileIcon from '../assets/profile-svgrepo-com.svg';
import menuIcon from '../assets/menu-svgrepo-com.svg';
export default function NavBar(){
    return(
        <div className="navBar">
            <button className="Profile">
                <img src={profileIcon}></img>
            </button>
            <button className="Menu">
                <img src={menuIcon}></img>
            </button>
        </div>
    )
}