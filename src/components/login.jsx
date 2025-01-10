import React from "react";

const Login = () => {
    return (
      <div style={{
        fontFamily: 'Roboto, sans-serif',
        backgroundColor: '#34495e',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        <div style={{
          backgroundColor: '#16213e',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          width: '350px',
          textAlign: 'center',
          color: '#fff',
        }}>
          {/* Imagen encabezado */}
          <img
            src="https://i.pinimg.com/originals/e5/6b/84/e56b841924ac729935e858cb59535fb7.png"
            alt=" "
            style={{
              width: '240px',
              height: '240px',
              marginBottom: '20px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #f39c12',
            }}
          />
          <h2 style={{
            fontSize: '26px',
            marginBottom: '20px',
            color: '#f39c12',
          }}>Bienvenido</h2>
          <form action="#" method="POST">
            <label htmlFor="username" style={{
              fontSize: '14px',
              color: '#ddd',
              display: 'block',
              marginBottom: '8px',
            }}>Usuario</label>
            <input type="text" id="username" name="username" required style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box',
              backgroundColor: '#1f4068',
              color: '#fff',
              outline: 'none',
            }} />
            <label htmlFor="password" style={{
              fontSize: '14px',
              color: '#ddd',
              display: 'block',
              marginBottom: '8px',
            }}>Contraseña</label>
            <input type="password" id="password" name="password" required style={{
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box',
              backgroundColor: '#1f4068',
              color: '#fff',
              outline: 'none',
            }} />
            <button type="submit" style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#f39c12',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#d35400'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#f39c12'}
            >
              Iniciar sesión
            </button>
          </form>
          <div style={{
            marginTop: '20px',
          }}>
            <a href="#" style={{
              fontSize: '14px',
              color: '#f39c12',
              textDecoration: 'none',
              marginRight: '10px',
              transition: 'color 0.3s',
            }}
              onMouseOver={(e) => e.target.style.color = '#d35400'}
              onMouseOut={(e) => e.target.style.color = '#f39c12'}
            >¿Olvidaste tu contraseña?</a>
            <br />
            <a href="#" style={{
              fontSize: '14px',
              color: '#f39c12',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
              onMouseOver={(e) => e.target.style.color = '#d35400'}
              onMouseOut={(e) => e.target.style.color = '#f39c12'}
            >Crear una cuenta</a>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;
  
  