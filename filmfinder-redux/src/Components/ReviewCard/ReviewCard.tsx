import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IReview } from "../../Interfaces/IReview";

export const ReviewCard: React.FC<IReview> = (review: IReview) => {
  return (
    <div className="review-card">
      <section id="testimonials">
        <div className="testimonial-box-container">
          <div className="testimonial-box">
            <div className="box-top">
              <div className="profile">
                <div className="name-user">
                  <strong>
                    {review.reviewer.firstName} {review.reviewer.lastName}
                  </strong>
                  <span> @{review.reviewer.username}</span>
                </div>
              </div>
              <div className="reviews">
                {review.rating === 1 ? (
                  <div>
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStarRegular} className="fa-star" />
                    <FontAwesomeIcon icon={faStarRegular} className="fa-star" />
                    <FontAwesomeIcon icon={faStarRegular} className="fa-star" />
                    <FontAwesomeIcon icon={faStarRegular} className="fa-star" />
                  </div>
                ) : (
                  <></>
                )}

                {review.rating === 2 ? (
                  <div>
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStarRegular} className="fa-star" />
                    <FontAwesomeIcon icon={faStarRegular} className="fa-star" />
                    <FontAwesomeIcon icon={faStarRegular} className="fa-star" />
                  </div>
                ) : (
                  <></>
                )}

                {review.rating === 3 ? (
                  <div>
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStarRegular} className="fa-star" />
                    <FontAwesomeIcon icon={faStarRegular} className="fa-star" />
                  </div>
                ) : (
                  <></>
                )}

                {review.rating === 4 ? (
                  <div>
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStarRegular} className="fa-star" />
                  </div>
                ) : (
                  <></>
                )}

                {review.rating === 5 ? (
                  <div>
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                    <FontAwesomeIcon icon={faStar} className="fa-star" />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="review-comment">{review.content}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

/*
<h3>Rating: {review.rating}</h3>
      <q className="review-content">{review.content}</q>
      <p className="review-author">
        - {review.reviewer.firstName} {review.reviewer.lastName}
      </p>
*/
