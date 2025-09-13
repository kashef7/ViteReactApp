import defaultProfileIcon from '../assets/profile-svgrepo-com.svg';
import Share from "../components/Share";
import "../css/Profile.css";
import { useUser } from '../components/UserContext.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Profile() {
    const { user, loading } = useUser();
    const { id } = useParams();
    const [profileUser, setProfileUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);

    // Fetch profile user info
    useEffect(() => {
        let isMounted = true;
        if (!id) {
            if (isMounted) setProfileUser(user);
        } else {
            fetch(`https://sharesappbackend-production.up.railway.app/api/v1/users/${id}`, {
                credentials: 'include'
            })
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (isMounted && data && data.data && data.data.data) {
                        setProfileUser(data.data.data);
                    }
                });
        }
        return () => { isMounted = false; };
    }, [id, user]);

    // Fetch posts for profile user
    useEffect(() => {
        if (profileUser) {
            fetch('https://sharesappbackend-production.up.railway.app/api/v1/posts', {
                credentials: 'include'
            })
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data && data.data && Array.isArray(data.data.data)) {
                        setPosts(data.data.data.filter(post => {
                            if (!post.user) return false;
                            const postUserId = typeof post.user === 'string' ? post.user : post.user._id;
                            return postUserId === profileUser._id;
                        }));
                    }
                });
        }
    }, [profileUser]);

    // Fetch followers for profile user and following status
    useEffect(() => {
        if (profileUser && user) {
            fetch(`https://sharesappbackend-production.up.railway.app/api/v1/users/${profileUser._id}`, {
                credentials: 'include'
            })
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data && data.data && data.data.data && data.data.data.followers) {
                        setFollowers(data.data.data.followers.length);
                        setIsFollowing(data.data.data.followers.includes(user._id));
                    }
                });
        }
    }, [profileUser, user]);

    const handleFollow = async () => {
        if (!user || !profileUser) return;
        if (isFollowing) {
            await fetch(`https://sharesappbackend-production.up.railway.app/api/v1/users/unfollow/${profileUser._id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
        } else {
            await fetch(`https://sharesappbackend-production.up.railway.app/api/v1/users/follow/${profileUser._id}`, {
                method: 'POST',
                credentials: 'include'
            });
        }
        // Refresh profile info
    fetch(`https://sharesappbackend-production.up.railway.app/api/v1/users/${profileUser._id}`, {
            credentials: 'include'
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data && data.data && data.data.data && data.data.data.followers) {
                    setFollowers(data.data.data.followers.length);
                    setIsFollowing(data.data.data.followers.includes(user._id));
                }
            });
    };

    if (loading || !profileUser) return null;

    const profilePic = profileUser.profilePic ? profileUser.profilePic : defaultProfileIcon;

    return (
        <div className="Profile-page">
            <div className="Profile-details">
                <div className="Profile-pic">
                    <img src={profilePic} alt="Profile" />
                </div>
                <p>@{profileUser.name}</p>
                <div className="Profile-info">
                    <p>Followers: {followers}</p>
                    <p>Following: {profileUser.following ? profileUser.following.length : 0}</p>
                </div>
                {user && profileUser._id !== user._id && (
                    <button
                        className={`follow-btn${isFollowing ? ' following' : ''}`}
                        onClick={handleFollow}
                        style={{
                            background: isFollowing ? '#e63946' : '#7077A1',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '24px',
                            padding: '8px 24px',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            marginTop: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            transition: 'background 0.2s',
                        }}
                    >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                )}
            </div>
            {posts.map(post => (
                <Share
                    key={post._id}
                    txt={post.content}
                    userName={profileUser.name}
                    img={profilePic}
                    id={post._id}
                    userId={profileUser._id}
                    loggedInUserId={user?._id}
                    onDelete={() => {
                        // refetch posts after delete
                        fetch('https://sharesappbackend-production.up.railway.app/api/v1/posts', {
                            credentials: 'include'
                        })
                            .then(res => res.ok ? res.json() : null)
                            .then(data => {
                                if (data && data.data && Array.isArray(data.data.data)) {
                                    setPosts(data.data.data.filter(post => {
                                        if (!post.user) return false;
                                        const postUserId = typeof post.user === 'string' ? post.user : post.user._id;
                                        return postUserId === profileUser._id;
                                    }));
                                }
                            });
                    }}
                />
            ))}
        </div>
    );
}