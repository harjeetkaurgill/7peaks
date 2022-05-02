import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Dropdown from "../Dropdown";
import Card from "../Card";
import ClipLoader from "react-spinners/ClipLoader";

const ViewBookmarks = () => {
    const options = ["Newest", "Oldest"];
    const [loading, setLoading] = useState(true);
    const [list, setListing] = useState([]);
    const [sortSelected, setSortSelected] = useState("Newest");

    const { bookmarks } = useSelector(state => state.bookmarks);

    useEffect(() => {
        async function fetchData() {
            if (bookmarks.length > 0) {
                var bookList = bookmarks.map(async (bookmark, key) => {
                    return await fetch(`https://content.guardianapis.com/${decodeURIComponent(bookmark)}?show-fields=thumbnail&api-key=test`)
                        .then(res => res.json())
                        .then((json) => {
                            if (json?.response?.content) {
                                return json.response.content;
                            }
                        })
                        .catch();
                });
                const responses = await Promise.all(bookList);
                const sortedList = sortByDate(responses, "Newest");
                setListing(sortedList);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const sortByDate = (list, sortBy) => {
        setLoading(true);
        const sorter = (a, b) => {
            if (sortBy.includes("Oldest")) {
                return (
                    new Date(a.webPublicationDate) -
                    new Date(b.webPublicationDate)
                );
            } else {
                return (
                    new Date(b.webPublicationDate) -
                    new Date(a.webPublicationDate)
                );
            }
        };
        return list.sort(sorter);
    };

    const handleOnChange = (e) => {
        setSortSelected(e.target.value);
        const sortedList = sortByDate(list, e.target.value);
        setListing(sortedList);
        setTimeout(() => setLoading(false), 1000);
    };

    return <div>
        <ClipLoader color="rgb(6, 6, 112)" loading={loading} size={50} />
        {!loading && <>
            <div className="header">
                <span>All Bookmark(s)</span>
            </div>
            <div className="sorting">
                <Dropdown
                    via="bookmarkSorting"
                    options={options}
                    sortSelected={sortSelected}
                    handleOnChange={handleOnChange} />
            </div>
            {list.length > 0 && <div className="listing">
                {list.map((story, key) =>
                    <Card story={story} key={key} id={key} via="listing" />
                )}
            </div>}
        </>}
    </div>
};

export default ViewBookmarks;