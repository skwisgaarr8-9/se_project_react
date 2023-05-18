import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  cards,
  weatherData,
  onCardClick,
  handleAddCardClick,
  currentUser,
  handleLogOut,
  handleEditProfileButtonClick,
  onCardLike,
}) {
  return (
    <div className="profile">
      <SideBar
        currentUser={currentUser}
        handleLogOut={handleLogOut}
        handleEditProfileButtonClick={handleEditProfileButtonClick}
      />
      <ClothesSection
        onCardLike={onCardLike}
        currentUser={currentUser}
        cards={cards}
        weatherData={weatherData}
        onCardClick={onCardClick}
        handleAddCardClick={handleAddCardClick}
      />
    </div>
  );
}

export default Profile;
