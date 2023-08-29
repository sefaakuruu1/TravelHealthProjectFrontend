import React from 'react'
import './Covid.css'
import { useState } from 'react';
import { useTranslation } from "react-i18next";

const Covid = () => {
  const [covidChecked, setCovidChecked] = useState(false);

const handleCovidChange = (event) => {
  setCovidChecked(event.target.checked);
};
const {t}=useTranslation();
return (
  <div className='covidWrapper'>
  <div className='boxModul'>
    <div className='covidTitle'>
      <input type="checkbox" checked autoComplete='off' />
       <div className='covidTitle'>Covid-19 </div>
       </div>
    <p className='explanation'>{t('madde1')}</p>
    <h3>{t('madde2')} </h3>
      <ul>
      <li>{t('madde3')}</li>
      <li>{t('madde4')}</li>
      <li>{t('madde5')}</li>
      <li>{t('madde6')}</li>
      <li>{t('madde7')}</li>
      <li>{t('madde8')}</li>
      <li>{t('madde9')}</li>
      <li>{t('madde10')}</li>

      </ul>
   
  
  </div>
  </div>
)
}

export default Covid;