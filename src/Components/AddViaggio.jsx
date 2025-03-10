import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

function AjouterVoyage({ onAdd }) {
  const [date, setDate] = useState("");
  const [depart, setDepart] = useState("");
  const [destination, setDestination] = useState("");
  const [poidsMax, setPoidsMax] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nouveauVoyage = {
      date,
      depart,
      destination,
      poidsMax,
    };
    onAdd(nouveauVoyage);
    setDate("");
    setDepart("");
    setDestination("");
    setPoidsMax("");
  };

  return (
    <Container className="mt-4">
      <h3>Ajouter un Voyage</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 container-form ">
          <Form.Label>Départ</Form.Label>
          <Form.Control
            type="text"
            placeholder="Lieu de départ"
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Destination</Form.Label>
          <Form.Control
            type="text"
            placeholder="Lieu de destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Poids Maximum (kg)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Poids maximum pour ce voyage"
            value={poidsMax}
            onChange={(e) => setPoidsMax(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Ajouter Voyage
        </Button>
      </Form>
    </Container>
  );
}

export default AjouterVoyage;
