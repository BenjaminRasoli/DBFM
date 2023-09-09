import MovieCard from "../MovieCard/MovieCard";

function Favorites() {
  const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
  console.log(favoriteMovies);

  return (
    <>
      {favoriteMovies === null && <h1>No favorites added yet</h1>}
      <MovieCard />
    </>
  );
}

export default Favorites;
