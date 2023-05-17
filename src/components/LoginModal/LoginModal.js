import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  closeModal,
  isOpen,
  handleRedirectButtonClick,
  handleUserLoginSubmit,
}) {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUserLoginSubmit(values);
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
      });
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      name="login"
      title={"Log in"}
      submitButtonText={"Log in"}
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
