import Model from "./Model";
import { useNavigate } from "react-router-dom";
export default function Likes(){
    const navigate = useNavigate();

    return(
        <Model onClose={()=>{navigate(-1)}}>
            <h1>Likes</h1>
        </Model>
    )
}