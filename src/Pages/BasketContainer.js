import React from "react";
import "./BasketContainer.css";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BasketContainer = ({ price, totalDay, openModal }) => {
  const { t } = useTranslation();
  const history=useHistory();
  const exchangeRate = 27.50;
  const handleDogrulaClick = () => {
    history.push('/fiyat');
  }


  return (
    <div className="wrapperBasket">
      <div className="wrapperCircle">
        <div className="basketCircle">
          <div className="priceDiv">
            <div className="priceTl">{(price * totalDay).toFixed(2)} TL</div>
          </div>
          <h4 className="priceEuro">
            {((price * totalDay) / exchangeRate).toFixed(2)}€
          </h4>
        </div>
      </div>

      <div className="iconAndTitleBasket">
        <img
          className="flightImg"
          src="https://teklif.generali.com.tr/Main/TravelHealth/Content/V2/images/i_travel_g.png?pcid=096d8ae8-cf94-4738-b26e-1e7cc47d4109"
          alt=""
        />
        <p className="basketText">{t('seyahatGuven')}</p>
      </div>

      <button className="continueButtonBasket" onClick={handleDogrulaClick}>
        <span className="continue">{t('devamEt')}</span>
      </button>
    </div>
  );
};

export default BasketContainer;