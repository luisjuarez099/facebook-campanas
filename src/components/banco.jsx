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
    <div>
      <div className="container-banco">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <p>Banco de campañas</p>
        </div>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            style={{
              width: "100%",
              border: "1px solid #ddd",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.375rem",
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
                marginTop: "0.25rem",
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "0.375rem",
                backgroundColor: "#fff",
                overflow: "auto",
                maxHeight: "200px",
              }}
            >
              {filtered.map((campana) => (
                <div
                  key={campana.id}
                  onClick={() => handleSelect(campana.nombre)}
                  style={{
                    padding: "0.5rem 0.75rem",
                    cursor: "pointer",
                  }}
                >
                  {campana.nombre}
                </div>
              ))}
            </div>
          )}
          {isOpen ? (
            <IoIosArrowUp style={{ position: "absolute", right: "10px", top: "10px" }} />
          ) : (
            <IoIosArrowDown style={{ position: "absolute", right: "10px", top: "10px" }} />
          )}
        </div>
      </div>

      <div>
        {editCampana ? (
          <form onSubmit={handleUpdate} style={{ marginBottom: "20px" }}>
            <h3>Editar Campaña</h3>
            <input
              type="text"
              value={editCampana.nombre}
              onChange={(e) =>
                setEditCampana({ ...editCampana, nombre: e.target.value })
              }
              style={{ marginBottom: "10px" }}
            />
            <textarea
              value={editCampana.descripcion}
              onChange={(e) =>
                setEditCampana({ ...editCampana, descripcion: e.target.value })
              }
              style={{ marginBottom: "10px", width: "100%" }}
            />
            <button type="submit">Guardar cambios</button>
            <button type="button" onClick={() => setEditCampana(null)}>
              Cancelar
            </button>
          </form>
        ) : (
          filtered.map((campana) => (
            <div
              key={campana.id}
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
              <p>ID: {campana.id}</p>
              <p>Descripción: {campana.descripcion}</p>
              <button onClick={() => handleEdit(campana)}>Editar</button>
              <button onClick={() => handleDelete(campana.id)}>Eliminar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Banco;
