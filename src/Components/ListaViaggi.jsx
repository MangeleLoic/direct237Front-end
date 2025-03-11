import React from "react";
import { Table, Container } from "react-bootstrap";

function ListeVoyages({ voyages }) {
  return (
    <Container className="mt-4">
      <h3>Liste des Voyages</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Kilos Disponibles</th>
            <th>Kilos Réservés</th>
          </tr>
        </thead>
        <tbody>
          {voyages.length > 0 ? (
            voyages.map((voyage) => (
              <tr key={voyage.id}>
                <td>{voyage.date_voyage}</td>
                <td>{voyage.kilosDisponibles}</td>
                <td>{voyage.kilosReservees}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                Aucun voyage disponible
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListeVoyages;
