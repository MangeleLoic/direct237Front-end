import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import AjouterVoyage from "./AddViaggio";
import AjouterReservation from "./AddPrenotazione";
import ListeVoyages from "./ListaViaggi";
import ListeReservations from "./ListaPrenotazioni";
import "./Admin.css";

function Admin() {
  const [voyages, setVoyages] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchVoyages = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:3001/voyages", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Échec de la récupération des voyages !");
        }

        const data = await response.json();
        setVoyages(data.content); 
      } catch (error) {
        console.error("Erreur:", error.message);
      }
    };

    fetchVoyages();
  }, []);

  const ajouterVoyage = (nouveauVoyage) => {
    setVoyages([...voyages, { id: (voyages.length + 1).toString(), ...nouveauVoyage }]);
  };

  return (
    <Container className="admin-container mt-4">
      <h2 className="mt-5 p-3 text-center">Panneau d'administration</h2>
      <AjouterVoyage onAdd={ajouterVoyage} />
      <ListeVoyages voyages={voyages} />
      <AjouterReservation voyages={voyages} />
      <ListeReservations reservations={reservations} voyages={voyages} />
    </Container>
  );
}

export default Admin;
