import React, { useState } from "react";
import InsideHome from "./InsideHome";
import emailjs from "@emailjs/browser";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = "service_4fad15b"; 
    const templateID = "template_6nkmr7p"; 
    const userID = "TBKs16WIicYzYfRpP"; 

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    }; 

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log("Email inviata con successo!", response.status, response.text);
        alert("Message envoyé avec succès !");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Errore nell'invio dell'email:", error);
        alert("Échec de l'envoi du message.");
      });
  };

  return (
    
    <div className="container contact-container mt-5 pt-4">
       <div className='bg-warning text-center mt-3 pt-2'>
        <h2>!!!!!!!!!WORK IN PROGRESS!!!!!!!!!!</h2>
      </div>
      <h2 className="text-center">Notre histoire</h2>
      <div className="row">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="col-md-3 col-sm-6 mb-4">
            <div className="inside-home-box p-3">
              <InsideHome />
            </div>
          </div>
        ))}
      </div>

      
      <div className="contact-form mt-5">
        <h3 className="text-center">Contactez-nous</h3>
        <form onSubmit={handleSubmit} className="p-3">
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
