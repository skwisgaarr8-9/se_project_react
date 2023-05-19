import React from "react";
import { useEscape } from "../../hooks/useEscape";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ closeModal, handleCardDelete, isLoading }) {
  const handleClickOutsideClose = (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal();
    }
  };

  useEscape(closeModal);

  return (
    <div className="modal" onMouseDown={handleClickOutsideClose}>
      <div className="delete-confirm-modal__content">
        <h2 className="delete-confirm-modal__heading">
          Are you sure you would like to delete this card?
        </h2>
        <p className="delete-confirm-modal__text">
          This action is irreversible.
        </p>
        <button
          className="delete-confirm-modal__button delete-confirm-modal__button_type_delete"
          type="button"
          onClick={handleCardDelete}
        >
          {isLoading ? "Deleting..." : "Yes, delete item"}
        </button>
        <button
          className="delete-confirm-modal__button delete-confirm-modal__button_type_cancel"
          type="button"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="modal__close-button"
          type="button"
          onClick={closeModal}
        />
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
