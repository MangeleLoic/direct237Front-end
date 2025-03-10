import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

function AjouterReservation({ voyages, onAdd }) {
  const [destinataire, setDestinataire] = useState("");
  const [poids, setPoids] = useState("");
  const [contenu, setContenu] = useState("");
  const [voyageId, setVoyageId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nouvelleReservation = {
      destinataire,
      poids,
      contenu,
      voyageId,
    };
    onAdd(nouvelleReservation);
    setDestinataire("");
    setPoids("");
    setContenu("");
    setVoyageId("");
  };

  return (
    <Container className="mt-4">
      <h3>Ajouter une Réservation</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Destinataire</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom du Client"
            value={destinataire}
            onChange={(e) => setDestinataire(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Poids (kg)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Poids du colis"
            value={poids}
            onChange={(e) => setPoids(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contenu</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description du contenu"
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Voyage</Form.Label>
          <Form.Select
            value={voyageId}
            onChange={(e) => setVoyageId(e.target.value)}
            required
          >
            <option value="">Sélectionner un voyage</option>
            {voyages.map((voyage) => (
              <option key={voyage.id} value={voyage.id}>
                {voyage.depart} → {voyage.destination} ({voyage.date})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Ajouter Réservation
        </Button>
      </Form>
    </Container>
  );
}

export default AjouterReservation;
