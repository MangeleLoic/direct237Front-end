import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

function AjouterVoyage({ onAdd }) {
  const [date, setDate] = useState("");
  const [kilosDisponibles, setKilosDisponibles] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const nouveauVoyage = {
      date_voyage: date,
      kilosDisponibles: parseFloat(kilosDisponibles),
      kilosReservees: 0, 
    };

    try {
      const response = await fetch("http://localhost:3001/voyages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(nouveauVoyage),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du voyage.");
      }

      const data = await response.json();
      onAdd(data); 
      setDate("");
      setKilosDisponibles("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Ajouter un Voyage</h3>
      {error && <p className="text-danger">{error}</p>}
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

        <Form.Group className="mb-3">
          <Form.Label>Poids Maximum (kg)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Poids maximum pour ce voyage"
            value={kilosDisponibles}
            onChange={(e) => setKilosDisponibles(e.target.value)}
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
