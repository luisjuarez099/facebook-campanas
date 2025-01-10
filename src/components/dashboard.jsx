import React, { useEffect } from "react";
import { useState } from "react";

const Dashboard = () => {
  const [campanas, setCampanas] = useState([]);
  const [campaignData, setCampaignData] = useState({
    "nombre": "",
    "descripcion": "",
    "palabras_clave": "",
    "categoria": "",
    "estado": "Pendiente", // Se toma por defecto
    "intervalo": 0,
  });

  useEffect(() => {
    fetch("http://localhost:3001/campanas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCampanas(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleMain = (e, type) => {
    setCampaignData((prevData) => ({
      ...prevData,
      nombre: type === "nombre" ? e : prevData.nombre,
      descripcion: type === "descripcion" ? e : prevData.descripcion,
      palabras_clave: type === "palabras_clave" ? e : prevData.palabras_clave,
      categoria: type === "categoria" ? e : prevData.categoria,
      intervalo: type === "intervalo" ? parseInt(e) : prevData.intervalo,
    }));
  };

  const handleSubmit = () => {
    fetch("http://localhost:3001/campanas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campaignData),
    })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        window.location.reload();
      });
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#16213e", minHeight: "100vh", padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            padding: "20px",
            backgroundColor: "#34495e", // Azul oscuro mate para el formulario
            borderRadius: "8px",
            maxWidth: "500px",
            margin: "10px auto",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <label style={{ color: "#ecf0f1", fontSize: "16px", fontWeight: "bold" }}>Nombre de la campaña</label>
          <input
            type="text"
            name="nombre"
            onChange={(e) => handleMain(e.target.value, "nombre")}
            style={inputStyle}
          />
          <label style={{ color: "#ecf0f1", fontSize: "16px", fontWeight: "bold" }}>Descripción del producto</label>
          <input
            type="text"
            name="descripcion"
            onChange={(e) => handleMain(e.target.value, "descripcion")}
            style={inputStyle}
          />
          <label style={{ color: "#ecf0f1", fontSize: "16px", fontWeight: "bold" }}>Palabras clave</label>
          <input
            type="text"
            name="palabras_clave"
            onChange={(e) => handleMain(e.target.value, "palabras_clave")}
            style={inputStyle}
          />
          <label style={{ color: "#ecf0f1", fontSize: "16px", fontWeight: "bold" }}>Categoría del producto</label>
          <input
            type="text"
            name="categoria"
            onChange={(e) => handleMain(e.target.value, "categoria")}
            style={inputStyle}
          />
          <label style={{ color: "#ecf0f1", fontSize: "16px", fontWeight: "bold" }}>Intervalo entre publicaciones</label>
          <input
            type="number"
            name="intervalo"
            min="3"
            max="20"
            onChange={(e) => handleMain(parseInt(e.target.value), "intervalo")}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Guardar</button>
        </div>
      </form>

      {/* Título fuera de la tabla */}
      <h2 style={{ textAlign: "center", color: "#ecf0f1", fontSize: "22px", marginBottom: "20px" }}>
        Visualización de Campañas
      </h2>

      {/* Contenedor de campañas centrado */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", padding: "10px" }}>
        <div
          style={{
            overflow: "auto",
            height: "250px",
            width: "80%", // Ajustar al 80% del ancho
            maxWidth: "800px", // Establecer un ancho máximo para hacerlo más responsivo
            padding: "10px",
            border: "1px solid #7f8c8d",
            backgroundColor: "#34495e",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {campanas.map((campana, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #7f8c8d",
                padding: "20px",
                borderRadius: "8px",
                margin: "10px",
                backgroundColor: "#1abc9c",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 style={{ color: "#ecf0f1", fontSize: "18px" }}>{campana.nombre}</h3>
              <p style={{ color: "#ecf0f1" }}>{campana.id}</p>
              <p style={{ color: "#ecf0f1" }}>{campana.descripcion}</p>
              <p style={{ color: "#ecf0f1" }}>{campana.palabras_clave}</p>
              <p style={{ color: "#ecf0f1" }}>{campana.estado}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #7f8c8d",
  fontSize: "16px",
  marginTop: "5px",
  outline: "none",
};

const buttonStyle = {
  backgroundColor: "#2980b9", // Azul mate no tan brillante
  color: "white",
  padding: "12px 20px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "15px",
  transition: "background-color 0.3s ease",
};

export default Dashboard;

