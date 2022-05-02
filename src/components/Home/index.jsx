import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./css/index.css";
import TopStories from "./TopStories";
import Dropdown from "../Dropdown";
import ClipLoader from "react-spinners/ClipLoader";
import BookmarkOff from "../../assets/BookmarkOff.svg";
import Sports from "./Sports";

const Home = () => {
    const [showBookmarks, setShowBookmarks] = useState(false);
    const [sortSelected, setSortSelected] = useState("Newest");
    const [loading, setLoading] = useState(true);
    const options = ["Newest", "Oldest"];

    if (showBookmarks) {
        return <Navigate to="/bookmarks" />;
    }

    const handleOnChange = (e) => {
        setSortSelected(e.target.value);
        setLoading(true);
    };

    return (
        <div className="home">
            <ClipLoader color="rgb(6, 6, 112)" loading={loading} size={50} />
            <div className="firstSection">
                <div className="header">
                    <span>Top stories</span>
                </div>
                <div className="bookmarks" onClick={() => setShowBookmarks(true)}>
                    <img src={BookmarkOff} alt="bookmark" />
                    <span className="viewBookmarkText">VIEW BOOKMARK</span>
                </div>
                <div className="sorting">
                    <Dropdown
                        via="homeSorting"
                        options={options}
                        sortSelected={sortSelected}
                        handleOnChange={handleOnChange} />
                </div>
            </div>
            <div className="stories">
                <TopStories
                    sortSelected={sortSelected}
                    setLoading={setLoading}
                />
            </div>
            <div>
                <div className="sports header">Sports</div>
                <Sports setLoading={setLoading} />
            </div>
        </div>
    );
};

export default Home;