import React, { useState }from 'react';

function PasswordConfirmation({updatePasswordConfirmation}) {
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  function handleUpdatePasswordConfirmation(event) {
    updatePasswordConfirmation(event.target.value)
    }
    
    function handleToggleShowClick() {
      setShowPasswordConfirmation(!showPasswordConfirmation)
    }
    
function passwordType() {
  return showPasswordConfirmation ? 'text' : 'password';
}

function showHideText() {
  return showPasswordConfirmation ? 'Ocultar' : 'Mostrar'
}
  return <div className="conf-passw">
    <input type={passwordType() }
           placeholder="Confirmar contraseña"
           onChange={handleUpdatePasswordConfirmation}></input>
    <button onClick={handleToggleShowClick }>{showHideText() }</button>
  </div>
}

export default PasswordConfirmation
