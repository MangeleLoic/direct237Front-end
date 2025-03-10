import React, { useState } from "react";
import { Container } from "react-bootstrap";
import AjouterVoyage from "./AddViaggio";
import AjouterReservation from "./AddPrenotazione";
import ListeVoyages from "./ListaViaggi";
import ListeReservations from "./ListaPrenotazioni";


function Admin() {
  const [voyages, setVoyages] = useState([]);
  const [reservations, setReservations] = useState([]);

  const ajouterVoyage = (nouveauVoyage) => {
    setVoyages([...voyages, { id: (voyages.length + 1).toString(), ...nouveauVoyage }]);
  };

  const ajouterReservation = (nouvelleReservation) => {
    setReservations([...reservations, { id: (reservations.length + 1).toString(), ...nouvelleReservation }]);
  };

  return (
    <Container className="mt-4">
      <h2 className="mt-5 p-3 text-center">Panneau d'administration</h2>
      <AjouterVoyage onAdd={ajouterVoyage} />
      <ListeVoyages voyages={voyages} />
      <AjouterReservation voyages={voyages} onAdd={ajouterReservation} />
      <ListeReservations reservations={reservations} voyages={voyages} />
    </Container>
  );
}

export default Admin;
