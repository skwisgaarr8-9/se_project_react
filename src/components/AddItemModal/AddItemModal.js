import React from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ onAddItem, isOpen, closeModal }) {
  const [name, setName] = React.useState("");
  const [imageUrl, setUrl] = React.useState("");
  const [weather, setWeather] = React.useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  const onNameInputChange = (evt) => {
    setName(evt.target.value);
  };

  const onImageUrlInputChange = (evt) => {
    setUrl(evt.target.value);
  };

  const onWeatherInputChange = (evt) => {
    setWeather(evt.target.value);
  };

  React.useEffect(() => {
    if (isOpen) {
      setName("");
      setUrl("");
      setWeather("");
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
        value={name}
        required
        placeholder="Name"
        autoComplete="off"
        onChange={onNameInputChange}
      />
      <label className="form__label" htmlFor="image">
        Image
      </label>
      <input
        className="form__input"
        id="image"
        type="url"
        value={imageUrl}
        placeholder="Image URL"
        required
        autoComplete="off"
        onChange={onImageUrlInputChange}
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
          onChange={onWeatherInputChange}
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
          onChange={onWeatherInputChange}
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
          onChange={onWeatherInputChange}
        />
        <label className="form__radio-label" htmlFor="cold">
          Cold
        </label>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
