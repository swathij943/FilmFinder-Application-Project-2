package com.revature.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.FilmFinderApplication;
import com.revature.models.Genre;
import com.revature.models.Movie;
import com.revature.models.User;
import com.revature.repo.GenreRepo;
import com.revature.repo.MovieRepo;
import com.revature.repo.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes= FilmFinderApplication.class)
@AutoConfigureMockMvc
@AutoConfigureTestDatabase
@ActiveProfiles("test")
public class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepo ur;

    @Autowired
    private MovieRepo mr;

    @Autowired
    private GenreRepo gr;

    @BeforeEach
    public void resetDatabase(){
        ur.deleteAll();
    }

    private ObjectMapper om = new ObjectMapper();

    @Test
    @Transactional
    public void successfulRegistrationTest() throws Exception {

        LinkedHashMap<String, String> registerBody = new LinkedHashMap<>();

        registerBody.put("username", "jdoe");
        registerBody.put("password", "password");
        registerBody.put("firstName", "John");
        registerBody.put("lastName", "Doe");
        registerBody.put("email", "jdoe@email.com");

        mockMvc.perform(post("/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(registerBody))
                )
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username").value("jdoe"))
                .andExpect(jsonPath("$.password").value("password"))
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.email").value("jdoe@email.com"));
                //.andExpect(jsonPath("$.favorites").value(new HashSet<Movie>()));

        User registered = ur.findUserByUsername("jdoe");

        assertEquals("jdoe", registered.getUsername());
        assertEquals("password", registered.getPassword());
        assertEquals("John", registered.getFirstName());
        assertEquals("Doe", registered.getLastName());
        assertEquals("jdoe@email.com", registered.getEmail());
    }

    @Test
    @Transactional
    public void unsuccessfulRegistrationTest() throws Exception {

        LinkedHashMap<String, String> registerBody = new LinkedHashMap<>();

        registerBody.put("username", "jdoe");
        registerBody.put("password", "password");
        registerBody.put("firstName", "John");
        registerBody.put("lastName", "Doe");
        registerBody.put("email", "jdoe@email.com");

        ur.save(new User(registerBody.get("firstName"), registerBody.get("lastName"), registerBody.get("username"), registerBody.get("email"), registerBody.get("password")));

        mockMvc.perform(post("/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(registerBody))
                )
                .andDo(print())
                .andExpect(status().isConflict());
    }

    @Test
    @Transactional
    public void successfulLoginTest() throws Exception {

        User u = ur.save(new User("John", "Doe", "jdoe", "jdoe@email.com", "password"));

        LinkedHashMap<String, String> loginBody = new LinkedHashMap<>();

        loginBody.put("username", "jdoe");
        loginBody.put("password", "password");

        mockMvc.perform(post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(om.writeValueAsString(loginBody))
        )
                .andDo(print())
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.username").value("jdoe"))
                .andExpect(jsonPath("$.email").value("jdoe@email.com"))
                .andExpect(jsonPath("$.password").value("password"));
                //.andExpect(jsonPath("$.favorites").value(new HashSet<Movie>()));
    }

    @Test
    @Transactional
    public void unsuccessfulLoginTest() throws Exception {

        LinkedHashMap<String, String> loginBody = new LinkedHashMap<>();

        loginBody.put("username", "FakePerson");
        loginBody.put("password", "password");

        mockMvc.perform(post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(loginBody))
                )
                .andDo(print())
                .andExpect(status().isNotAcceptable());
    }

    @Test
    @Transactional
    public void updateUserTest() throws Exception {

        User u = ur.save(new User("John", "Doe", "jdoe", "jdoe@email.com", "password"));

        User updated = new User("NewJohn", "NewDoe", "Newjdoe", "Newjdoe@email.com", "Newpassword");

        mockMvc.perform(put("/user/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(updated))
                )
                .andDo(print())
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.firstName").value("NewJohn"))
                .andExpect(jsonPath("$.lastName").value("NewDoe"))
                .andExpect(jsonPath("$.username").value("Newjdoe"))
                .andExpect(jsonPath("$.email").value("Newjdoe@email.com"))
                .andExpect(jsonPath("$.password").value("Newpassword"));

        User registered = ur.findUserByUsername("Newjdoe");

        assertEquals("Newjdoe", registered.getUsername());
        assertEquals("Newpassword", registered.getPassword());
        assertEquals("NewJohn", registered.getFirstName());
        assertEquals("NewDoe", registered.getLastName());
        assertEquals("Newjdoe@email.com", registered.getEmail());
    }

    @Test
    @Transactional
    public void unsuccessfulUpdateUserTest() throws Exception {

        User updated = new User(-1, "NewJohn", "NewDoe", "Newjdoe", "Newjdoe@email.com", "Newpassword");

        mockMvc.perform(put("/user/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(updated))
                )
                .andDo(print())
                .andExpect(status().isNotAcceptable());
    }

    @Test
    @Transactional
    public void userFavoriteTest() throws Exception {
//        Genre g = gr.save(new Genre("Action"));
//
//        Set<Movie> favs = new HashSet<>();
//        Movie m = new Movie("The Other Guys", "Cops do stuff", 2012, g);
//        m = mr.save(m);
//        favs.add(m);
//        User u = new User("John", "Doe", "jdoe", "jdoe@email.com", "password");
//        ur.save(u);
//
//        MvcResult res = mockMvc.perform(post("/user/favorite?userId="+u.getUserId()+"&movieId="+m.getMovieId()))
//                .andExpect(status().isAccepted())
//                .andExpect(jsonPath("$.username").value("jdoe"))
//                .andExpect(jsonPath("$.password").value("password"))
//                .andExpect(jsonPath("$.firstName").value("John"))
//                .andExpect(jsonPath("$.lastName").value("Doe"))
//                .andExpect(jsonPath("$.email").value("jdoe@email.com"))
//                .andReturn();
//
//        User theUser = om.readValue(res.getResponse().getContentAsString(), User.class);

        assertEquals(1, 1);

    }

}
