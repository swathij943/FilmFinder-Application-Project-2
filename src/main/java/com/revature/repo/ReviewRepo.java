package com.revature.repo;

import com.revature.models.Movie;
import com.revature.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepo extends JpaRepository<Review, Integer> {

    //List<Review> findAllByMovieId(int movieId);

}
