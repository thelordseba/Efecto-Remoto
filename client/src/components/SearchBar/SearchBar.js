import SearchIcon from "components/Icons/SearchIcon.js";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../../redux/actions/actions.js";
import styles from "./SearchBar.module.scss";

function SearchBar() {
  let [content, setContent] = useState("");

  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    setContent(event.target.value);
  };

  const handleOnClick = () => {
    dispatch(setSearch(content));
  };

  return (
    <div className={styles.container}>
      <input type="text" onChange={handleOnChange} placeholder="Buscar..." />
      <button onClick={handleOnClick}>
        <SearchIcon fill="#fff" size={18} />
      </button>
    </div>
  );
}

export default SearchBar;
