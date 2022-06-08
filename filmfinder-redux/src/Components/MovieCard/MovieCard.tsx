import React, { useState } from "react";
import { IMovie } from "../../Interfaces/IMovie";
import { RootState, AppDispatch } from "../../Store";
import { useSelector, useDispatch } from "react-redux";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";
import { getCurrMovie, getMovieReviews } from "../../Slices/MovieSlice";

export const MovieCard: React.FC<IMovie> = (movie: IMovie) => {
  const navigator = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const goToMoviePage = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(`Going to movie page ${movie.movieId}`);
    dispatch(getCurrMovie(movie.movieId));
    dispatch(getMovieReviews(movie.movieId));
    navigator(`/movie-page`);
  };

  return (
    <div className="card" onClick={goToMoviePage}>
      <img className="movie-img" src={movie.image}></img>
      <h4 className="movie-title">{movie.title}</h4>
      <p className="movie-year">{movie.year}</p>
    </div>
  );
};
