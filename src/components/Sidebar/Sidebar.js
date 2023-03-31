import "./Sidebar.css";
import profileAvatar from "../../images/avatar.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      <img
        src={profileAvatar}
        className="sidebar__profile-avatar"
        alt="avatar"
      />
      <p className="sidebar__profile-name">Terrence Tegegne</p>
    </div>
  );
}

export default Sidebar;
