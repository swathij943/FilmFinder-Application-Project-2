package com.revature.repo;

import com.revature.models.Movie;
import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.revature.models.Genre;

@Repository
public interface GenreRepo extends JpaRepository<Genre, Integer> {

    Genre findGenreByGenreId(int genreId);

}
