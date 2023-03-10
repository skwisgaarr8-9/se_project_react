import React from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherData, parseWeatherData } from "../../utils/weatherApi";
import { apiData, defaultClothingItems } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = React.useState({});
  const [defaultCards, setDefaultCards] = React.useState([]);
  const [activeModal, setActiveModal] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleAddCardClick = () => {
    setActiveModal("new card");
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview card");
  };

  React.useEffect(() => {
    getWeatherData(apiData)
      .then((data) => {
        setWeatherData(parseWeatherData(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    setDefaultCards(defaultClothingItems);
  }, []);

  return (
    <div className="page__content">
      <Header
        weatherData={weatherData}
        handleAddCardClick={handleAddCardClick}
      />
      <Main
        weatherData={weatherData}
        cards={defaultCards}
        handleCardClick={handleCardClick}
      />
      <Footer />
      {activeModal === "new card" && (
        <ModalWithForm
          name="new-card"
          title={"New garment"}
          buttonText={"Add Garment"}
          closeModal={closeModal}
        >
          <label className="form__label" htmlFor="name">
            Name
          </label>
          <input
            className="form__input"
            id="name"
            type="text"
            required
            placeholder="Name"
            autoComplete="off"
          />
          <label className="form__label" htmlFor="image">
            Image
          </label>
          <input
            className="form__input"
            id="image"
            type="url"
            placeholder="Image URL"
            required
            autoComplete="off"
          />
          <legend className="form__legend">Select the weather type:</legend>
          <div className="form__radio-wrapper">
            <input
              className="form__radio-input"
              type="radio"
              id="hot"
              value="hot"
              name="weather"
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
            />
            <label className="form__radio-label" htmlFor="cold">
              Cold
            </label>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview card" && (
        <ItemModal
          name="preview-card"
          closeModal={closeModal}
          card={selectedCard}
        />
      )}
    </div>
  );
}

export default App;
