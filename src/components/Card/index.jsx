import peaksLogo from "../../assets/7peaksLogo.png";
import "./css/index.css";
import { useNavigate } from "react-router-dom";

const Card = ({ story, id, via }) => {
    const navigate = useNavigate();

    return <div className={via === "home" ?
        id === 0 ? "homeFirstTopCard" : "homeTopCards" :
        via === "sports" ? "sportCards" : "card"} onClick={() => {
            navigate(`/${encodeURIComponent(story.id)}`);
        }}>
        <div>
            {story?.fields?.thumbnail ?
                <img src={story?.fields?.thumbnail} className="cardImage" alt="card" /> :
                <img src={peaksLogo} className="logo" alt="card" />}
        </div>
        <div className="title">
            {story.webTitle}
        </div>

    </div>
};
export default Card;