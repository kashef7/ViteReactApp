import "../css/Home.css"
import profileIcon from '../assets/profile-svgrepo-com.svg';
export default function Home(){
    return(
        <div className="HomePage">
            <div className="Shares">
                <div className="ShareBox">
                    <button className="ShareProfile">
                        <img src={profileIcon}></img>
                    </button>
                    <textarea
                        placeholder="Share Your Thoughts"
                        className="ShareInput"
                        rows={1}
                    />
                    <button className="ShareButton">Share</button>
                </div>
            </div>
            
        </div>
    );
}