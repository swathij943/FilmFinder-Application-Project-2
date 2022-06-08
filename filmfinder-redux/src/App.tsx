import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { MoviePage } from "./Views/MoviePage/MoviePage";
import { LoginPage } from "./Views/LoginPage/LoginPage";
import { RegisterPage } from "./Views/RegisterPage/RegisterPage";
import { HomePage } from "./Views/HomePage/HomePage";
import { SearchPage } from "./Views/SearchPage/SearchPage";
import { ProfilePage } from "./Views/ProfilePage/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/movie-page" element={<MoviePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
