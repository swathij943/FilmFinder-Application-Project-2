import React, { useEffect } from "react";
import "./MoviePage.css";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import { NavbarLoggedIn } from "../../Components/Navbar/NavbarLoggedIn";
import { NavbarPublic } from "../../Components/Navbar/NavbarPublic";
import { Banner } from "../../Components/Banner/Banner";
import { IReview } from "../../Interfaces/IReview";
import { ReviewCard } from "../../Components/ReviewCard/ReviewCard";
import { Footer } from "../../Components/Footer/Footer";
import { MarginSpace } from "../../Components/MarginSpace/MarginSpace";

export const MoviePage: React.FC = () => {
  const currMovie = useSelector((state: RootState) => state.movie);
  const userInfo = useSelector((state: RootState) => state.user);

  //const dispatch: AppDispatch = useDispatch();

  // useEffect(() => {
  //     console.log(window.localStorage.getItem("username"));
  // }, [currMovie.currMovie?.reviews]);

  return (
    <div className="movie-page">
      {userInfo.user ? <NavbarLoggedIn /> : <NavbarPublic />}
      {/* <NavbarLoggedIn /> */}
      <Banner />
      <div className="testimonial-heading">
        <span>Comment</span>
        <h1>Reviews</h1>
      </div>

      {currMovie.reviews? (
        currMovie.reviews.map((r: IReview) => {
          return <ReviewCard {...r} />;
        })
      ) : (
        <></>
      )}
      <MarginSpace />
      <Footer />
    </div>
  );
};
