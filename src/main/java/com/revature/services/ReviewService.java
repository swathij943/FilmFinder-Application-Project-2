package com.revature.services;

import com.revature.models.Movie;
import com.revature.models.Review;
import com.revature.models.User;
import com.revature.repo.ReviewRepo;
import com.revature.utils.LoggingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ReviewService {

    private ReviewRepo rRepo;
    private MovieService mServ;
    private UserService uServ;

    @Autowired
    public ReviewService(ReviewRepo rRepo, MovieService mServ, UserService uServ) {
        this.rRepo = rRepo;
        this.mServ = mServ;
        this.uServ = uServ;
    }

    public Review createReview(int rating, String content, int userId, int movieId) {
        //System.out.println("Top of createReview");
        User u = uServ.getCurrentUserById(userId);
        Movie m = mServ.getMovieById(movieId);
        //System.out.println("Rating: "+rating+" Content: "+content+" User: "+u+" Movie: "+m); // The Movie doesn't seem to get retrieved correctly
        Review create = new Review(rating, content, u, m);

        //System.out.println("Review object created: "+create);
        LoggingUtil.logger.info("Comment probably created: " + create);
        return rRepo.save(create);
    }

    public List<Review> getReviewByMovieId(int movieId){
        Movie m = mServ.getMovieById(movieId);

        List<Review> allReviews = new ArrayList<>();

        for(Review rev: m.getReviews()){
            allReviews.add(rev);
        }

        return allReviews;
    }
}
