import React, { useState } from "react";
import { Table, Container, Form } from "react-bootstrap";

function ListeReservations({ reservations, voyages }) {
  const [filtresVoyage, setFiltresVoyage] = useState("");
  const [filtresDestinataire, setFiltresDestinataire] = useState("");

  const reservationsFiltrees = reservations.filter((reservation) => {
    return (
      (filtresVoyage === "" || reservation.voyageId === filtresVoyage) &&
      (filtresDestinataire === "" || reservation.destinataire.toLowerCase().includes(filtresDestinataire.toLowerCase()))
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
                {voyage.depart} → {voyage.destination} ({voyage.date})
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
            <th>Poids (kg)</th>
            <th>Contenu</th>
            <th>Voyage</th>
          </tr>
        </thead>
        <tbody>
          {reservationsFiltrees.length > 0 ? (
            reservationsFiltrees.map((reservation) => {
              const voyage = voyages.find((v) => v.id === reservation.voyageId);
              return (
                <tr key={reservation.id}>
                  <td>{reservation.destinataire}</td>
                  <td>{reservation.poids}</td>
                  <td>{reservation.contenu}</td>
                  <td>{voyage ? `${voyage.depart} → ${voyage.destination} (${voyage.date})` : "N/D"}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Aucune réservation disponible
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListeReservations;
