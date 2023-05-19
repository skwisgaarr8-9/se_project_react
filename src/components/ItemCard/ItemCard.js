import "./ItemCard.css";

function ItemCard({ card, onCardClick, onCardLike, currentUser }) {
  const isLiked = card.likes.some((like) => like === currentUser._id);
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : "card__like-button_inactive"
  }`;

  const handleLikeClick = () => {
    onCardLike({ id: card._id, isLiked, user: currentUser });
  };

  const handleCardClick = () => {
    onCardClick(card);
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">{card.name}</h2>
        <button
          className={itemLikeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
      <img
        className="card__image"
        src={card.imageUrl}
        alt={card.name}
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
