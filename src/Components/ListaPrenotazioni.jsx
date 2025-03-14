import React, { useState } from "react";
import { Table, Container, Form } from "react-bootstrap";

function ListeReservations({ reservations, voyages }) {
  const [filtresVoyage, setFiltresVoyage] = useState("");
  const [filtresDestinataire, setFiltresDestinataire] = useState("");
  
  
  const reservationsFiltrees = reservations.filter((reservation) => {
    return (
      (filtresVoyage === "" || 
       (reservation.voyage && reservation.voyage.id.toString() === filtresVoyage)) &&
      (filtresDestinataire === "" || 
       (reservation.nomClient && reservation.nomClient.toLowerCase().includes(filtresDestinataire.toLowerCase())) ||
       (reservation.client && reservation.client.nom && 
        reservation.client.nom.toLowerCase().includes(filtresDestinataire.toLowerCase())))
    );
  });
  
  return (
    <Container className="mt-4">
      <h3>Liste des Réservations</h3>
      <Form className="mb-3">
        <Form.Group className="mb-2">
          <Form.Label>Filtrer par Voyage</Form.Label>
          <Form.Select value={filtresVoyage} onChange={(e) => setFiltresVoyage(e.target.value)}>
            <option value="">Tous les voyages</option>
            {voyages.map((voyage) => (
              <option key={voyage.id} value={voyage.id}>
                {voyage.depart} → {voyage.destination} ({voyage.date_voyage})
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        
        <Form.Group>
          <Form.Label>Filtrer par Destinataire</Form.Label>
          <Form.Control
            type="text"
            placeholder="Chercher par destinataire"
            value={filtresDestinataire}
            onChange={(e) => setFiltresDestinataire(e.target.value)}
          />
        </Form.Group>
      </Form>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Destinataire</th>
            <th>Téléphone</th>
            <th>Ville</th>
            <th>Poids (kg)</th>
            <th>Contenu</th>
            <th>N° de Suivi</th>
            <th>Voyage</th>
          </tr>
        </thead>
        <tbody>
          {reservationsFiltrees.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.nomClient || (reservation.client && reservation.client.nom) || "N/D"}</td>
              <td>{reservation.telephoneClient || (reservation.client && reservation.client.telephone) || "N/D"}</td>
              <td>{reservation.ville}</td>
              <td>{reservation.poids}</td>
              <td>{reservation.contenu}</td>
              <td>{reservation.trackingNumber}</td>
              <td>
                {reservation.voyage ?
                  `(${reservation.voyage.date_voyage || ""})` :
                  "N/D"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListeReservations;