import React from "react";
import "./SearchPage.css";
import { NavbarLoggedIn } from "../../Components/Navbar/NavbarLoggedIn";
import { useState } from "react";

export const SearchPage: React.FC = () => {

  const [searchbar, setSearchbar] = useState<string>("");

  return (
    <div className="search-page">
      <NavbarLoggedIn />
      <input type="text" name="username" autoComplete="off"></input>
    </div>
  );
};
