import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({
  closeModal,
  currentUser,
  handleEditProfileSubmit,
}) {
  const [values, setValues] = React.useState({
    name: currentUser.name,
    avatar: currentUser.avatar,
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleEditProfileSubmit(values);
  };

  return (
    <ModalWithForm
      closeModal={closeModal}
      submitButtonText={"Save changes"}
      name="edit-profile"
      title={"Change profile data"}
      handleSubmit={handleSubmit}
    >
      <label className="form__label" htmlFor="name">
        Name*
      </label>
      <input
        className="form__input"
        type="text"
        id="name"
        name="name"
        value={values.name}
        placeholder="name"
        autoComplete="off"
        required
        onChange={handleChange}
      />
      <label className="form__label" htmlFor="avatar">
        Avatar
      </label>
      <input
        className="form__input"
        id="avatar"
        name="avatar"
        value={values.avatar}
        placeholder="Avatar URL"
        autoComplete="off"
        type="url"
        onChange={handleChange}
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
