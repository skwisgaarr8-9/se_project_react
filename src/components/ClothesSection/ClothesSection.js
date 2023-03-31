import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  cards,
  weatherData,
  handleCardClick,
  handleAddCardClick,
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
          .filter((card) => card.weather === weatherData.adjective)
          .map((filteredCard) => (
            <ItemCard
              key={filteredCard.id}
              card={filteredCard}
              handleCardClick={handleCardClick}
            />
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
