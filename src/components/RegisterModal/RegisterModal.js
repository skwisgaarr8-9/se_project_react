import React from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  closeModal,
  isOpen,
  handleRedirectButtonClick,
  handleUserRegistration,
}) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUserRegistration(values);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  };

  React.useEffect(() => {
    if (isOpen) {
      setValues({
        email: "",
        password: "",
        name: "",
        avatar: "",
      });
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      name="register"
      title={"Sign up"}
      submitButtonText={"Next"}
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      registerOrLoginModal={true}
      redirectButtonText={"or Log in"}
      handleRedirectButtonClick={handleRedirectButtonClick}
    >
      <label className="form__label" htmlFor="email">
        Email*
      </label>
      <input
        className="form__input"
        id="email"
        type="email"
        name="email"
        value={values.email}
        required
        placeholder="Email"
        autoComplete="off"
        onChange={handleChange}
      />
      <label className="form__label" htmlFor="password">
        Password*
      </label>
      <input
        className="form__input"
        id="password"
        type="password"
        name="password"
        value={values.password}
        required
        placeholder="Password"
        autoComplete="off"
        onChange={handleChange}
      />
      <label className="form__label" htmlFor="name">
        Name
      </label>
      <input
        className="form__input"
        id="name"
        type="text"
        name="name"
        value={values.name}
        placeholder="Name"
        autoComplete="off"
        onChange={handleChange}
      />
      <label className="form__label" htmlFor="avatar">
        Avatar URL
      </label>
      <input
        className="form__input"
        id="avatar"
        type="url"
        name="avatar"
        value={values.avatar}
        placeholder="Avatar URL"
        autoComplete="off"
        onChange={handleChange}
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
