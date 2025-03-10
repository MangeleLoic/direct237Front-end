import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

function MyFooter() {
  return (
    <footer className="bg-success text-white py-4">
      <Container>
        <Row>
          <Col className="text-center">
            <p>© 2025 Direct237 - Tutti i diritti riservati</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <h6>Nos Contacts:</h6>
            <div className="social-links">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="me-3">
                <i className="fab fa-whatsapp"></i> WhatsApp
              </a>
              <a href="tel:+39 3206266137" className="me-3">
                <i className="fas fa-phone"></i>+39 3206266137
              </a>
              <a href="tel:+39 3515811144" className="me-3">
                <i className="fas fa-phone"></i>+39 3515811144
              </a>
              <a href="tel:+237 683096205" className="me-3">
                <i className="fas fa-phone"></i> +237 683096205 (Douala)
              </a>
              <a href="tel:+237 654809116" className="me-3">
                <i className="fas fa-phone"></i>+237 654809116(Yaoundé)
              </a>
              <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer" className="me-3">
                <i className="fab fa-telegram-plane"></i> Telegram
              </a>
              <a href="mailto:info@direct237.com" className="me-3">
                <i className="fas fa-envelope"></i> Email
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default MyFooter;
