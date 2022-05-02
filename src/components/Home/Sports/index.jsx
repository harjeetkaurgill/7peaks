import { useState, useEffect } from "react";
import Card from "../../Card";
import "./css/index.css";

const Sports = ({ setLoading }) => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        fetch(`https://content.guardianapis.com/sport?show-fields=thumbnail&page-size=3&api-key=test`)
            .then(res => res.json())
            .then((json) => {
                if (json?.response?.results) {
                    setStories(json.response.results);
                }
                setLoading(false);
            });
    }, []);

    return <div>
        <div className="sportsStoryCards">
            {stories.map((story, key) =>
                <Card story={story} key={key} id={key} via="sports" />
            )}
        </div>
    </div>
};

export default Sports;