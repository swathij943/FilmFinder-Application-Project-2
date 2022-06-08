package com.revature.services;

import com.revature.exceptions.InvalidCredentialsException;
import com.revature.models.Movie;
import com.revature.models.User;
import com.revature.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.revature.utils.LoggingUtil;

import java.util.List;
import java.util.Set;

@Service
@Transactional
public class UserService {

    private UserRepo uRepo;
    private MovieService mServ;

    @Autowired
    public UserService(UserRepo uRepo, MovieService mServ) {
        this.uRepo = uRepo;
        this.mServ = mServ;
    }

    //Register
    public User registerNewUser(String first, String last, String username, String email, String password) {

        User register = new User(first, last, username, email, password);
        LoggingUtil.logger.info("User: " + register.getUsername() + " registered successfully");
        return uRepo.save(register);
    }

    public User loginUser(String username, String password) {
        User loggedIn = uRepo.findUserByUsernameAndPassword(username, password);
        if (loggedIn == null) {
            LoggingUtil.logger.error("User with username: " + username + " was not found in the database");
            throw new InvalidCredentialsException();
        } else {
            LoggingUtil.logger.info("User: " + loggedIn.getUsername() + " signed in successfully");
            return loggedIn;
        }
    }

    public User updateUser(User u) { //int id, String firstName, String lastName, String username, String password, String email
        if(u.getUserId() >= 0) {
            LoggingUtil.logger.info("User: " + u.getUsername() + " updated successfully");
            return uRepo.save(u);
        } else {
            throw new InvalidCredentialsException();
        }
    }

    public User getCurrentUserById(int userId){
        return uRepo.findById(userId).get();
    }

    public User favoriteMovie(int userId, int movieId) {

        User u = uRepo.findById(userId).get();
        Movie m = mServ.getMovieById(movieId);

        System.out.println("Movie found");
        Set<Movie> favs = u.getFavorites();
        favs.add(m);
        u.setFavorites(favs);
        return uRepo.save(u);
    }

    public User deleteFavoriteMovie(int userId, int movieId) {

        User u = uRepo.findById(userId).get();
        Movie m = mServ.getMovieById(movieId);

        Set<Movie> favs = u.getFavorites();
        favs.remove(m);
        u.setFavorites(favs);
        return uRepo.save(u);
    }

}