import profileIcon from '../assets/WIN_20250605_01_21_41_Pro.jpg';
import Share from "../components/Share";
import "../css/Profile.css";

export default function Profile(){
    return(<div className="Profile-page">
        <div className="Profile-details">
            <div className="Profile-pic">
                <img src={profileIcon}></img>
            </div>
            <p>@Username</p>
            <div className="Profile-info">
                <p>Likes:1000</p>
                <p>Followrs:1000</p>
                <p>Following:1000</p>
            </div>
        </div>
        <Share txt={"Helloooooo"} img={profileIcon}></Share>
        <Share txt={"Helloooooo"} img={profileIcon}></Share>
        <Share txt={"Helloooooo"} img={profileIcon}></Share>
    </div>)
}