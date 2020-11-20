import React from 'react'
import Facebook from "./Facebook";
import Google from "./Google";

export default function LoginWithToken() {
    return (
        <div>
        <button
          onClick={() =>
            (window.location = `${process.env.REACT_APP_API}/auth/login/google`)
          }
        >
          <Google fill="teal" />
        </button>
        <button
          onClick={() =>
            (window.location = `${process.env.REACT_APP_API}/auth/login/facebook`)
          }
        >
          <Facebook fill="teal" />
        </button>
      </div>
    );
};