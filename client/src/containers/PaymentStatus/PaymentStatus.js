import React from "react";


function PaymentStatus(props) {
//   const user = localStorage.getItem("user");
//   const [localUser, setLocalUser] = useState(user ? JSON.parse(user) : null);

// axios.get(`http://localhost:3001/orders/${user.id}/shopping-cart`)
//     .then(response => {
//       if(response.data === null) axios.post(`http://localhost:3001/orders/${user.id}`)
//     }, (error) => {console.log(error);})
//     .catch(error => console.log(error))


    function handleGoBack() {
        props.history.push(`/`);
    }
    
  return (
    <div>
      {props.success ? <label>Tu compra fue realizada con éxito! :D</label> : <label>Error en la compra :( </label>}
        <div onClick={handleGoBack}>
          Volver a Home
        </div>
        
    </div>
  );
}
export default PaymentStatus;
