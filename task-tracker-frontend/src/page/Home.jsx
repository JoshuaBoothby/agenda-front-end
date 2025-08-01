import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endPoint = "user/auth";

export const Home = ({ userName, modifyName }) => {
  const navigate = useNavigate();

  const [resultLogIn, setResultLogIn] = useState("");

  const [body, setBody] = useState({
    email: "",
    password: "",
  });

  const formHandler = (event) => {
    const temp = {
      email: body.email,
      password: body.password,
    };
    temp[event.target.name] = event.target.value;
    setBody(temp);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const url = `${baseUrl}/${endPoint}`;

    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.ok) {
      const data = await result.json();
      localStorage.setItem("token", data.token);
      navigate("/employees");
    } else {
      setResultLogIn("Invalid Log In");
    }
  };
  return (
    <>
      <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="card p-4" style={{ maxWidth: "80%", width: "100%" }}>
          <h3 className="text-center mb-2">log in</h3>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                name="email"
                onChange={formHandler}
                type="email"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                name="password"
                onChange={formHandler}
                type="password"
                className="form-control"
              />
            </div>

            <p>{resultLogIn}</p>

            <button type="submit" className="btn btn-primary w-100">
              Log In
            </button>
          </form>
          <button type="submit" className="btn btn-secondary mt-2 w-100">
            Register
          </button>
        </div>
      </div>
    </>
  );
};
