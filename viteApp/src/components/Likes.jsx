import Model from "./Model";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import defaultProfileIcon from '../assets/profile-svgrepo-com.svg';

export default function Likes() {
    const navigate = useNavigate();
    const location = useLocation();
    const postId = location.state?.postId;
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        if (postId) {
            fetch(`https://sharesappbackend-production.up.railway.app/api/v1/posts/like/${postId}`, {
                credentials: 'include'
            })
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data && data.data && Array.isArray(data.data.likes)) {
                        setLikes(data.data.likes);
                    }
                });
        }
    }, [postId]);

    return (
        <Model onClose={() => { navigate(-1); }}>
            <h1 style={{ textAlign: 'center', fontFamily: 'cursive', color: '#424769' }}>Likes</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'center', marginTop: '18px' }}>
                {likes.length === 0 && <p style={{ color: '#7077A1', fontSize: '1.1rem', fontStyle: 'italic' }}>No likes yet.</p>}
                {likes.map(user => (
                    <div key={user._id} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#424769', borderRadius: '24px', padding: '10px 28px', minWidth: '220px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                        <img src={user.profilePic && user.profilePic.startsWith('http') ? user.profilePic : defaultProfileIcon} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #7077A1', background: '#fff' }} />
                        <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '1.15rem', letterSpacing: '1px' }}>{user.name}</span>
                    </div>
                ))}
            </div>
        </Model>
    );
}