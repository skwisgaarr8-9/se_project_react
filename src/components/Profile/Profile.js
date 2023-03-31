import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ cards, weatherData, handleCardClick, handleAddCardClick }) {
  return (
    <div className="profile">
      <Sidebar />
      <ClothesSection
        cards={cards}
        weatherData={weatherData}
        handleCardClick={handleCardClick}
        handleAddCardClick={handleAddCardClick}
      />
    </div>
  );
}

export default Profile;
