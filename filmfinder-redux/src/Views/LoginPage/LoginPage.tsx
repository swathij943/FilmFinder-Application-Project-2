import React from "react";
import "./LoginPage.css";
import { LoginForm } from "../../Components/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const LoginPage: React.FC = () => {

  const userInfo = useSelector((state: RootState) => state.user);
  const navigator = useNavigate();

  useEffect(() => {
    //console.log("user: "+userInfo.user);
    if (!userInfo.error && userInfo.user) {
      console.log("User logged in");
      window.localStorage.setItem('username', userInfo.user.username);
      navigator('/');
    }
  }, [userInfo]);

  return (
    <div className="login-page">
      {userInfo.error ? <h2>Username or password incorrect</h2> : <></>}
      <LoginForm />
    </div>
  );
};
