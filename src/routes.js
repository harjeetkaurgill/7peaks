
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ViewBookmarks from "./components/ViewBookmarks";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Article from "./components/Article";
import Search from "./components/Search";

const Router = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bookmarks" element={<ViewBookmarks />} />
                <Route path="/search" element={<Search />} />
                <Route path="/:id" element={<Article />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default Router;