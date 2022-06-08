import React from "react";
import "./RegisterPage.css";
import { RegisterForm } from "../../Components/RegisterForm/RegisterForm";

export const RegisterPage: React.FC = () => {
  return (
    <div className="register-page">
      <RegisterForm />
    </div>
  );
};
