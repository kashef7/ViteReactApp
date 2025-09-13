import "../css/Home.css"
import profileIcon from '../assets/profile-svgrepo-com.svg';
import Share from "../components/Share";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from '../components/UserContext.jsx';
export default function Home({ loggedInUserId }){
    const [shareText , setShareText] = useState("");
    const [shares , setShare] = useState([]);
    const { user } = useUser();
    const fetchItems = async() =>{
    fetch("https://sharesappbackend-production.up.railway.app/api/v1/posts/",{
          method: 'GET',
          credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
          setShare(data.data.data);
        })
        .catch((err) =>{
            console.log(err.message);
        })
    }

    useEffect(()=>{
        fetchItems();
    },[])
    const handelShareSubmit = async () =>{
        if(shareText.trim() === ""){
            return 
        }
    await fetch("https://sharesappbackend-production.up.railway.app/api/v1/posts",{
            method:"POST",
            headers: {'Content-Type': "application/json"},
            credentials: "include",
            body : JSON.stringify({content: shareText})
        }).then(res => res.json())
        await fetchItems();
        setShareText("");
    }
    return(
        <div className="HomePage">
            <div className="Shares">
                <div className="ShareBox">
                    <button className="ShareProfile">
                        <Link to={"/profile"}>
                            <img src={profileIcon}></img>
                        </Link>
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
                        <Share
                            key={share._id}
                            id={share._id}
                            txt={share.content}
                            userName={share.user.name}
                            img={share.user.profilePic || profileIcon}
                            userId={typeof share.user === 'object' ? share.user._id : share.user}
                            loggedInUserId={loggedInUserId}
                            onDelete={fetchItems}
                        />
                    )
                })}
            </div>
        </div>
    );
}