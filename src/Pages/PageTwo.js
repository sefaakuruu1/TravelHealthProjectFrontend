import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from "react-i18next";


function PageTwo() {
  const[verificationCode,setVerificationCode]=useState('');
  const history = useHistory();
  const {t}=useTranslation();

  const handleDoğrulaClick = () => {
    if(verificationCode ==='123456'){
      history.push('/teklif');
    }
   else{
    alert(t('yanlisKod'));
    setVerificationCode('');
   }
  };
    return (
    <div className='h-[930px] left-0'>
  
      <div className='row1 flex justify-center py-[20px]'>
        <a href='https://www.generali.com.tr/?_gl=1*1m891tg*_gcl_au*MTEwMTkzNDYzMC4xNjkwODkyMjA3'>
          <img src='https://teklif.generali.com.tr/Main/TravelHealth/Content/V2/images/logo_hor_r.png?pcid=62a90d9b-cd0c-4907-9d0e-5122e30ae960'>
          </img>
        </a>
      </div>
  
      <div className='row2 py-[15px] font-sans flex justify-center font-bold text-22.8 text-red'>  {t('smsDogrulama')}
      </div>
  
      <div className='wrapperInput mx-[10px] flex justify-center'>
        <input className='py-[10px] font-sans flex justify-center border-b-[1px] text-center text-[30px] outline-none' type='tel' datatype='text' maxLength={6} autoComplete='off'
         placeholder={t('dogrulamaKodu')}
         value={verificationCode}
         onChange={(e)=>setVerificationCode(e.target.value)}
         >
        </input>
        </div>
        
        <div className='flex justify-center font-sans text-[12px]' type='tel'>{t('uyariMesaj')}</div>  
      <div className='flex justify-center py-[15px]'>
      <button className='w-60 h-12 rounded-full bg-red2 text-lg text-white' onClick={handleDoğrulaClick}>{t('dogrula')}</button>
      </div>
      
    
    </div>
    );
   }
   export default PageTwo;