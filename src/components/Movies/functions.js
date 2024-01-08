export function handleFavorites(movie, favorites, setFavorites) {
  const isAlreadyInFavorites = favorites.some(
    (favorite) => favorite.id === movie.id
  );

  if (isAlreadyInFavorites) {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== movie.id
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  } else {
    const updatedFavorites = [
      ...favorites,
      {
        id: movie.id,
        title: movie.title,
        name: movie.name,
        release_date: movie.release_date,
        first_air_date: movie.first_air_date,
        vote_average: movie.vote_average,
        poster_path: movie.poster_path,
        media_type: movie.media_type,
      },
    ];
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  }
}

export function sortMovie(sortType, filteredMovies, setMovies) {
  const sortedMovies = filteredMovies.sort((a, b) => {
    switch (sortType) {
      case "a-z":
        return (a.title || a.name).localeCompare(b.title || b.name);
      case "date":
        return (
          new Date(b.release_date || b.first_air_date) -
          new Date(a.release_date || a.first_air_date)
        );
      case "vote":
        return b.vote_average - a.vote_average;
      default:
        return 0;
    }
  });

  setMovies(sortedMovies);
}
