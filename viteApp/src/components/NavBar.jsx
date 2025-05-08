import "../css/NavBar.css"

export default function NavBar(){
    return(
        <div className="navBar">
            <button className="Profile">
                <img src="/src/assets/profile-svgrepo-com.svg"></img>
            </button>
            <button className="Menu">
                <img src="/src/assets/menu-svgrepo-com.svg"></img>
            </button>
        </div>
    )
}