import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import peaksLogo from "../../assets/7peaksLogo.png";
import "./css/index.css";
import SearchIcon from "../../assets/SearchIcon.svg";

const Navbar = () => {
    const [openSearch, setOpenSearch] = useState(false);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    if (openSearch) {
        document.addEventListener('click', function handleClickOutsideBox(event) {
            const searchBox = document?.getElementById('search');
            if (searchBox !== null && event.target.alt !== "SearchIcon" && !searchBox.contains(event.target)) {
                setOpenSearch(false);
            }
        });
    }

    return (
        <nav className="nav">
            <div className="logoArea">
                <Link to='/'>
                    <img className="logoImg" src={peaksLogo} alt="logo" />
                </Link>
            </div>
            <div className="searchArea">
                <img src={SearchIcon} alt="SearchIcon" onClick={() => setOpenSearch(!openSearch)} />
                {openSearch &&
                    <input
                        id="search"
                        type="text"
                        placeholder="Search all news"
                        autoFocus
                        value={search}
                        onChange={(e) => onSearchChange(e)}
                        onKeyPress={(ev) => {
                            if (ev.key === "Enter") {
                                ev.preventDefault();
                                if (ev.target.value.trim().length > 0) {
                                    navigate(`/search?q=${encodeURIComponent(ev.target.value.trim())}`);
                                    setSearch("");
                                    setOpenSearch(false);
                                }
                            }
                        }}
                    />}
            </div>
        </nav>
    );
};

export default Navbar;