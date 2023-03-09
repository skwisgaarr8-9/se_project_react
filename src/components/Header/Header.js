import headerLogo from "../../images/logo.svg";
import headerAvatar from "../../images/avatar.svg";
import "./Header.css";
import "./Navigation.css";

function Header({ weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__container">
        <img src={headerLogo} className="header__logo" alt="what to wear" />
        <p className="header__date">{currentDate}</p>
        <p className="header__location">{weatherData.city}</p>
      </div>
      <div className="header__nav">
        <nav className="navigation">
          <ul className="navigation__container">
            <li>
              <button className="navigation__button" type="button">
                + Add clothes
              </button>
            </li>
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
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
