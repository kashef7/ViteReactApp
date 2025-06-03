import ReactDOM from "react-dom";
import "../css/Model.css";

export default function Model({children , onClose}){
    return ReactDOM.createPortal(
        <div className="Main-model" onClick={onClose}>
            <div className="model-content slide-in" onClick={(e) => {e.stopPropagation()}}>
                {children}
            </div>
        </div>,document.getElementById("model-root")
    )
}