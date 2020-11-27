import React, {useEffect,  useMemo,  useState } from 'react';
import Password from "./Password.js";
import PasswordConfirmation from "./PasswordConfirmation.js";
import ErrorsList from "./ErrorsList.js";
import ConfirmBtn from "./ConfirmBtn.js";
import axios from "axios";

function ResetPassword({history, minLength=null, shouldContainUpperCase = false, shouldContainLowerCase = false,shouldContainNumber = false, shouldContainSpecialCharacter = false}) {
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [passwordErrors, setPasswordErrors] = useState({})
  const [passwordConfirmationErrors, setPasswordConfirmationErrors] = useState({})

  const allPasswordErrors =  {
    invalid_length:
      "Debe contener al menos " + minLength + " muchos caracteres",
    missing_characters: invalidCharactersMessage()
  }

  const allPasswordConfirmationErrors = {
    match_password_and_confirmation: "Las contraseñas no coinciden.",
  }
 
  function updatePassword(password) {
    setPassword(password)
  }

 function updatePasswordConfirmation(passwordConfirmation) {
    setPasswordConfirmation(passwordConfirmation)
  }

  useEffect(() => {
    validatePassword()
    validatePasswordConfirmation()
  },[password, passwordConfirmation])

  
 function validatePassword() {
    validateLength()
    validateCharacters()
  }

  async function handleOnClick(event) {
    const user = {
      email: "jose@123.com",
    };
    event.preventDefault();
    if (!password) {
      alert("Debes completar todos los campos");
    } else {
      const userId = await axios.get(
        `${process.env.REACT_APP_API}/users/getUserbyId?userEmail=${user.email}`
      );
      await axios.post(
        `${process.env.REACT_APP_API}/users/${userId}/resetPassword`,password
      );
      alert("contraseña Cambiada");
      history.push("/");
    }
  }
  
  function validatePasswordConfirmation() {
    var errors = {...passwordConfirmationErrors};
    var errorKey = "match_password_and_confirmation";
    if (password !== passwordConfirmation) {
      errors[errorKey] = allPasswordConfirmationErrors[errorKey];
    } else {
      delete errors[errorKey];
    }
    setPasswordConfirmationErrors(errors)
  }

  function validateLength() {
    var errors = {...passwordErrors};
    var errorKey = "invalid_length";

    if (password.length < minLength) {
      errors[errorKey] = allPasswordErrors[errorKey];
    } else {
      delete errors[errorKey];
    }
    setPasswordErrors(errors)
  }

  function validateCharacters() {
    var errors = {...passwordErrors},
      errorKey = "missing_characters";
    const upper = shouldContainUpperCase && !containsUpperCase()
    const lower = shouldContainLowerCase && !containsLowerCase()
    const number = shouldContainNumber && !containsNumber()
    const special = shouldContainSpecialCharacter &&
    !containsSpecialCharacter()

    if (
      upper ||
      lower ||
      number ||
      special
    ) {
      errors[errorKey] = allPasswordErrors[errorKey];
    } else {
      delete errors[errorKey];
    }

    setPasswordErrors(errors)
  }

  function containsNumber() {
    return /[0-9]/g.test(password);
  }

  function containsUpperCase() {
    return /[A-Z]/g.test(password);
  }

  function containsLowerCase() {
    return /[a-z]/g.test(password)
  }

  function containsSpecialCharacter() {
    let regex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]*$/g
    return regex.test(password);
  }

  function invalidCharactersMessage() {
    var startString = "Debe contener al menos",
      errors = [];

    if (shouldContainUpperCase) {
      errors.push("1 letra mayúscula");
    }
    if (shouldContainLowerCase) {
      errors.push("1 letra minúscula");
    }
    if (shouldContainNumber) {
      errors.push("1 número");
    }
    if (shouldContainSpecialCharacter) {
      errors.push("1 caracter especial (!, @, *, etc)");
    }

    if (errors.length === 0) {
      return;
    } else if (errors.length === 1) {
      return startString + " " + errors[0];
    } else {
      return (
        startString +
        " " +
        errors.slice(0, errors.length - 1).join(", ") +
        " and " +
        errors.slice(errors.length - 1)
      );
    }
  }
 const mappedErrorList= useMemo(()=> {
  return <ErrorsList
      allErrors={allPasswordConfirmationErrors}
      errors={passwordConfirmationErrors}
    />
  },[passwordConfirmationErrors])
  
return (
  <div className="container-rp">
    <h2 className="res-pass">Restablecer contraseña</h2>
    <Password updatePassword={updatePassword} />
    <ErrorsList
      allErrors={allPasswordErrors}
      errors={passwordErrors}
    ></ErrorsList>

    <PasswordConfirmation
      updatePasswordConfirmation={updatePasswordConfirmation}
    />
    {mappedErrorList}
    <ConfirmBtn onClick={handleOnClick} />
  </div>
) 
} 
export default ResetPassword