import React, { useState } from "react";
import "./UploadImage.css";
import { storage } from "../../firebase/index.js";

function UploadImage({ handleURL }) {
  let [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (snapshot.state === storage.TaskState.RUNNING) {
          console.log(`Progress: ${progress}%`);
        }
      },
      (error) => {
        alert(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            handleURL(url);
          });
      }
    );
  };

  return (
    <>
      <input onChange={handleChange} type="file" />
      <button onClick={handleUpload}>Cargar Imagen</button>
    </>
  );
}

export default UploadImage;
