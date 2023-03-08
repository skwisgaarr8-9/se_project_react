import headerLogo from "../../images/logo.svg";
import "./Header.css";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header() {
  return (
    <header className="header">
      <img src={headerLogo} className="header__logo" alt="what to wear logo" />
      <p className="header__date">{currentDate}</p>
    </header>
  );
}

export default Header;
