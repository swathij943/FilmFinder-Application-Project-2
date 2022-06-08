import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { NavbarLoggedIn } from "../../Components/Navbar/NavbarLoggedIn";
import { Footer } from "../../Components/Footer/Footer";
import { userInfo } from "os";
import { Link, useNavigate } from "react-router-dom";
import { IMovie } from "../../Interfaces/IMovie";
import { MovieCard } from "../../Components/MovieCard/MovieCard";
import { AppDispatch } from "../../Store";
import { useDispatch } from "react-redux";
import { updateUser } from "../../Slices/UserSlice";
import { IUser } from "../../Interfaces/IUser";
import menu from "../../Assets/menu.png";
import setting from "../../Assets/setting.png";
import avatar from "../../Assets/default-avatar.png";
import instagram from "../../Assets/instagram.png";
import arrow from "../../Assets/arrow.png";

export const ProfilePage: React.FC = () => {
  const currUser = useSelector((state: RootState) => state.user);

  const navigator = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [toggleUpdate, setToggleUpdate] = useState(false);

  const [username, setUsername] = useState<any>(currUser.user?.username);
  const [firstName, setFirstName] = useState<any>(currUser.user?.firstName);
  const [lastName, setLastName] = useState<any>(currUser.user?.lastName);
  const [password, setPassword] = useState<any>(currUser.user?.password);

  // useEffect(() => {
  //   if(!currUser.user) {
  //     navigator('/');
  //   }
  // }, [currUser.user]);

  const updateProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (currUser.user) {
      setToggleUpdate(true);
    } else {
      navigator("/login");
    }
  };

  //const showUserDetails = (event: React.MouseEvent<HTMLButtonElement>) => {};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name == "username") {
      setUsername(event.target.value);
    } else if (event.target.name == "password") {
      setPassword(event.target.value);
    } else if (event.target.name == "firstName") {
      setFirstName(event.target.value);
    } else {
      setLastName(event.target.value);
    }
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (currUser.user) {
      let u: IUser = {
        userId: currUser.user.userId,
        username: username,
        password: password,
        email: currUser.user.email,
        firstName: firstName,
        lastName: lastName,
        favorites: currUser.user.favorites,
      };
      console.log(u);
      dispatch(updateUser(u));
      setToggleUpdate(false);
    }
  };

  return (
    <div className="test">
      <NavbarLoggedIn />
      <div className="profile-content">
        <div className="profile-box">
          {toggleUpdate ? (
            // <form className="update-form">
            //   <h3>Update</h3>

            //   <label className="label">Username: </label>
            //   <input
            //     type="text"
            //     className="username"
            //     name="username"
            //     autoComplete="off"
            //     value={username}
            //     onChange={handleChange}
            //     required
            //   ></input>

            //   <label className="label">Password: </label>
            //   <input
            //     type="password"
            //     className="password"
            //     name="password"
            //     autoComplete="off"
            //     value={password}
            //     onChange={handleChange}
            //     required
            //   ></input>

            //   <label className="label">First Name: </label>
            //   <input
            //     type="text"
            //     className="firstName"
            //     name="firstName"
            //     autoComplete="off"
            //     value={firstName}
            //     onChange={handleChange}
            //     required
            //   ></input>

            //   <label className="label">Last Name: </label>
            //   <input
            //     type="text"
            //     className="lastName"
            //     name="lastName"
            //     autoComplete="off"
            //     value={lastName}
            //     onChange={handleChange}
            //     required
            //   ></input>

            //   <button className="update-profile-btn" onClick={handleSubmit}>
            //     Submit
            //   </button>
            // </form>

            <div className="form-center">
              <h1>Update</h1>
              <form action="">
                <div className="txt_field">
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    autoComplete="off"
                    onChange={handleChange}
                    required
                  />
                  <label>New First Name</label>
                </div>

                <div className="txt_field">
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    autoComplete="off"
                    onChange={handleChange}
                    required
                  />
                  <label>New Last Name</label>
                </div>

                <div className="txt_field">
                  <input
                    type="text"
                    name="username"
                    value={username}
                    autoComplete="off"
                    onChange={handleChange}
                    required
                  />
                  <label>New Username</label>
                </div>

                <div className="txt_field">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                  <label>New Password</label>
                </div>

                {/* <div className="txt_field">
                  <input
                    type="text"
                    name="email"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                  />
                  <label>New Email</label>
                </div> */}

                <button className="register-btn" onClick={handleSubmit}>
                  Update
                </button>
              </form>
            </div>
          ) : (
            <div>
              <div className="container-box">
                <div className="profile-container">
                  <img src={menu} className="menu-icon" />
                  <img src={setting} className="setting-icon" />
                  <img src={avatar} className="profile-pic" />
                  <h2>
                    {currUser.user?.firstName} {currUser.user?.lastName}
                  </h2>

                  <div className="user-details">
                    <h4>
                      <span>Email:</span> {currUser.user?.email}
                    </h4>
                    <h4>
                      <span>Username:</span> @{currUser.user?.username}
                    </h4>
                  </div>

                  <div className="social-media">
                    <img src="instagram.png" alt="" />
                  </div>
                  <button className="edit-profile-btn" onClick={updateProfile}>
                    Edit
                  </button>
                  <div className="profile-bottom">
                    <p>Learn More</p>
                    <img src={arrow} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <h2>Favorite Movies:</h2>
        <div className="favorite-list">
          {currUser.user ? (
            currUser.user.favorites.map((m: IMovie) => {
              return <MovieCard {...m} />;
            })
          ) : (
            <></>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
