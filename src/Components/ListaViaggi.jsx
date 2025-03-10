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
            <th>Départ</th>
            <th>Destination</th>
            <th>Poids Max (kg)</th>
          </tr>
        </thead>
        <tbody>
          {voyages.length > 0 ? (
            voyages.map((voyage) => (
              <tr key={voyage.id}>
                <td>{voyage.date}</td>
                <td>{voyage.depart}</td>
                <td>{voyage.destination}</td>
                <td>{voyage.poidsMax}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
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
