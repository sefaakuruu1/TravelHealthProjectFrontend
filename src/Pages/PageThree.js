import React from "react";
import "./PageThree.css";
import Covid from './Covid'
import BasketContainer from "./BasketContainer";
import countriesData from './Country.json';
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { useHistory } from 'react-router-dom';

const PageThree = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [latestEntry, setLatestEntry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [travelPrice, setTravelPrice] = useState(0);
  const [totalDay, setTotalDay] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => { 
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleDogrulaClick = () => {
      history.push('/fiyat');
    }

  useEffect(() => {
    const apiUrl = 'http://localhost:58768/travelform/getlatestentry/1';

    axios.get(apiUrl)
      .then(response => {
        setTravelPrice(response.data.price);
        setLatestEntry(response.data);
        const startDate = new Date(response.data.travelStartDate);
        const endDate = new Date(response.data.travelEndDate);
        const timeDiff = endDate - startDate;
        const calculateDay = timeDiff / (1000 * 60 * 60 * 24);
        setTotalDay(calculateDay);
        setSelectedCountry(response.data.country);
        console.log(response.data.price);
        console.log(latestEntry);
        console.log(selectedCountry);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 
 
  return (
    <div>
      <div className="navbar">
        <div className="row1 ">
          <a href="https://www.generali.com.tr/?_gl=1*1m891tg*_gcl_au*MTEwMTkzNDYzMC4xNjkwODkyMjA3">
            <img
              src="https://teklif.generali.com.tr/Main/TravelHealth/Content/V2/images/logo_hor_r.png?pcid=62a90d9b-cd0c-4907-9d0e-5122e30ae960"
              alt=""
            />
          </a>
        </div>
      </div>

      <div className="row hp-slides">
        <div className="hp-slide-casco-slide">
          <div className="headerContainer">
            <h1 className="h1">{t('fiyatHazir')}</h1>
            <span className="policeText">{t('hemenPolice')}</span>
          </div>
        </div>
      </div>
      <article className="secondContainer">
        <div className="wrapperBottom">
          <div className="secondContainerFirstDiv">
            <h3 className="textThird">{t('seyahatSaglikSigortasi')}</h3>
            <div className="selectDiv">
              <div className="iconDiv">
                <div className="modulDetails">
                  <img
                    className="icon"
                    src="https://teklif.generali.com.tr/Main/TravelHealth/Content/V2/images/i_travel_g.png?pcid=9dd04613-2b0f-4263-be3a-13e898beccbc"
                    width={38}
                    alt=""
                  />
                  <h2 className="visaText">{t('seyahatGuven')}</h2>
                  <span>{t('detaylar')}</span>
                </div>
                <div className="ayrac"></div>
                <div className="selectPackageButton">
                  <button className="selectButton">
                    <div className="isSelectAndTick">
                      <div className="isSelected">{t('seciliPaket')}</div>
                      <img
                        src="https://teklif.generali.com.tr/Main/TravelHealth/Content/V2/images/i_p_checked.png?pcid=9dd04613-2b0f-4263-be3a-13e898beccbc"
                        alt=""
                      />
                    </div>
                    <div className="price">
                      <span className="priceInt">{(travelPrice * totalDay)}</span>
                      <span className="priceString">TL</span>
                    </div>
                  </button>
                </div>
              </div>
              <div className="selectCountryDiv">
                <select className="countrySelect" defaultValue={selectedCountry}>
                  {countriesData.map((country) => (
                    <option
                      key={country.code}
                      value={country.name}
                      selected={selectedCountry === country.name}
                    >
                      {country.name}
                    </option>
                  ))}
                </select>
              </div> 
            </div>
            <Covid/>
            <BasketContainer price ={travelPrice} totalDay = {totalDay}  openModal={openModal}/>
          </div>
        </div>
      </article>
    
    </div>
  );
};

export default PageThree;
