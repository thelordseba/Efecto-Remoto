import React, { useEffect, useState, useMemo } from "react";
import OrderCard from "../../components/OrderCard/OrderCard.js";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions";

export default function OrderTable({userId}) {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  let [status, setStatus] = useState("allStatus");

  const statusList = [
    { id: 1, name: "Carrito", value: "cart" },
    { id: 2, name: "Iniciada", value: "created" },
    { id: 3, name: "En Proceso", value: "processing" },
    { id: 4, name: "Cancelada", value: "cancelled" },
    { id: 5, name: "Completada", value: "completed" },
  ];

  const handleOnChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    (async () => {
      if (status === "allStatus") dispatch(actions.getOrders());
      else {
        dispatch(actions.getOrdersByStatus(status));
      }
    })();
  }, [dispatch, status]);

  const mappedOrders = useMemo(() => {
    if(orders) {
      console.log(orders)
      console.log(userId)
      let mappedOrders = orders
      if (userId) {
        mappedOrders = orders.map((order) => {
        if (order.user?.id === userId) {
          return <OrderCard order={order} key={order.id} />}
        })
      } else {
        mappedOrders = orders.map((order) => <OrderCard order={order} key={order.id} />)
      }
      return mappedOrders
    }
      },[userId, orders])

  return (
    //además deberia mostrar el nombre del producto,precio e imagen
    <>
      <div className="product-catalog-container">
        <label className="tituloForm">Seleccioná un estado: </label>
        <select className="select" onChange={handleOnChange}>
          <option value="allStatus">Todas los estados</option>
          {statusList.map((s) => (
            <option value={s.value} key={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>--- Listado de ordenes ---</label>
        <br />
        <br />
        {mappedOrders}
      </div>
    </>
  );
}
