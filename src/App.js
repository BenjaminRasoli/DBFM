import "./App.css";
import Movies from "./components/Movies/Movies";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Movie from "./components/Movie/Movie";
import Contact from "./components/Contact/Contact";
import Actor from "./components/Actor/Actor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <Routes>
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/search" element={<Movies />} />
        <Route path="/" element={<Movies />} />
        <Route path="/genres/:genreId" element={<Movies />} />
        <Route path="/tv/:tvId" element={<Movie />} />
        <Route path="/favorites" element={<Movies />} />
        <Route path="/actor/:actorId" element={<Actor />} />
        <Route path="/contact/" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
