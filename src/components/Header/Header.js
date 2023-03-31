import { Link } from "react-router-dom";
import headerLogo from "../../images/logo.svg";
import headerAvatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import "./Navigation.css";

function Header({ weatherData, handleAddCardClick }) {
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
              <button
                className="navigation__button"
                type="button"
                onClick={handleAddCardClick}
              >
                + Add clothes
              </button>
            </li>
            <Link className="navigation__link" to="/profile">
              <li>
                <div className="navigation__profile">
                  <p className="navigation__profile-name">Terrence Tegegne</p>
                  <img
                    src={headerAvatar}
                    className="navigation__profile-avatar"
                    alt="avatar"
                  />
                </div>
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
