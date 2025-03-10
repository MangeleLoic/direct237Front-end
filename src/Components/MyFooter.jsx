import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function MyFooter() {
  return (
    <footer id='footer' className="bg-success text-white py-4">
      <Container>
        <Row >
          <Col className="text-center">
            <p>© 2025 Direct 237 - Tous droits réservés</p>
          </Col>
        </Row>
        <Row >
          <Col md={6} className="text-center">
            <h6>Nos Contacts:</h6>
            <div className="phone-numbers">
                <Row >
                    <Col md={6} className="text-center">
                    <p>
                <i className="fas fa-phone"></i> <a href="tel:+39 3206266137" className="text-light">+39 3206266137</a>
              </p>
              <p>
                <i className="fas fa-phone"></i> <a href="tel:+39 3515811144" className="text-light">+39 3515811144</a>
              </p>
                    </Col>

                    <Col md={6} className="text-center">
                    <p>
                <i className="fas fa-phone"></i> <a href="tel:+237 683096205" className="text-light">+237 683096205 (Douala)</a>
              </p>
              <p>
                <i className="fas fa-phone"></i> <a href="tel:+237 654809116" className="text-light">+237 654809116 (Yaoundé)</a>
              </p>
                    </Col>
                </Row>
              
              
            </div>
          </Col>

          <Col md={6} className="text-center">
            <h6>Réseaux sociaux:</h6>
            <div className="social-links">

            <Row >
            <Col md={6} className="text-center">
            <p>
                <i className="fab fa-facebook-f"></i> <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-light">Facebook</a>
              </p>
              <p>
                <i className="fab fa-whatsapp"></i> <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="text-light">WhatsApp</a>
              </p>
                    </Col>

                    <Col md={6} className="text-center">
                    <p>
                <i className="fab fa-telegram-plane"></i> <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer" className="text-light">Telegram</a>
              </p>
              <p>
                <i className="fas fa-envelope"></i> <a href="mailto:info@direct237.com" className="text-light">Email</a>
              </p>
                    </Col>
                </Row>
              
             
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default MyFooter;
