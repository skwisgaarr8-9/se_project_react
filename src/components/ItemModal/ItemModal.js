import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ card, closeModal, name, openConfirmationModal }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const itemDeleteButtonClassName = `preview-card__delete-button ${
    isOwn
      ? "preview-card__delete-button_visible"
      : "preview-card__delete-button_hidden"
  }`;

  const handleClickOutsideClose = (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal();
    }
  };

  React.useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEscClose);
    return () => window.removeEventListener("keydown", handleEscClose);
  }, [closeModal]);

  return (
    <div
      className={`modal modal_type_${name}`}
      onMouseDown={handleClickOutsideClose}
    >
      <div className="modal__container preview-card">
        <img
          className="preview-card__image"
          src={card.imageUrl}
          alt={card.name}
        />
        <div className="preview-card__content">
          <div className="preview-card__info">
            <h2 className="preview-card__title">{card.name}</h2>
            <p className="preview-card__weather">Weather: {card.weather}</p>
          </div>
          <button
            className={itemDeleteButtonClassName}
            onClick={openConfirmationModal}
          >
            Delete Item
          </button>
        </div>

        <button
          className="preview-card__close-button"
          type="button"
          onClick={closeModal}
        />
      </div>
    </div>
  );
}

export default ItemModal;
