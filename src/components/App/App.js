import React from "react";
import { Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { auth } from "../../utils/auth";
import { api } from "../../utils/api";
import { getWeatherData, parseWeatherData } from "../../utils/weatherApi";
import { apiData } from "../../utils/constants";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function App() {
  const [weatherData, setWeatherData] = React.useState({});
  const [clothingCards, setClothingCards] = React.useState([]);
  const [activeModal, setActiveModal] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    React.useState("F");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  const handleUserRegistrationSubmit = (inputValues) => {
    auth
      .register(inputValues)
      .then((data) => {
        setCurrentUser(data.data);
        console.log(isLoggedIn);
        setIsLoggedIn(true);
        console.log(isLoggedIn);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUserLoginSubmit = (inputValues) => {
    auth
      .login(inputValues)
      .then((data) => {
        console.log(data);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignupButtonClick = () => {
    setActiveModal("register");
  };

  const handleLoginButtonClick = () => {
    setActiveModal("login");
  };

  const handleRedirectButtonClick = () => {
    if (activeModal === "login") {
      setActiveModal("register");
      return;
    }
    setActiveModal("login");
  };

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
        closeModal();
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
          (item) => item.id !== selectedCard.id
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            isLoggedIn={isLoggedIn}
            weatherData={weatherData}
            handleAddCardClick={handleAddCardClick}
            handleSignupButtonClick={handleSignupButtonClick}
            handleLoginButtonClick={handleLoginButtonClick}
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
          {activeModal === "register" && (
            <RegisterModal
              handleUserRegistrationSubmit={handleUserRegistrationSubmit}
              closeModal={closeModal}
              isOpen={true}
              handleRedirectButtonClick={handleRedirectButtonClick}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              handleUserLoginSubmit={handleUserLoginSubmit}
              closeModal={closeModal}
              isOpen={true}
              handleRedirectButtonClick={handleRedirectButtonClick}
            />
          )}
          {activeModal === "new card" && (
            <AddItemModal
              isOpen={true}
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
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
