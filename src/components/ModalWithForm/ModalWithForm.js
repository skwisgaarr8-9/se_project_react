import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  submitButtonText,
  children,
  closeModal,
  handleSubmit,
  registerOrLoginModal,
  redirectButtonText,
  handleRedirectButtonClick,
}) {
  React.useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEscClose);
    return () => window.removeEventListener("keydown", handleEscClose);
  }, [closeModal]);

  const handleClickOutsideClose = (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal();
    }
  };

  return (
    <div
      className={`modal modal_type_${name}`}
      onMouseDown={handleClickOutsideClose}
    >
      <div className="modal__container">
        <form className="modal__form form" name={name} onSubmit={handleSubmit}>
          <h2 className="modal__title">{title}</h2>
          {children}
          <div className="modal__button-container">
            <button className="modal__button" type="submit">
              {submitButtonText}
            </button>
            {registerOrLoginModal && (
              <button
                className="modal__redirect-button"
                type="button"
                onClick={handleRedirectButtonClick}
              >
                {redirectButtonText}
              </button>
            )}
          </div>
        </form>
        <button
          className="modal__close-button"
          type="button"
          onClick={closeModal}
        ></button>
      </div>
    </div>
  );
}

export default ModalWithForm;
