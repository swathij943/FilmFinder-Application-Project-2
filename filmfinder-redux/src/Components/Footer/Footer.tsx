import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

export const Footer: React.FC = () => {
  const currUser = useSelector((state: RootState) => state.user);

  return (
    <div className="footer-body">
      <footer className="footer">
        <div className="social"></div>

        <ul className="list">
          <li>
            <Link to={"/"} className="link">
              Home
            </Link>
          </li>

          {currUser.user ? (
            <li>
              <Link to={"/profile"} className="link">
                Profile
              </Link>
            </li>
          ) : (
            <li>
              <Link to={"/login"} className="link">
                Profile
              </Link>
            </li>
          )}
        </ul>

        <p className="copyright">FilmFinder © 2022</p>
      </footer>
    </div>
  );
};
