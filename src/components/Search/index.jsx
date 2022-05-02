import { useState, useEffect, useRef } from "react";
import { useLocation, Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Card from "../Card";
import Dropdown from "../Dropdown";
import BookmarkOff from "../../assets/BookmarkOff.svg";

const Search = () => {
    const [loading, setLoading] = useState(true);
    const [list, setListing] = useState([]);
    const [sortSelected, setSortSelected] = useState("Newest");
    const [showBookmarks, setShowBookmarks] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [targetElement, setTargetElement] = useState(null);
    const prevY = useRef(0);

    const options = ["Newest", "Oldest"];
    const location = useLocation();

    const option = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    };

    const handleObserver = (entities) => {
        const y = entities[0].boundingClientRect.y;
        if (prevY.current > y) {
            setPageNo((prev) => prev + 1);
        }
        prevY.current = y;
    };

    const observer = useRef(new IntersectionObserver(handleObserver, option));

    useEffect(() => {
        if (targetElement) {
            observer.current.observe(targetElement);
        }
    }, [targetElement]);

    useEffect(() => {
        fetch(`https://content.guardianapis.com/search?q=${decodeURIComponent(location.search.substring(location.search.indexOf("=") + 1))}&show-fields=thumbnail&order-by=${sortSelected.toLowerCase()}&page=${pageNo}&api-key=test`)
            .then(res => res.json())
            .then((json) => {
                if (json?.response?.results) {
                    const newList = [...list, ...json.response.results];
                    setListing(newList);
                }
                setLoading(false);
            });
    }, [sortSelected, pageNo]);

    if (showBookmarks) {
        return <Navigate to="/bookmarks" />;
    }

    const handleOnChange = (e) => {
        setSortSelected(e.target.value);
    };

    return <div id="searchList">
        <ClipLoader color="rgb(6, 6, 112)" loading={loading} size={50} />
        {!loading && <>
            <div className="firstSection">
                <div className="header">
                    <span>Search result(s)</span>
                </div>
                <div className="bookmarks" onClick={() => setShowBookmarks(true)}>
                    <img src={BookmarkOff} alt="bookmark" />
                    <span className="viewBookmarkText">VIEW BOOKMARK</span>
                </div>
                <div className="sorting">
                    <Dropdown
                        via="searchSorting"
                        options={options}
                        sortSelected={sortSelected}
                        handleOnChange={handleOnChange} />
                </div>
            </div>
            <div className="listing">
                {list.map((story, key) =>
                    <Card story={story} key={key} id={key} via="listing" />
                )}
            </div>
            <div ref={setTargetElement}>
                <div>Loading...</div>
            </div>
        </>}
    </div>
};

export default Search;