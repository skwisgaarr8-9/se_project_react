import "./ItemCard.css";

function ItemCard({ card, handleCardClick }) {
  return (
    <li
      className="card"
      onClick={() => {
        handleCardClick(card);
      }}
    >
      <h2 className="card__title">{card.name}</h2>
      <img className="card__image" src={card.imageUrl} alt={card.name} />
    </li>
  );
}

export default ItemCard;
