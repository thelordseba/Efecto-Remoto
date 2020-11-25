import React, { useEffect } from "react";
import NgoCard from "../../components/NgoCard/NgoCard.js";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions";
import { useHistory } from "react-router-dom";

export default function OrderTable() {
  const ngos = useSelector((state) => state.ngos);
  const dispatch = useDispatch();
  const handleOnClickAddNgo = () => history.push(`/admin/ngos/add`);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      dispatch(actions.getNgos());
    })();
  }, [dispatch]);

  return (
    //además deberia mostrar el nombre del producto,precio e imagen
    <div>
      <div className="product-catalog-button" onClick={handleOnClickAddNgo}>
        Agregar ONG
      </div>

      <label>--- Listado de ONGs ---</label>
      {ngos && ngos.map((ngo) => <NgoCard key={ngo.createdAt} ngo={ngo} />)}
    </div>
  );
}
