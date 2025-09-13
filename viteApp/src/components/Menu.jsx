import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext.jsx";
import "../css/Menu.css";
import { useEffect, useRef } from "react";

export default function Menu({ onClose }) {
    const { setUser } = useUser();
    const navigate = useNavigate();
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                if (onClose) onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    };
    return (
        <div className="menu-box" ref={menuRef}>
            <Link className="menu-link" to={"/"}>Home</Link>
            <Link className="menu-link" to={"/profile"}>Profile</Link>
            <button className="menu-link" onClick={handleLogout}>LogOut</button>
        </div>
    );
}