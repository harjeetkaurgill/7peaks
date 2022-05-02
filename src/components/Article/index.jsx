import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import 'react-toastify/dist/ReactToastify.css';
import "./css/index.css";
import BookmarkOn from "../../assets/BookmarkOn.svg";
import BookmarkOff from "../../assets/BookmarkOff.svg";
import peaksLogo from "../../assets/7peaksLogo.png";
import { handleBookmarks } from "../../store/slices/bookmarks";

const Article = () => {
    const [article, setArticle] = useState({});
    const [isBookmark, setIsBookmark] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isBookmarkOnOff, setIsBookmarkOnOff] = useState(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const { bookmarks } = useSelector(state => state.bookmarks);

    useEffect(() => {
        fetch(`https://content.guardianapis.com/${decodeURIComponent(location.pathname)}?show-fields=thumbnail,body,headline&show-elements=all&api-key=test`)
            .then(res => res.json())
            .then((json) => {
                if (json?.response?.content) {
                    setArticle(json.response.content);
                }
                setLoading(false);
            });
        if (bookmarks.length > 0 && bookmarks.includes(decodeURIComponent(location.pathname))) {
            setIsBookmark(true);
        }
    }, []);

    return (
        <div className="article">
            <ToastContainer toastStyle={{ color: "white", backgroundColor: isBookmarkOnOff === "on" ? "green" : "red" }} />
            <ClipLoader color="rgb(6, 6, 112)" loading={loading} size={50} />
            {!loading && <>
                <div className="bookmark">
                    {isBookmark ?
                        <span onClick={() => {
                            setIsBookmarkOnOff("off");
                            toast.success("REMOVED FROM BOOKMARKS");
                            setIsBookmark(false);
                            dispatch(handleBookmarks(bookmarks, decodeURIComponent(location.pathname), "remove"));
                        }}>
                            <img src={BookmarkOn} alt="bookmarkON" />
                            REMOVE BOOKMARK
                        </span> :
                        <span onClick={() => {
                            setIsBookmarkOnOff("on");
                            toast.success("SAVED TO BOOKMARKS");
                            setIsBookmark(true);
                            dispatch(handleBookmarks(bookmarks, decodeURIComponent(location.pathname), "add"));
                        }}>
                            <img src={BookmarkOff} alt="bookmarkOFF" />
                            ADD BOOKMARK
                        </span>

                    }
                </div>
                <div className="section">
                    <div className="time">
                        {new Date(article.webPublicationDate).toUTCString()}
                    </div>
                    <div className="webTitle">
                        {article.webTitle}
                    </div>
                    <div className="headline">
                        {article.fields?.headline}
                    </div>
                    <div className="body" dangerouslySetInnerHTML={{ __html: article.fields?.body }}>
                    </div>
                    <div className="articleImage">
                        {article.fields?.thumbnail ?
                            <img src={article.fields?.thumbnail} alt="articleImage" className="articleThumbnailImage" /> :
                            <img src={peaksLogo} alt="articleImage" className="articleLogoImage" />
                        }
                    </div>
                </div>
            </>}
        </div>
    );
};

export default Article;