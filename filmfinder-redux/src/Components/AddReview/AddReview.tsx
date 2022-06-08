import React, { useEffect, useState } from "react";
import { IMovie } from "../../Interfaces/IMovie";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { Rating } from "react-simple-star-rating";
import { AppDispatch } from "../../Store";
import { useDispatch } from "react-redux";
import { clearCurrMovie, createReview, getCurrMovie } from "../../Slices/MovieSlice";
import { IUser } from "../../Interfaces/IUser";
import { IReview } from "../../Interfaces/IReview";
import { toggleForm } from "../../Slices/MovieSlice"; 

import "./AddReview.css";
export const AddReview: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user);
  const currMovie = useSelector((state: RootState) => state.movie);

  const [content, setContent] = useState<string>("");
  const [rating, setRating] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleRating = (rate: number) => {
    // rating returns as 20, 40, 60, 80, 100
    setRating(rate / 20);
    //console.log(rate/20);
  };

  const handleSubmitReview = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (userInfo.user && currMovie.currMovie) {
      let userId: number = userInfo.user.userId;
      let movieId: number = currMovie.currMovie.movieId;
      let rev: IReview = {
        reviewId: 0,
        rating: rating,
        content: content,
        reviewer: userInfo.user,
      };
      let reviewContent = {
        rev,
        userId,
        movieId,
      };
      dispatch(toggleForm());
      dispatch(createReview(reviewContent));
    }
  };

  return (
    <div className="add-review">
      <h1>Add Review</h1>
      <form>
        <Rating onClick={handleRating} ratingValue={rating} />
        <textarea
          onChange={handleInput}
          required
          placeholder="Add Review"
        ></textarea>
        <button className="submit-btn" onClick={handleSubmitReview}>
          Submit
        </button>
      </form>
    </div>
  );
};