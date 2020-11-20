import React from 'react';
import { useHistory } from 'react-router-dom';
import Password from './Password.js';
import PasswordConfirmation from './PasswordConfirmation.js';
import ErrorsList from './ErrorsList.js';
import ConfirmBtn from './ConfirmBtn.js';
import axios from 'axios';



export default class ResetPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirmation: '',
      allPasswordErrors: this.allPasswordErrors(),
      passwordErrors: {},
      allPasswordConfirmationErrors: this.allPasswordConfirmationErrors(),
      passwordConfirmationErrors: {}
    };

    this.updatePassword = this.updatePassword.bind(this);
    this.updatePasswordConfirmation = this.updatePasswordConfirmation.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  updatePassword(password) {
    this.setState({ password: password }, function() {
      this.validatePassword();
      this.validatePasswordConfirmation();
    });
  }

  updatePasswordConfirmation(passwordConfirmation) {
    this.setState({ passwordConfirmation: passwordConfirmation }, function() {
      this.validatePasswordConfirmation();
    });
  }

  validatePassword() {
    this.validateLength();
    this.validateCharacters();
  }

  handleOnClick() {
    console.log(this.state.password)
  }
  
  
  async handleOnClick(event) {
    const user = {
      email: 'jose@123.com'
    }
    event.preventDefault()
    if(!this.state.password) {
      alert("Debes completar todos los campos");
    } else {
      const userId = await axios.get(`${process.env.REACT_APP_API}/users/getUserbyId?userEmail=${user.email}`)
      await axios.post(`${process.env.REACT_APP_API}/users/${userId}/resetPassword`, this.state.password)
      alert("contraseña Cambiada");
       this.props.history.push('/')
    }
  }

  

  validatePasswordConfirmation() {
    var errors = this.state.passwordConfirmationErrors;
    var errorKey = 'match_password_and_confirmation';

    if (this.state.password !== this.state.passwordConfirmation) {
      errors[errorKey] = this.state.allPasswordConfirmationErrors[errorKey];
    }
    else {
      delete(errors[errorKey]);
    }

    this.setState({ passwordConfirmationErrors: errors });
  }

  validateLength() {
    var errors = this.state.passwordErrors;
    var errorKey = 'invalid_length';

    if (this.state.password.length < this.props.minLength) {
      errors[errorKey] = this.state.allPasswordErrors[errorKey];
    }
    else {
      delete(errors[errorKey]);
    }

    this.setState({ passwordErrors: errors });
  }

  validateCharacters() {
    var errors = this.state.passwordErrors
      , errorKey = 'missing_characters';

    if (this.props.shouldContainUpperCase && !this.containsUpperCase() ||
      this.props.shouldContainLowerCase && !this.containsLowerCase() ||
      this.props.shouldContainNumber && !this.containsNumber() ||
      this.props.shouldContainSpecialCharacter && !this.containsSpecialCharacter()) {

      errors[errorKey] = this.state.allPasswordErrors[errorKey];
    }
    else {
      delete(errors[errorKey]);
    }

    this.setState({ passwordErrors: errors });
  }

  containsNumber() {
    return /[0-9]/g.test(this.state.password);
  }

  containsUpperCase() {
    return /[A-Z]/g.test(this.state.password);
  }

  containsLowerCase() {
    return /[a-z]/g.test(this.state.password);
  }

  containsSpecialCharacter(){
    return /[!@#$%&*+=;,|:<>\?]/g.test(this.state.password)
  }

  invalidCharactersMessage() {
    var startString = 'Debe contener al menos'
      , errors = [];

    if (this.props.shouldContainUpperCase) {
      errors.push('1 letra mayúscula');
    }
    if (this.props.shouldContainLowerCase) {
      errors.push('1 letra minúscula');
    }
    if (this.props.shouldContainNumber) {
      errors.push('1 número');
    }
    if (this.props.shouldContainSpecialCharacter) {
      errors.push('1 caracter especial (!, @, *, etc)');
    }

    if (errors.length === 0) {
      return;
    }
    else if (errors.length === 1) {
      return startString + ' ' + errors[0];
    }
    else {
      return startString + ' ' + errors.slice(0, errors.length-1).join(', ') + ' and ' + errors.slice(errors.length-1);
    }
  }

  allPasswordConfirmationErrors() {
    return {
      'match_password_and_confirmation': 'Las contraseñas no coinciden.'
    }
  }

  allPasswordErrors() {
    return {
      'invalid_length': 'Debe contener al menos ' + this.props.minLength + ' muchos caracteres',
      'missing_characters': this.invalidCharactersMessage()
    }
  }

  render() {
    return <div className="container-rp">
      <h2 className='res-pass'>Restablecer contraseña</h2>
      <Password updatePassword={ this.updatePassword } />
      <ErrorsList allErrors={ this.state.allPasswordErrors }
                  errors={ this.state.passwordErrors }></ErrorsList>

      <PasswordConfirmation updatePasswordConfirmation={ this.updatePasswordConfirmation } />
      <ErrorsList allErrors={ this.state.allPasswordConfirmationErrors }
                  errors={ this.state.passwordConfirmationErrors }></ErrorsList>
       <ConfirmBtn onClick={this.handleOnClick}/>
    </div>;
  }
}

ResetPassword.defaultProps = {
  minLength:                        null,
  shouldContainUpperCase:           false,
  shouldContainLowerCase:           false,
  shouldContainSpecialCharacter:    false,
  shouldContainNumber:              false
};