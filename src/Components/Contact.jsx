import React from "react";
import InsideHome from "./InsideHome";
import "./Contact.css"

function Contact() {
    return (
      <div className="container contact-container">
        <h2 className="text-center">Notre histoire</h2>
        <div className="row ">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="col-md-3 col-sm-6 mb-4">
              <div className="inside-home-box p-3">
                <InsideHome />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  

export default Contact;
