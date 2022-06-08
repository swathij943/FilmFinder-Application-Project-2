import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoginForm.css";
import { AppDispatch } from "../../Store";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Slices/UserSlice";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigator = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let credentials = {
      username,
      password,
    };

    dispatch(loginUser(credentials));
    //navigator('/');
  };

  return (
    <div className="center">
      <h1>Login</h1>
      <form action="">
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

        <div className="pass">Forgot Password?</div>

        <button onClick={handleLogin} className="login-btn">
          Login
        </button>

        <div className="signup_link">
          Not a member? <Link to={"/register"}>Sign up</Link>
        </div>
      </form>
    </div>
  );
};
