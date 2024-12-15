import React from "react";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUserName = (e) => {
    console.log(e.target.value);
  };
  const handlePasswd = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que se envíe el formulario y los datos vayan a la URL
    alert("Inicio de sesión exitoso");

  };
  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} >
        <div
          style={{
            // border: "1px solid black",
            width: "100%",
            height: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "250px",
              width: "350px",
              border: "1px solid",
              padding: "5px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#555",
                }}
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleUserName}
                style={{
                  width: "330px",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#555",
                }}
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handlePasswd}
                style={{
                  width: "330px",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                }}
              />
            </div>
            <div
              style={{
                marginTop: "2px",
                justifyContent: "right",
                display: "flex",
                width: "auto",
                // border: "1px solid",
              }}
            >
              <button>
                <a href="/dashboard" >Iniciar Sesión</a>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
