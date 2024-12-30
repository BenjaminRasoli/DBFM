import "./App.css";
import Movies from "./components/Movies/Movies";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Movie from "./components/Movie/Movie";
import About from "./components/About/About";
import Actor from "./components/Actor/Actor";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={1}
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
      <main>
        <Routes>
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/search" element={<Movies />} />
          <Route path="/" element={<Movies />} />
          <Route path="/genres/:genreId" element={<Movies />} />
          <Route path="/tv/:tvId" element={<Movie />} />
          <Route path="/favorites" element={<Movies />} />
          <Route path="/actor/:actorId" element={<Actor />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp>Sign Up</SignUp>} />
          {/* <Route path="*" element={<h1>Not Found</h1>} /> */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
export default App;
