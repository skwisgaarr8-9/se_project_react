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
  const [weatherData, setWeatherData] = React.useState({});
  const [clothingCards, setClothingCards] = React.useState([]);
  const [activeModal, setActiveModal] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    React.useState("F");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  const token = localStorage.getItem("jwt");

  const handleUserRegistration = (inputValues) => {
    auth
      .register(inputValues)
      .then(() => {
        // want to use handleUserLogin() here but if i do, the token variable in useEffect does not update automatically
        // maybe something with asynchronous code but not sure how to optimize
        auth.login(inputValues).then((data) => {
          if (data.token) {
            localStorage.setItem("jwt", data.token);
            closeModal();
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUserLogin = (inputValues) => {
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
    api.updateUserProfile(inputValues, token).then((data) => {
      setCurrentUser(data.data);
      closeModal();
    });
  };

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

  const handleAddItemSubmit = (inputValues) => {
    api
      .addItem(inputValues, token)
      .then((data) => {
        setClothingCards([data.data, ...clothingCards]);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = () => {
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

  React.useEffect(() => {
    if (token) {
      api.getUser(token).then((data) => {
        setCurrentUser(data.data);
        setIsLoggedIn(true);
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
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              handleUserLogin={handleUserLogin}
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
          {activeModal === "edit profile" && (
            <EditProfileModal
              closeModal={closeModal}
              currentUser={currentUser}
              handleEditProfileSubmit={handleEditProfileSubmit}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
