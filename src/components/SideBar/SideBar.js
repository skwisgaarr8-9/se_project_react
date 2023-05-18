import "./SideBar.css";

function SideBar({ currentUser, handleLogOut, handleEditProfileButtonClick }) {
  return (
    <div className="sidebar">
      <div className="sidebar__profile-content">
        <img
          src={currentUser.avatar}
          className="sidebar__profile-avatar"
          alt="avatar"
        />
        <p className="sidebar__profile-name">{currentUser.name}</p>
      </div>
      <div className="sidebar__profile-buttons">
        <button
          className="sidebar__profile-button"
          type="button"
          onClick={handleEditProfileButtonClick}
        >
          Change profile data
        </button>
        <button
          className="sidebar__profile-button"
          type="button"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
