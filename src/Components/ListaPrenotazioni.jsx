import React, { useState } from "react";
import { Table, Container, Form, Button, Pagination } from "react-bootstrap";
import { FaSync } from 'react-icons/fa';

function ListeReservations({ reservations, voyages, onRefresh }) {
  const [filtresVoyage, setFiltresVoyage] = useState("");
  const [filtresDestinataire, setFiltresDestinataire] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
  
  const totalPages = Math.ceil(reservationsFiltrees.length / itemsPerPage);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reservationsFiltrees.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item 
        key={number} 
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  
  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Liste des Réservations</h3>
        <Button 
          variant="outline-primary" 
          onClick={onRefresh}
          className="d-flex align-items-center"
        >
          <FaSync className="me-2" /> Actualiser
        </Button>
      </div>
      
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
          {currentItems.length > 0 ? (
            currentItems.map((reservation) => (
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
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">Aucune réservation trouvée</td>
            </tr>
          )}
        </tbody>
      </Table>
      
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {totalPages <= 7 ? (
              paginationItems
            ) : (
              <>
                {currentPage > 3 && <Pagination.Ellipsis disabled />}
                {paginationItems.slice(
                  Math.max(0, currentPage - 3), 
                  Math.min(totalPages, currentPage + 2)
                )}
                {currentPage < totalPages - 2 && <Pagination.Ellipsis disabled />}
              </>
            )}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </div>
      )}
      
      <div className="text-center mt-2">
        {reservationsFiltrees.length > 0 ? (
          <small className="text-muted">
            Affichage {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, reservationsFiltrees.length)} sur {reservationsFiltrees.length} réservations
          </small>
        ) : (
          <small className="text-muted">0 réservation</small>
        )}
      </div>
    </Container>
  );
}

export default ListeReservations;
