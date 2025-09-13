import "../css/Share.css";
import arrow from "../assets/reshot-icon-arrow-chevron-right-WDGHUKQ634.svg";
import comment from "../assets/comment-icon.svg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "./UserContext.jsx";

export default function Share({ txt, userName, img, id, onDelete, userId, loggedInUserId }) {
    const location = useLocation();
    const { user } = useUser();
    const [liked, setLiked] = useState(false);

    // Fetch initial likes
    useEffect(() => {
    fetch(`https://sharesappbackend-production.up.railway.app/api/v1/posts/like/${id}`, {
            credentials: 'include'
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data && data.data && Array.isArray(data.data.likes)) {
                    setLiked(data.data.likes.some(likeUser => likeUser.name === user?.name));
                }
            })
            .catch(err => console.error("Failed to fetch likes:", err));
    }, [id, user]);

    const handleLike = async () => {
      console.log(liked);
      if(!liked){
        console.log('calling like')
    await fetch(`https://sharesappbackend-production.up.railway.app/api/v1/posts/like/${id}`,{
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
            }
        });
      }
      else{
        console.log('calling unlike')
    await fetch(`https://sharesappbackend-production.up.railway.app/api/v1/posts/like/${id}`,{
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
            }
        }).then(res => res.ok ? console.log((res.json())) : console.log((res.json())) )
      }
      setLiked(!liked);
    };

    const handleDelete = async () => {
    const response = await fetch(`https://sharesappbackend-production.up.railway.app/api/v1/posts/${id}`, {
            method: "DELETE",
            credentials: 'include'
        });
        if (response.ok) {
            if (onDelete) onDelete();
        } else {
            console.log("Failed to delete");
        }
    };

    // Link to correct profile (own or other)
    const profileLink = userId ? `/profile/${userId}` : "/profile";

    return (
        <div className="otherShares">
            <div className="shareHeader">
                <button className="ShareProfile">
                    <Link to={profileLink}>
                        <img src={img} alt="Profile" />
                    </Link>
                </button>
                <p className="userName">{userName}</p>
            </div>
            <p>{txt}</p>
            <div className="likes">
                <Link to={"/likes"} state={{ backgroundLocation: location, postId: id }}>
                    <img className="Arrow" src={arrow} />
                </Link>
                <button
                    className={`heart-btn${liked ? ' liked' : ''}`}
                    onClick={handleLike}
                    aria-label={liked ? 'Unlike' : 'Like'}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        outline: 'none',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '8px'
                    }}
                >
                    {liked ? (
                        <span style={{ fontSize: '2rem', color: '#e63946', transition: 'color 0.2s' }}>❤️</span>
                    ) : (
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#222"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ verticalAlign: 'middle' }}
                        >
                            <path d="M12 21s-6.5-5.5-9-9.5C1.5 7.5 4.5 4.5 8 4.5c2.1 0 4 1.5 4 1.5s1.9-1.5 4-1.5c3.5 0 6.5 3 5 7C18.5 15.5 12 21 12 21z" />
                        </svg>
                    )}
                </button>
                <Link to={"/comments"} state={{ backgroundLocation: location }}>
                    <img className="Arrow" src={comment} />
                </Link>
            </div>
            {loggedInUserId === userId && (
                <>
                    <button className="delB Button" onClick={handleDelete}>Delete</button>
                    <button className="updateB Button">Update</button>
                </>
            )}
        </div>
    );
}
