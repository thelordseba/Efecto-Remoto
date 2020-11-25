import React from 'react';





function PasswordConfirmation({showPasswordConfirmation= false}) {
  function handleUpdatePasswordConfirmation(event) {
    updatePasswordConfirmation(event.target.value)
    }
    
    function handleToggleShowClick() {
      setState({
        showPasswordConfirmation: !showPasswordConfirmation
      });
      
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
           onChange={handleUpdatePasswordConfirmation() }></input>
    <button onClick={handleToggleShowClick() }>{showHideText() }</button>
  </div>
}

export default PasswordConfirmation
