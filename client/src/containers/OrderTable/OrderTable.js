import React, { useEffect, useState, useMemo } from "react";
import OrderCard from "../../components/OrderCard/OrderCard.js";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions";
import "./OrderTable.css";

export default function OrderTable({ admin, userId }) {
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
    if (orders) {
      let mappedOrders = [];
      if (userId) {
        mappedOrders = orders.map((order) =>
          order.user?.id === userId ? (
            <OrderCard
              order={order}
              key={order.createdAt}
              className={"alternate_label"}
            />
          ) : null
        );
      } else {
        mappedOrders = orders.map((order) => (
          <OrderCard
            admin={admin}
            order={order}
            key={order.createdAt}
            className={"alternate_label"}
          />
        ));
      }
      return mappedOrders;
    }
  }, [userId, orders, admin]);

  return (
    //además deberia mostrar el nombre del producto,precio e imagen
    <>
      {admin ? (
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
      ) : null}
      <div>
        {admin ? (
          <>
            <label>--- Listado de órdenes ---</label>
            <br />
            <br />
          </>
        ) : null}
        <div className={"alternate_order"}>{mappedOrders}</div>
      </div>
    </>
  );
}
