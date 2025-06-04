import Model from "./Model";
import { useNavigate } from "react-router-dom";
export default function Comments(){
    const navigate = useNavigate();

    return(
        <Model onClose={()=>{navigate(-1)}}>
            <h1>Comments</h1>
        </Model>
    )
}