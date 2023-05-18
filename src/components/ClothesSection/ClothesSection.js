import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  onCardLike,
  cards,
  weatherData,
  onCardClick,
  handleAddCardClick,
  currentUser,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__text">
        <h2 className="clothes-section__heading">Your items</h2>
        <button
          className="clothes-section__button"
          onClick={handleAddCardClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__cards">
        {cards
          .filter(
            (card) =>
              card.weather === weatherData.adjective &&
              card.owner === currentUser._id
          )
          .map((filteredCard) => (
            <ItemCard
              currentUser={currentUser}
              onCardLike={onCardLike}
              key={filteredCard._id}
              card={filteredCard}
              onCardClick={onCardClick}
            />
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
