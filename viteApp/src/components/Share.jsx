import "../css/Share.css";


export default function Share({txt,img}){
    return(
    <div className="otherShares">
        <button className="ShareProfile">
            <img src={img}></img>
        </button>
        <p>
            {txt}
        </p>
    </div>
    )
    
}