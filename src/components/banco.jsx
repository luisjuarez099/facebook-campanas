
import { useEffect, useState } from "react";

const Banco = () =>{
    const [campanas, setCampanas] = useState([]);
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
    }, [])
    return (
        <div>
            <h2>Banco</h2>
        </div>
    )
}

export default Banco;