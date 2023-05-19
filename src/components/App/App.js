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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { auth } from "../../utils/auth";
import { api } from "../../utils/api";
import { getWeatherData, parseWeatherData } from "../../utils/weatherApi";
import { apiData } from "../../utils/constants";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function App() {
  //states
  const [weatherData, setWeatherData] = React.useState({});
  const [clothingCards, setClothingCards] = React.useState([]);
  const [activeModal, setActiveModal] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    React.useState("F");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const token = localStorage.getItem("jwt");

  //modal functions
  const closeModal = () => {
    setActiveModal(null);
  };

  const openConfirmationModal = () => {
    setActiveModal("delete confirmation");
  };

  //server request handlers

  const handleUserRegistration = (inputValues) => {
    setIsLoading(true);
    auth
      .register(inputValues)
      .then(() => {
        handleUserLogin(inputValues);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUserLogin = (inputValues) => {
    setIsLoading(true);
    auth
      .login(inputValues)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          closeModal();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    !isLiked
      ? api
          .addCardLike({ itemId: id }, token)
          .then((data) => {
            setClothingCards((clothingCards) =>
              clothingCards.map((card) => (card._id === id ? data.data : card))
            );
          })
          .catch((err) => {
            console.log(err);
          })
      : api
          .removeCardLike({ itemId: id }, token)
          .then((data) => {
            setClothingCards((clothingCards) =>
              clothingCards.map((card) => (card._id === id ? data.data : card))
            );
          })
          .catch((err) => {
            console.log(err);
          });
  };

  const handleEditProfileSubmit = (inputValues) => {
    setIsLoading(true);
    api
      .updateUserProfile(inputValues, token)
      .then((data) => {
        setCurrentUser(data.data);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddItemSubmit = (inputValues) => {
    setIsLoading(true);
    api
      .addItem(inputValues, token)
      .then((data) => {
        setClothingCards([data.data, ...clothingCards]);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardDelete = () => {
    setIsLoading(true);
    api
      .deleteItem({ itemId: selectedCard._id }, token)
      .then(() => {
        const updatedClothingCards = clothingCards.filter(
          (item) => item._id !== selectedCard._id
        );
        setClothingCards([...updatedClothingCards]);
        closeModal();
        setSelectedCard(null);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //button handlers

  const handleEditProfileButtonClick = () => {
    setActiveModal("edit profile");
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
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

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview card");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  //side effects

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

  React.useEffect(() => {
    if (token) {
      api
        .getUser(token)
        .then((data) => {
          setCurrentUser(data.data);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

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
              currentUser={currentUser}
              weatherData={weatherData}
              cards={clothingCards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
            />
          </Route>
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/profile">
            <Profile
              handleLogOut={handleLogOut}
              handleEditProfileButtonClick={handleEditProfileButtonClick}
              currentUser={currentUser}
              cards={clothingCards}
              weatherData={weatherData}
              onCardClick={handleCardClick}
              handleAddCardClick={handleAddCardClick}
              onCardLike={handleCardLike}
            />
          </ProtectedRoute>
          <Footer />
          {activeModal === "register" && (
            <RegisterModal
              handleUserRegistration={handleUserRegistration}
              closeModal={closeModal}
              isOpen={true}
              handleRedirectButtonClick={handleRedirectButtonClick}
              isLoading={isLoading}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              handleUserLogin={handleUserLogin}
              closeModal={closeModal}
              isOpen={true}
              handleRedirectButtonClick={handleRedirectButtonClick}
              isLoading={isLoading}
            />
          )}
          {activeModal === "new card" && (
            <AddItemModal
              isOpen={true}
              onAddItem={handleAddItemSubmit}
              closeModal={closeModal}
              isLoading={isLoading}
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
              isLoading={isLoading}
              closeModal={closeModal}
              handleCardDelete={handleCardDelete}
            />
          )}
          {activeModal === "edit profile" && (
            <EditProfileModal
              closeModal={closeModal}
              currentUser={currentUser}
              handleEditProfileSubmit={handleEditProfileSubmit}
              isLoading={isLoading}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
