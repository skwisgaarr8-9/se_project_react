import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import api from "../../utils/api";
import { getWeatherData, parseWeatherData } from "../../utils/weatherApi";
import { apiData } from "../../utils/constants";
import { CurrentTemperatureWeatherUnitContext } from "../../contexts/CurrentTemperatureContext";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function App() {
  const [weatherData, setWeatherData] = React.useState({});
  const [clothingCards, setClothingCards] = React.useState([]);
  const [activeModal, setActiveModal] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    React.useState("F");

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

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    api
      .addItem({ name, imageUrl, weather })
      .then((data) => {
        setClothingCards([data, ...clothingCards]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = () => {
    api
      .deleteItem({ itemId: selectedCard.id })
      .then(() => {
        const updatedClothingCards = clothingCards.filter(
          (item) => item.id != selectedCard.id
        );
        setClothingCards(updatedClothingCards);
        closeModal();
        setSelectedCard(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const openConfirmationModal = () => {
    setActiveModal("delete confirmation");
  };
  React.useEffect(() => {
    getWeatherData(apiData)
      .then((data) => {
        setWeatherData(parseWeatherData(data));
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getItems()
      .then((data) => {
        setClothingCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // React.useEffect(() => {
  //   setClothingCards(defaultClothingItems);
  // }, []);

  return (
    <CurrentTemperatureWeatherUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page__content">
        <Header
          weatherData={weatherData}
          handleAddCardClick={handleAddCardClick}
        />
        <Route exact path="/">
          <Main
            weatherData={weatherData}
            cards={clothingCards}
            handleCardClick={handleCardClick}
          />
        </Route>
        <Route path="/profile">
          <Profile
            cards={clothingCards}
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            handleAddCardClick={handleAddCardClick}
          />
        </Route>
        <Footer />
        {activeModal === "new card" && (
          <AddItemModal
            onAddItem={handleAddItemSubmit}
            closeModal={closeModal}
          />
        )}
        {activeModal === "preview card" && (
          <ItemModal
            name="preview-card"
            closeModal={closeModal}
            card={selectedCard}
            openConfirmationModal={openConfirmationModal}
          />
        )}
        {activeModal === "delete confirmation" && (
          <DeleteConfirmationModal
            closeModal={closeModal}
            handleCardDelete={handleCardDelete}
          />
        )}
      </div>
    </CurrentTemperatureWeatherUnitContext.Provider>
  );
}

export default App;
