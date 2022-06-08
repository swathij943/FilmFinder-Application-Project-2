import React, { useEffect } from "react";
import "./HomePage.css";
import { useSelector, useDispatch } from "react-redux";
import { NavbarPublic } from "../../Components/Navbar/NavbarPublic";
import { RootState, AppDispatch } from "../../Store";
import { clearCurrMovie, getAllMovies } from "../../Slices/MovieSlice";
import { IMovie } from "../../Interfaces/IMovie";
import { MovieCard } from "../../Components/MovieCard/MovieCard";
import { useState } from "react";
import { NavbarLoggedIn } from "../../Components/Navbar/NavbarLoggedIn";
import { Footer } from "../../Components/Footer/Footer";

export const HomePage: React.FC = () => {
  const movieInfo = useSelector((state: RootState) => state.movie);
  const userInfo = useSelector((state: RootState) => state.user);

  const [filter, setFilter] = useState<string>("");
  const [genreId, setGenreId] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    //console.log(userInfo.user);
    console.log(localStorage.getItem("username"));
    if (!movieInfo.movies) {
      console.log("Loading in movies");
      dispatch(getAllMovies());
    }
    setFilter("");
    setGenreId("default");
    dispatch(clearCurrMovie());
    console.log("Inside of homepage");
  }, [movieInfo.movies]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    //console.log(filter)
  };

  const clearFilters = () => {
    setFilter("");
    setGenreId("default");
  };

  const genreFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //console.log(event.target.value);
    setGenreId(event.target.value);
  };

  return (
    <div className="home-page">
      {userInfo.user ? <NavbarLoggedIn /> : <NavbarPublic />}

      <form className="filter-form">
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Search"
          autoComplete="off"
          onChange={handleInput}
          className="movie-input"
        ></input>
        <select
          name="genre-filter"
          defaultValue={"default"}
          onChange={genreFilter}
          className="genre-dropdown"
        >
          <option value="default" disabled>
            Genre
          </option>
          <option value={1}>Action</option>
          <option value={2}>Comedy</option>
          <option value={3}>Horror</option>
          <option value={4}>Romance</option>
          <option value={5}>Drama</option>
          <option value={6}>Fantasy</option>
          <option value={7}>Sci-Fi</option>
        </select>
        <input
          type="reset"
          value="Reset"
          onClick={clearFilters}
          className="reset-btn"
        ></input>
      </form>
      <div className="movie-card-container">
        {movieInfo.movies ? (
          movieInfo.movies.map((m: IMovie) => {
            if (m.title.toLowerCase().includes(filter.toLowerCase())) {
              if (
                genreId == "default" ||
                m.genre.genreId.toString() == genreId
              ) {
                return <MovieCard {...m} />;
              } else {
                <></>;
              }
            } else {
              return <></>;
            }
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <Footer />
    </div>
  );
};
