import React, { useState } from 'react';

function Password({ updatePassword }) {
  const [showPassword, setShowPassword] = useState(false)
  function handlePasswordChange(event) {
    updatePassword(event.target.value)
  }

  function handleToggleShowClick() {
    setShowPassword(!showPassword)
  }

  function handleOnFocus(event) {
    updatePassword(event.target.value || '')
  }

  function passwordType() {
    return showPassword ? 'text' : 'password'
  }

  function showHideText() {
    return showPassword ? 'Ocultar' : 'Mostrar'
  }
  return (<div className='newPass'>
  <input type={ passwordType() }
         placeholder="Nueva contraseña"
         onFocus={ handleOnFocus }
         onChange={ handlePasswordChange }></input>
  <button title='Mostrar' onClick={ handleToggleShowClick }>{ showHideText() }</button>

</div>)

}

export default Password