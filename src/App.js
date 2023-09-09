import "./App.css";
import Popular from "./components/Popular/Popular";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Movie from "./components/Movie/Movie";
import SearchedMovies from "./components/SearchedMovies/SearchedMovies";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/search/:searchword" element={<Popular />} />
        <Route path="/movie/" element={<Movie />} />
        <Route path="/" element={<Popular />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
