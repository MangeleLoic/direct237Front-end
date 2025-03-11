import { Button, Container, Card, Form } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const userData = { email, password };

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Échec de la connexion ! Vérifiez vos identifiants.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.accessToken);
      onLogin();
      navigate("/Admin");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container py-2">
      <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
        <Card className="p-4 shadow cardSign mb-3 w-75">
          <Card.Title className="mb-4 fs-2">Se connecter</Card.Title>
          
          {error && <p className="error text-danger text-center">{error}</p>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Entrez votre email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Entrez votre mot de passe"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                className="btn-lg w-100 rounded-pill"
              >
                Se connecter
              </Button>
            </div>
          </Form>

          <div className="text-center mt-3">
            <Button
              variant="light"
              className="btn-lg w-100 rounded-pill border-3 border bg-white"
              onClick={() => alert("Authentification via Google non encore implémentée !")}
            >
              <img
                className="me-2 mb-1"
                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                width={25}
                alt="google-logo"
              />
              Continuer avec Google
            </Button>
          </div>

          <p className="mt-3 text-center">
            Vous n'avez pas de compte ?{" "}
            <Link to="/register" className="text-primary hover-underline">
              Inscrivez-vous maintenant
            </Link>
          </p>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
