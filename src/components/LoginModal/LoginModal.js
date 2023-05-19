import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({
  closeModal,
  isOpen,
  handleRedirectButtonClick,
  handleUserLogin,
  isLoading,
}) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUserLogin(values);
  };

  React.useEffect(() => {
    if (isOpen) {
      setValues({
        email: "",
        password: "",
      });
    }
  }, [isOpen, setValues]);

  return (
    <ModalWithForm
      name="login"
      title={"Log in"}
      submitButtonText={isLoading ? "Logging in..." : "Log in"}
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      registerOrLoginModal={true}
      redirectButtonText={"or Register"}
      handleRedirectButtonClick={handleRedirectButtonClick}
    >
      <label className="form__label" htmlFor="email">
        Email
      </label>
      <input
        className="form__input"
        type="email"
        id="email"
        name="email"
        value={values.email}
        required
        placeholder="Email"
        autoComplete="off"
        onChange={handleChange}
      />
      <label className="form__label" htmlFor="password">
        Password
      </label>
      <input
        className="form__input"
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={values.password}
        required
        autoComplete="off"
        onChange={handleChange}
      />
    </ModalWithForm>
  );
}

export default LoginModal;
