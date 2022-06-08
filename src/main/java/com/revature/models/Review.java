package com.revature.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name="reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="review_id")
    private int reviewId;

    @Column(name="rating")
    private int rating;

    @Column(name="content")
    private String content;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    //@JsonIgnore // This seems to exclude reviewer from our getCurrMovie
    private User reviewer;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="movie_id")
    //@JsonIgnore
    private Movie movieRated;

    public Review() {
    }

    public Review(int reviewId, int rating, String content, User reviewer, Movie movieRated) {
        this.reviewId = reviewId;
        this.rating = rating;
        this.content = content;
        this.reviewer = reviewer;
        this.movieRated = movieRated;
    }

    public Review(int rating, String content, User reviewer, Movie movieRated) {
        this.rating = rating;
        this.content = content;
        this.reviewer = reviewer;
        this.movieRated = movieRated;
    }

    public int getReviewId() {
        return reviewId;
    }

    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getReviewer() {
        return reviewer;
    }

    public void setReviewer(User reviewer) {
        this.reviewer = reviewer;
    }

    public Movie getMovieRated() {
        return movieRated;
    }

    public void setMovieRated(Movie movieRated) {
        this.movieRated = movieRated;
    }

    @Override
    public String toString() {
        return "Review{" +
                "reviewId=" + reviewId +
                ", rating=" + rating +
                ", content='" + content + '\'' +
                ", reviewer=" + reviewer +
                ", movieRated=" + movieRated +
                '}';
    }
}
