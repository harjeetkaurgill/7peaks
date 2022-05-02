import { useState, useEffect } from "react";
import Card from "../../Card";
import "./css/index.css";

const TopStories = ({ sortSelected, setLoading }) => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        fetch(`https://content.guardianapis.com/search?section=news&show-fields=thumbnail&order-by=${sortSelected.toLowerCase()}&page-size=8&api-key=test`)
            .then(res => res.json())
            .then((json) => {
                if (json?.response?.results) {
                    setStories(json.response.results);
                }
                setLoading(false);
            });
    }, [sortSelected]);

    return <div>
        <div className="homeStoryCards">
            {stories.map((story, key) =>
                <Card story={story} key={key} id={key} via="home" />
            )}
        </div>
    </div>
};

export default TopStories;