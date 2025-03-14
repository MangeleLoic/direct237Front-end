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
  const [clients, setClients] = useState([]);

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

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem("token");
  
      try {
        const response = await fetch("http://localhost:3001/reservations", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Échec de la récupération des réservations !");
        }
  
        const data = await response.json();
        setReservations(data.content);  
      } catch (error) {
        console.error("Erreur:", error.message);
      }
    };
  
    fetchReservations();
  }, []);
  
  
  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem("token");
  
      try {
        const response = await fetch("http://localhost:3001/clients", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Échec de la récupération des clients !");
        }
  
        const data = await response.json();
        setClients(data.content || data);  
      } catch (error) {
        console.error("Erreur:", error.message);
      }
    };
  
    fetchClients();
  }, []);

  const ajouterVoyage = (nouveauVoyage) => {
    setVoyages([...voyages, { id: (voyages.length + 1).toString(), ...nouveauVoyage }]);
  };
  
  const ajouterReservation = (nouvelleReservation) => {
    setReservations([...reservations, nouvelleReservation]);
  };

  return (
    <Container className="admin-container mt-4">
      <h2 className="mt-5 p-3 text-center">Panneau d'administration</h2>
      <AjouterVoyage onAdd={ajouterVoyage} />
      <ListeVoyages voyages={voyages} />
      <AjouterReservation 
        voyages={voyages} 
        clients={clients} 
        onAdd={ajouterReservation} 
      />
      <ListeReservations 
        reservations={reservations} 
        voyages={voyages} 
      />
    </Container>
  );
}

export default Admin;