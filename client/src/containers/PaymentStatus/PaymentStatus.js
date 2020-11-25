import React from "react";


function PaymentStatus(props) {

    function handleGoBack() {
        props.history.push(`/`);
    }
    
  return (
    <div>
        <label>Tu compra fue realizada con éxito! :D</label>
        <br/>
        <label>Error en la compra :( </label>
        <div onClick={handleGoBack}>
          Volver a Home
        </div>
    </div>
  );
}
export default PaymentStatus;
