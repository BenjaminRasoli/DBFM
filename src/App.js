import "./App.css";
import Movies from "./components/Movies/Movies";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Movie from "./components/Movie/Movie";
import SearchedMovies from "./components/SearchedMovies/SearchedMovies";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorites from "./components/Favorites/Favorites";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/search/:searchword" element={<Movies />} />
        {/* <Route path="/movie/" element={<Movie />} /> */}
        <Route path="/" element={<Movies />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
