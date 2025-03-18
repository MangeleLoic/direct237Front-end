import React from 'react';
import './Home.css';
import InsideHome from './InsideHome';
import WeatherBox from './Meteo';

function Home() {
  return (
    <div className="container-fluid">
      <div className="marquee-container">
        <h1 className="marquee-text">
          Bienvenue sur Direct 237 ! Notre plateforme d'expédition de colis. Découvrez-en plus maintenant !
        </h1>
      </div>

      <div className='bg-warning text-center mt-4'>
        <h2>!!!!!!!!!WORK IN PROGRESS!!!!!!!!!!</h2>
      </div>
      <div className="container mt-4">
        <div className="row">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="col-md-3 col-sm-6 mb-4">
              <div className="inside-home-box p-3">
                {index === 4 ? (
                  <WeatherBox city="Douala" lat="4.05" lon="9.70" />
                ) : index === 7 ? (
                  <WeatherBox city="Yaoundé" lat="3.86" lon="11.52" />
                ) : (
                  <InsideHome />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

