import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./RegisterForm.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Store";
import { registerUser } from "../../Slices/UserSlice";

export const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigator = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "firstName") {
      setFirstName(event.target.value);
      //console.log(firstName);
    } else if (event.target.name === "lastName") {
      setLastName(event.target.value);
      //console.log(lastName);
    } else if (event.target.name === "username") {
      setUsername(event.target.value);
      //console.log(username);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
      //console.log(password);
    } else if (event.target.name === "email") {
      setEmail(event.target.value);
      //console.log(email);
    }
  };

  const handleAccountCreated = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
      let credentials = {
        firstName,
        lastName,
        username,
        password,
        email,
      };
  
      localStorage.setItem('username', username);
      dispatch(registerUser(credentials));
      navigator('/');
    };

  return (
    <div className="center">
      <h1>Register</h1>
      <form action="">
        <div className="txt_field">
          <input
            type="text"
            name="firstName"
            autoComplete="off"
            required
            onChange={handleInput}
          />
          <label>First Name</label>
        </div>

        <div className="txt_field">
          <input
            type="text"
            name="lastName"
            autoComplete="off"
            required
            onChange={handleInput}
          />
          <label>Last Name</label>
        </div>

        <div className="txt_field">
          <input
            type="text"
            name="username"
            autoComplete="off"
            required
            onChange={handleInput}
          />
          <label>Username</label>
        </div>

        <div className="txt_field">
          <input
            type="password"
            name="password"
            required
            onChange={handleInput}
          />
          <label>Password</label>
        </div>

        <div className="txt_field">
          <input
            type="text"
            name="email"
            autoComplete="off"
            required
            onChange={handleInput}
          />
          <label>Email</label>
        </div>

        <button onClick={handleAccountCreated} className="register-btn">
          Create
        </button>

        <div className="signup_link">
          Already have an account? <Link to={"/login"}>Sign in</Link>
        </div>
      </form>
    </div>
  );
};
