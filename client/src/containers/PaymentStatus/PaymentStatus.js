import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function PaymentStatus(props) {
  const user = useSelector((state) => state.currentUser);

  if (props.success) {
    localStorage.removeItem("cart");
  }

  useEffect(() => {
    (async () => {
      await axios
        .get(`${process.env.REACT_APP_API}/orders/${user.id}/shopping-cart`)
        .then(
          (response) => {
            if (response.data === null)
              axios.post(`${process.env.REACT_APP_API}/orders/${user.id}`);
          },
          (error) => {
            alert(error);
          }
        )
        .catch((error) => alert(error));
    })();
  }, [user.id]);

  const history = useHistory();
  function handleGoBack() {
    history.push(`/`);
  }

  return (
    <div>
      {props.success ? (
        <label>¡Tu compra fue realizada con éxito! Muchas gracias :D</label>
      ) : (
        <label>Error en la compra. Por favor, volvé a intentar.</label>
      )}

      <div onClick={handleGoBack}>Volver a Home</div>
    </div>
  );
}
export default PaymentStatus;
