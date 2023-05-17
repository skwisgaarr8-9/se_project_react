import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import "./Navigation.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  weatherData,
  handleAddCardClick,
  isLoggedIn,
  handleSignupButtonClick,
  handleLoginButtonClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img src={headerLogo} className="header__logo" alt="what to wear" />
        </Link>
        <p className="header__date">{currentDate}</p>
        <p className="header__location">{weatherData.city}</p>
      </div>
      <div className="header__nav">
        <nav className="navigation">
          <ul className="navigation__container">
            <li>
              <ToggleSwitch />
            </li>
            <li>
              {isLoggedIn ? (
                <div className="navigation__buttons">
                  <button
                    className="navigation__button"
                    type="button"
                    onClick={handleAddCardClick}
                  >
                    + Add clothes
                  </button>
                  <Link className="navigation__link" to="/profile">
                    <div className="navigation__profile">
                      <p className="navigation__profile-name">
                        {currentUser.name}
                      </p>
                      {currentUser.avatar ? (
                        <img
                          src={currentUser.avatar}
                          className="navigation__profile-avatar"
                          alt="avatar"
                        />
                      ) : (
                        <p className="navigation__profile-no-avatar">
                          {currentUser.name.slice(0, 1)}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="navigation__buttons">
                  <button
                    className="navigation__button"
                    type="button"
                    onClick={handleSignupButtonClick}
                  >
                    Sign Up
                  </button>
                  <button
                    className="navigation__button"
                    type="button"
                    onClick={handleLoginButtonClick}
                  >
                    Log in
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
