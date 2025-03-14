
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useReservationForm } from "../hooks/useReservationForm";
import { useState } from "react";

function AjouterReservation({ voyages, clients, onAdd, fetchVoyages }) {
  const [useExistingClient, setUseExistingClient] = useState(true);
  const [selectedClientId, setSelectedClientId] = useState("");
  
  const {
    formState,
    errors,
    handleChange,
    handleSubmit,
    regenerateTrackingNumber,
    setFormValue,
  } = useReservationForm(voyages, onAdd, fetchVoyages);

  
  const handleClientTypeChange = (e) => {
    const useExisting = e.target.value === "existing";
    setUseExistingClient(useExisting);
    
    
    setFormValue("nomClient", "");
    setFormValue("telephoneClient", "");
    setSelectedClientId("");
  };

  
  const handleClientSelection = (e) => {
    const clientId = e.target.value;
    setSelectedClientId(clientId);
    
    if (clientId) {
      const selectedClient = clients.find(client => client.id.toString() === clientId);
      if (selectedClient) {
        setFormValue("nomClient", selectedClient.nom || "");
        setFormValue("telephoneClient", selectedClient.telephone || "");
        setFormValue("clientId", selectedClient.id);
      }
    } else {
      
      setFormValue("nomClient", "");
      setFormValue("telephoneClient", "");
      setFormValue("clientId", "");
    }
  };

  return (
    <Container className="mt-4">
      <h3>Ajouter une Réservation</h3>
      
      {errors.general && (
        <Alert variant="danger">{errors.general}</Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        
        <Form.Group className="mb-3">
          <Form.Label>Type de client</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              label="Client existant"
              name="clientType"
              value="existing"
              checked={useExistingClient}
              onChange={handleClientTypeChange}
              id="existing-client"
            />
            <Form.Check
              inline
              type="radio"
              label="Nouveau client"
              name="clientType"
              value="new"
              checked={!useExistingClient}
              onChange={handleClientTypeChange}
              id="new-client"
            />
          </div>
        </Form.Group>

        
        {useExistingClient && (
          <Form.Group className="mb-3">
            <Form.Label>Sélectionner un client</Form.Label>
            <Form.Select
              value={selectedClientId}
              onChange={handleClientSelection}
              isInvalid={useExistingClient && !selectedClientId && !!errors.nomClient}
            >
              <option value="">Choisir un client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.nomClient} - {client.numeroTelephone}
                </option>
              ))}
            </Form.Select>
            {useExistingClient && !selectedClientId && errors.nomClient && (
              <Form.Control.Feedback type="invalid">
                Veuillez sélectionner un client
              </Form.Control.Feedback>
            )}
          </Form.Group>
        )}

        
        <Form.Group className="mb-3">
          <Form.Label>Nom du Client</Form.Label>
          <Form.Control
            type="text"
            name="nomClient"
            value={formState.nomClient}
            onChange={handleChange}
            isInvalid={!!errors.nomClient}
            required
            readOnly={useExistingClient}
            disabled={useExistingClient}
          />
          {errors.nomClient && !useExistingClient && (
            <Form.Control.Feedback type="invalid">
              {errors.nomClient}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Téléphone du Client</Form.Label>
          <Form.Control
            type="text"
            name="telephoneClient"
            value={formState.telephoneClient}
            onChange={handleChange}
            isInvalid={!!errors.telephoneClient}
            required
            readOnly={useExistingClient}
            disabled={useExistingClient}
          />
          {errors.telephoneClient && !useExistingClient && (
            <Form.Control.Feedback type="invalid">
              {errors.telephoneClient}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        
        
        <Form.Group className="mb-3">
          <Form.Label>Ville</Form.Label>
          <Form.Control
            type="text"
            name="ville"
            value={formState.ville}
            onChange={handleChange}
            isInvalid={!!errors.ville}
            required
          />
          {errors.ville && (
            <Form.Control.Feedback type="invalid">
              {errors.ville}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Poids (kg)</Form.Label>
          <Form.Control
            type="number"
            name="poids"
            value={formState.poids}
            onChange={handleChange}
            isInvalid={!!errors.poids}
            required
          />
          {errors.poids && (
            <Form.Control.Feedback type="invalid">
              {errors.poids}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contenu</Form.Label>
          <Form.Control
            type="text"
            name="contenu"
            value={formState.contenu}
            onChange={handleChange}
            isInvalid={!!errors.contenu}
            required
          />
          {errors.contenu && (
            <Form.Control.Feedback type="invalid">
              {errors.contenu}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Numéro de Suivi</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              name="trackingNumber"
              value={formState.trackingNumber}
              onChange={handleChange}
              isInvalid={!!errors.trackingNumber}
              required
              className="me-2"
            />
            <Button 
              variant="outline-secondary" 
              onClick={regenerateTrackingNumber}
              title="Générer un nouveau numéro"
            >
              ↻
            </Button>
          </div>
          <Form.Text className="text-muted">
            Un numéro unique pour suivre cette réservation
          </Form.Text>
          {errors.trackingNumber && (
            <Form.Control.Feedback type="invalid">
              {errors.trackingNumber}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Voyage</Form.Label>
          <Form.Select
            name="voyageId"
            value={formState.voyageId}
            onChange={handleChange}
            isInvalid={!!errors.voyageId}
            required
          >
            <option value="">Sélectionner un voyage</option>
            {voyages.map((voyage) => (
              <option key={voyage.id} value={voyage.id}>
                 ({voyage.date_voyage}) - {voyage.kilosDisponibles} kg disponibles
              </option>
            ))}
          </Form.Select>
          {errors.voyageId && (
            <Form.Control.Feedback type="invalid">
              {errors.voyageId}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Ajouter Réservation
        </Button>
      </Form>
    </Container>
  );
}

export default AjouterReservation;