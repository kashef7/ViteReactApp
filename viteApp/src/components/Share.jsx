import "../css/Share.css";
import arrow from "../assets/reshot-icon-arrow-chevron-right-WDGHUKQ634.svg"
import comment from "../assets/comment-icon.svg";
import { Link , useLocation } from "react-router-dom";

export default function Share({txt,img}){
    const location = useLocation();
    return(
    <div className="otherShares">
        <button className="ShareProfile">
            <Link to={"/profile"}>
                <img src={img}></img>
            </Link>
        </button>
        <p>
            {txt}
        </p>
        <div className="likes">
            <Link to={"/likes"} state={{ backgroundLocation: location }}><img className="Arrow" src={arrow}></img></Link>
            <input type="checkbox" className="heart-checkbox" />
            <Link to={"/comments"} state = {{backgroundLocation: location}}><img className="Arrow" src={comment}></img></Link>
        </div>
        
    </div>
    )
    
}