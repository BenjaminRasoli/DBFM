import "./App.css";
import Movies from "./components/Movies/Movies";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Movie from "./components/Movie/Movie";
import SearchedMovies from "./components/SearchedMovies/SearchedMovies";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorites from "./components/Favorites/Favorites";
import Actor from "./components/Actor/Actor";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/search" element={<Movies />} />
        <Route path="/" element={<Movies />} />
        <Route path="/genres/:genreId" element={<Movies />} />
        <Route path="/tv/:tvId" element={<Movie />} />

        <Route path="/favorites" element={<Favorites />} />
        <Route path="/actor/:actorId" element={<Actor />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
