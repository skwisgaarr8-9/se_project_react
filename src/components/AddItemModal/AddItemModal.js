import React from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ onAddItem, isOpen, closeModal }) {
  const [values, setValues] = React.useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItem(values);
  };

  React.useEffect(() => {
    if (isOpen) {
      setValues({
        name: "",
        imageUrl: "",
        weather: "",
      });
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      name="new-card"
      title={"New garment"}
      buttonText={"Add Garment"}
      closeModal={closeModal}
      handleSubmit={handleSubmit}
    >
      <label className="form__label" htmlFor="name">
        Name
      </label>
      <input
        className="form__input"
        id="name"
        type="text"
        name="name"
        value={values.name}
        required
        placeholder="Name"
        autoComplete="off"
        onChange={handleChange}
      />
      <label className="form__label" htmlFor="image">
        Image
      </label>
      <input
        className="form__input"
        id="image"
        type="url"
        name="imageUrl"
        value={values.imageUrl}
        placeholder="Image URL"
        required
        autoComplete="off"
        onChange={handleChange}
      />
      <legend className="form__legend">Select the weather type:</legend>
      <div className="form__radio-wrapper">
        <input
          className="form__radio-input"
          type="radio"
          id="hot"
          value="hot"
          name="weather"
          required
          onChange={handleChange}
        />
        <label className="form__radio-label" htmlFor="hot">
          Hot
        </label>
      </div>
      <div className="form__radio-wrapper">
        <input
          className="form__radio-input"
          type="radio"
          id="warm"
          value="warm"
          name="weather"
          onChange={handleChange}
        />
        <label className="form__radio-label" htmlFor="warm">
          Warm
        </label>
      </div>
      <div className="form__radio-wrapper">
        <input
          className="form__radio-input"
          type="radio"
          id="cold"
          value="cold"
          name="weather"
          onChange={handleChange}
        />
        <label className="form__radio-label" htmlFor="cold">
          Cold
        </label>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
