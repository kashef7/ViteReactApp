import "../css/Home.css"
import profileIcon from '../assets/profile-svgrepo-com.svg';
import Share from "../components/Share";
import { useState } from "react";
export default function Home(){
    const [shareText , setShareText] = useState("");
    const [shares , setShare] = useState([]);

    const handelShareSubmit = () =>{
        if(shareText.trim() === ""){
            return 
        }
        const newShare = {
            Text : shareText,
            Profile : profileIcon,
        }
        setShare(prev => [...prev,newShare])
        setShareText("")
    }


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
                        rows={2}
                        value={shareText}
                        onChange={(val)=>{setShareText(val.target.value)}}
                    />
                    <button className="ShareButton" onClick={handelShareSubmit}>Share</button>
                </div>
                {shares.map(share =>{
                    return(
                        <Share txt = {share.Text} img = {share.Profile}></Share>
                    )
                    
                })}
            </div>

        </div>
    );
}