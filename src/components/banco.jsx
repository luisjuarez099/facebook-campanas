
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Banco = () => {
  const [campanas, setCampanas] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editCampana, setEditCampana] = useState(null);

  const fetchCampanas = async () => {
    try {
      const response = await fetch("http://localhost:3001/campanas");
      const data = await response.json();
      setCampanas(data);
      setFiltered(data);
    } catch (error) {
      console.error("Error fetching campanas:", error);
    }
  };

  useEffect(() => {
    fetchCampanas();
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setQuery(inputValue);
    setFiltered(
      campanas.filter((campana) =>
        campana.nombre.toLowerCase().includes(inputValue)
      )
    );
    setIsOpen(true);
  };

  const handleSelect = (nombre) => {
    setQuery(nombre);
    setIsOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/campanas/${id}`, {
        method: "DELETE",
      });
      setCampanas((prev) => prev.filter((campana) => campana.id !== id));
      setFiltered((prev) => prev.filter((campana) => campana.id !== id));
      alert("Campaña eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar la campaña:", error);
    }
  };

  const handleEdit = (campana) => {
    setEditCampana(campana);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3001/campanas/${editCampana.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editCampana),
      });
      setCampanas((prev) =>
        prev.map((campana) =>
          campana.id === editCampana.id ? editCampana : campana
        )
      );
      setFiltered((prev) =>
        prev.map((campana) =>
          campana.id === editCampana.id ? editCampana : campana
        )
      );
      alert("Campaña actualizada correctamente.");
      setEditCampana(null);
    } catch (error) {
      console.error("Error al actualizar la campaña:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1a1a2e",
        minHeight: "100vh",
        padding: "20px",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div className="container-banco" style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ color: "#f39c12", marginBottom: "20px" }}>Banco </h1>
        <h1 style={{ color: "#f39c12", marginBottom: "20px" }}> de </h1>
        <h1 style={{ color: "#f39c12", marginBottom: "20px" }}> Campañas</h1>
        <div style={{ position: "relative", maxWidth: "500px", margin: "0 auto" }}>
          <input
            type="text"
            style={{
              width: "100%",
              border: "1px solid #ddd",
              padding: "12px",
              borderRadius: "8px",
              fontSize: "16px",
              backgroundColor: "#16213e",
              color: "#fff",
              outline: "none",
            }}
            value={query}
            placeholder="Buscar campaña"
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          />
          {isOpen && (
            <div
              style={{
                position: "absolute",
                zIndex: 10,
                marginTop: "8px",
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#fff",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                maxHeight: "200px",
              }}
            >
              {filtered.map((campana) => (
                <div
                  key={campana.id}
                  onClick={() => handleSelect(campana.nombre)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ddd",
                    backgroundColor: "#f4f4f4",
                  }}
                >
                  {campana.nombre}
                </div>
              ))}
            </div>
          )}
          {isOpen ? (
            <IoIosArrowUp style={{ position: "absolute", right: "10px", top: "15px", color: "#fff" }} />
          ) : (
            <IoIosArrowDown style={{ position: "absolute", right: "10px", top: "15px", color: "#fff" }} />
          )}
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {editCampana ? (
          <form onSubmit={handleUpdate} style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#f39c12" }}>Editar Campaña</h3>
            <input
              type="text"
              value={editCampana.nombre}
              onChange={(e) =>
                setEditCampana({ ...editCampana, nombre: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                backgroundColor: "#16213e",
                color: "#fff",
                border: "1px solid #f39c12",
              }}
            />
            <textarea
              value={editCampana.descripcion}
              onChange={(e) =>
                setEditCampana({ ...editCampana, descripcion: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                backgroundColor: "#16213e",
                color: "#fff",
                border: "1px solid #f39c12",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                borderRadius: "8px",
                backgroundColor: "#f39c12",
                color: "#fff",
                border: "none",
              }}
            >
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={() => setEditCampana(null)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: "#d35400",
                color: "#fff",
                border: "none",
              }}
            >
              Cancelar
            </button>
          </form>
        ) : (
          filtered.map((campana) => (
            <div
              key={campana.id}
              style={{
                backgroundColor: "#16213e",
                color: "#fff",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h3 style={{ color: "#f39c12" }}>{campana.nombre}</h3>
              <p>ID: {campana.id}</p>
              <p>Descripción: {campana.descripcion}</p>
              <button
                onClick={() => handleEdit(campana)}
                style={{
                  padding: "8px 16px",
                  marginRight: "10px",
                  borderRadius: "8px",
                  backgroundColor: "#f39c12",
                  color: "#fff",
                  border: "none",
                }}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(campana.id)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#d35400",
                  color: "#fff",
                  border: "none",
                }}
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Banco;

