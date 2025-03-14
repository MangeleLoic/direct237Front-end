import { useState, useEffect } from 'react';

export function useReservationForm(voyages, onAdd, fetchVoyages = () => {}) {
  const [formState, setFormState] = useState({
    nomClient: "",
    telephoneClient: "",
    poids: "",
    ville: "",
    contenu: "",
    voyageId: "",
    trackingNumber: ""
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormState(prevState => ({
      ...prevState,
      trackingNumber: generateTrackingNumber()
    }));
  }, []);

  const generateTrackingNumber = () => {
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `D237-${random}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  const regenerateTrackingNumber = () => {
    setFormState(prevState => ({
      ...prevState,
      trackingNumber: generateTrackingNumber()
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formState.nomClient.trim()) {
      newErrors.nomClient = "Le nom du client est requis";
    }
    
    if (!formState.telephoneClient.trim()) {
      newErrors.telephoneClient = "Le numéro de téléphone est requis";
    } else if (!/^[+]?[\d\s-]{8,15}$/.test(formState.telephoneClient)) {
      newErrors.telephoneClient = "Format de téléphone invalide";
    }
    
    if (!formState.ville.trim()) {
      newErrors.ville = "La ville est requise";
    }
    
    if (!formState.poids) {
      newErrors.poids = "Le poids est requis";
    } else {
      if (Array.isArray(voyages)) {
        const selectedVoyage = voyages.find(v => v.id === parseInt(formState.voyageId));
        if (selectedVoyage && parseFloat(formState.poids) > selectedVoyage.kilos_disponibles) {
          newErrors.poids = `Le poids dépasse les ${selectedVoyage.kilos_disponibles}kg disponibles pour ce voyage`;
          newErrors.general = `Attention: Le poids de la réservation (${formState.poids}kg) dépasse la capacité disponible du voyage (${selectedVoyage.kilos_disponibles}kg)`;
        }
      }
    }
    
    if (!formState.contenu.trim()) {
      newErrors.contenu = "Le contenu est requis";
    }
    
    if (!formState.trackingNumber.trim()) {
      newErrors.trackingNumber = "Le numéro de suivi est requis";
    }
    
    if (!formState.voyageId) {
      newErrors.voyageId = "Veuillez sélectionner un voyage";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const token = localStorage.getItem("token");
    const nouvelleReservation = {
      nomClient: formState.nomClient,
      telephoneClient: formState.telephoneClient,
      poids: parseFloat(formState.poids),
      ville: formState.ville,
      contenu: formState.contenu,
      trackingNumber: formState.trackingNumber,
      voyageId: parseInt(formState.voyageId)
    };
  
    try {
      const response = await fetch("http://localhost:3001/reservations", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nouvelleReservation),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de l'ajout de la réservation !");
      }
  
      const data = await response.json();
      onAdd(data);
      
      if (typeof fetchVoyages === 'function') {
        fetchVoyages();
      }
      
      resetForm();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la réservation:", error);
      setErrors({ ...errors, general: `Erreur: ${error.message}` });
    }
  };
  
  const resetForm = () => {
    setFormState({
      nomClient: "",
      telephoneClient: "",
      poids: "",
      ville: "",
      contenu: "",
      voyageId: "",
      trackingNumber: generateTrackingNumber()
    });
    setErrors({});
  };

 
const setFormValue = (field, value) => {
  setFormState(prevState => ({
    ...prevState,
    [field]: value
  }));
};


return {
  formState,
  errors,
  handleChange,
  handleSubmit,
  regenerateTrackingNumber,
  setFormValue 
};
}