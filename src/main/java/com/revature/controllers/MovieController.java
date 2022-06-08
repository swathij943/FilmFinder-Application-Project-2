package com.revature.controllers;

import com.revature.models.Movie;
import com.revature.models.Review;
import com.revature.models.User;
import com.revature.services.MovieService;
import com.revature.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {

    private MovieService mServ;

    @Autowired
    public MovieController(MovieService mServ) {
        this.mServ = mServ;
    }

    @GetMapping("/movie/all")
    public ResponseEntity<Object> handleGetAllMovies(){

        try{
            List<Movie> movies = mServ.getAllMovies();
            return new ResponseEntity<>(movies, HttpStatus.CREATED);
        } catch(Exception e){
            return new ResponseEntity<>("Can't get all movies", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/movie/{id}")
    public ResponseEntity<Object> handleGetMovieById(@PathVariable("id")int movieId){

        try{
            Movie m = mServ.getMovieById(movieId);
            return new ResponseEntity<>(m, HttpStatus.CREATED);
        } catch(Exception e){
            return new ResponseEntity<>("Can't get that movie", HttpStatus.CONFLICT);
        }
    }
}
