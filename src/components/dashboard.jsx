import React, { useEffect } from "react";
import { useState } from "react";
const Dashboard = () => {
  const [campanas, setCampanas] = useState([]);
  const [campaignData, setCampaignData] = useState({
    "nombre": "",
    "descripcion": "",
    "palabras_clave": "",
    "categoria": "",
    "estado": "Pendiente", //Se toma por defecto
    "intervalo": 0,
  });

  useEffect(() => {
    fetch("http://localhost:3001/campanas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.table(data);
        setCampanas(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleMain = (e, type) =>{

    setCampaignData((prevData) => ({
      ...prevData,
      nombre:type === "nombre" ? e : prevData.nombre,
      descripcion:type === "descripcion" ? e : prevData.descripcion,
      palabras_clave:type === "palabras_clave" ? e : prevData.palabras_clave,
      categoria:type === "categoria" ? e : prevData.categoria,
      intervalo:type === "intervalo" ? parseInt(e): prevData.intervalo,
    }));

    if(type === "nombre"){
      handleNombre(e);  
    }if(type === "descripcion"){
      handleDescripcion(e);
    }if(type === "palabras_clave"){
      handlePalabrasClave(e);
    }if(type === "categoria"){
      handleCategoria(e);
    }if(type === "intervalo"){
      handleIntervalo(e);
    }
  }

  const handleNombre =  (e)=>{
    console.log(e);
  }

  const handleDescripcion =  (e)=>{
    console.log(e);
  }

  const handlePalabrasClave =  (e)=>{
    console.log(e);

  }

  const handleCategoria =  (e)=>{

    console.log(e);

  }

  const handleIntervalo =  (e)=>{
    console.log(e);

  }

  const handleSubmit = () => {
    // debugger;
    console.log("Enviando formulario"+campaignData);
    fetch("http://localhost:3001/campanas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campaignData),
    })
      // .finally(() => {
      //   window.location.reload();
      // });
    
    // console.log(campaignData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            padding: "10px",
            height: "80%",
            border: "1px solid #ccc",
            borderRadius: "8px",
            maxWidth: "500px",
            margin: "10px auto",
          }}
        >
          <label>Nombre de la campaña</label>
          <input type="text" name="nombre" onChange={(e)=>handleMain(e.target.value, "nombre")} />
          <label>Descripción del producto</label>
          <input type="text" name="descripcion" onChange={(e)=>handleMain(e.target.value, "descripcion")}/>
          <label>Palabras clave</label>
          <input type="text" name="palabras_clave" onChange={(e)=>handleMain(e.target.value, "palabras_clave")}/>
          <label>Categoría del producto</label>
          <input type="text" name="categoria" onChange={(e)=>handleMain(e.target.value, "categoria")}/>
          {/* <label>Imágenes</label>
          <input type="file" name="images" /> */}
          <label>Intervalo entre publicaciones</label>
          <input type="number" name="intervalo" min="3" max="20" onChange={(e)=>handleMain(parseInt(e.target.value), "intervalo")}/>
          {/* <label>Solicitudes de unión a grupos</label>
          <input type="text" name="groupRequests" /> */}

          <div>
            <h2>Visualización de Campañas</h2>
            <div
              style={{
                overflow: "auto",
                height: "250px", // Ajusta la altura según lo que necesites
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            >
              {campanas.map((campana, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    padding: "20px",
                    borderRadius: "8px",
                    margin: "10px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3>{campana.nombre}</h3>
                  <p>{campana.id}</p>
                  <p>{campana.descripcion}</p>
                  <p>{campana.palabras_clave}</p>
                  <p>{campana.estado}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
      <button onClick={()=>handleSubmit()} type="submit">Guardar</button>
    </div>
  );
};

export default Dashboard;