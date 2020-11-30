import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Succes from "./Video/Succes.png";
import Cancel from "./Video/Cancel.png";
import axios from "axios";
import "./PaymentStatus.scss"

function PaymentStatus(props) {
  const user = useSelector((state) => state.currentUser);

  if (props.success) {
    localStorage.removeItem("cart");
  }

  useEffect(() => {
    (async () => {
      if (user.id) {
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
      }
    })();
  }, [user.id]);

  const history = useHistory();
  function handleGoBack() {
    history.push(`/`);
  }

  return (
    <div>
      {props.success ? (
    
        <div className="img-succes">
          <img
            className="img-succes"
            src={Succes}
            alt={"No puede mostrarse la imagen"}
          />
          </div>
    

        //  <label>¡Tu compra fue realizada con éxito! Muchas gracias :D</label>
      ) : (
        <div className="img-cancel">
          <img
            className="img-cancel"
            src={Cancel}
            alt={"No puede mostrarse la imagen"}
          />
          </div>
        // <label>Error en la compra. Por favor, volvé a intentar.</label>
      )}

      <div className="Home">
      <button className="button" onClick={handleGoBack}>Volver a Home</button>
      </div>
    </div>
  );
}
export default PaymentStatus;
