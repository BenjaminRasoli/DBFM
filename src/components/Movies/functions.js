import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/FireBaseConfig";

export async function fetchFavoritesFromFirebase(userId) {
  const q = query(collection(db, "userFavoriteList", userId, "favorites"));

  try {
    const querySnapshot = await getDocs(q);
    const fetchedFavorites = querySnapshot.docs.map((doc) => doc.data());
    return fetchedFavorites;
  } catch (error) {
    console.error("Error fetching favorites: ", error);
    return [];
  }
}

export async function handleFavorites(movie, favorites, setFavorites, user) {
  const isAlreadyInFavorites = favorites.some(
    (favorite) => favorite.id === movie.id
  );
  if (!user) {
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
  } else {
    try {
      const favoriteRef = doc(
        db,
        "userFavoriteList",
        user.uid,
        "favorites",
        movie.title || movie.name
      );

      if (isAlreadyInFavorites) {
        await deleteDoc(favoriteRef);
        const updatedFavorites = favorites.filter(
          (favorite) => favorite.id !== movie.id
        );
        setFavorites(updatedFavorites);
        localStorage.setItem(
          "favoriteMovies",
          JSON.stringify(updatedFavorites)
        );
      } else {
        await setDoc(favoriteRef, {
          id: movie.id,
          title: movie.title || null,
          name: movie.name || null,
          release_date: movie.release_date || null,
          first_air_date: movie.first_air_date || null,
          vote_average: movie.vote_average || 0,
          poster_path: movie.poster_path || null,
          media_type: movie.media_type || null,
        });

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
        localStorage.setItem(
          "favoriteMovies",
          JSON.stringify(updatedFavorites)
        );
      }
    } catch (error) {
      console.error("Error adding/removing movie to/from favorites:", error);
    }
  }
}

export function sortMovie(sortType, movies, setMovies) {
  const sortedMovies = [...movies].sort((a, b) => {
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
