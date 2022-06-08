package com.revature.controllers;

import com.revature.models.Review;
import com.revature.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    private ReviewService rServ;

    @Autowired
    public ReviewController(ReviewService rServ) {
        this.rServ = rServ;
    }

    @PostMapping("/review/create")
    public ResponseEntity<Object> handleCreateReview(@RequestBody Review r, @RequestParam(name="userId") int userId, @RequestParam(name="movieId") int movieId){
        try{
            System.out.println("Input -> R: "+r+" userId: "+userId+" movieId: "+movieId);
           Review rev = rServ.createReview(r.getRating(), r.getContent(), userId, movieId);
           System.out.println("Output -> Rev: "+rev);
            return new ResponseEntity<>(rev, HttpStatus.CREATED);
        } catch(Exception e){
            return new ResponseEntity<>("Can't create", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/review/{id}")
    public ResponseEntity<Object> handleGetReviewByMovieId(@PathVariable("id")int movieId){

        try{
            List<Review> rList = rServ.getReviewByMovieId(movieId);
            return new ResponseEntity<>(rList, HttpStatus.CREATED);
        } catch(Exception e){
            return new ResponseEntity<>("Can't get that movie", HttpStatus.CONFLICT);
        }
    }
}
