import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import countriesData from "./Country.json";
import { useTranslation } from "react-i18next";

function PageOne() {
  const history = useHistory();
  const{t,i18n}=useTranslation();
  // day 8-13
  
 /* const date = new Date(); // Burada uygun tarih değerini elde edin
const formattedDate = date.toISOString().split('T')[0]; // "yyyy-MM-dd" formatına dönüştürme
*/
const currentDate=new Date();
const maxDate = currentDate.toISOString().split("T")[0];//maksimum bu tarihi verebilirsin
const [agreement, setAgreement] = useState(false);
const [formData, setFormData] = useState({
  TravelStartDate: '',
  TravelEndDate: '',
  Country: '',
  TCIdentityNumber: '',
  PhoneNumber: '',
  BirthDate: '',
});

const[errorTc,setErrorTc]=useState('');
const[errorPhone,setErrorPhone]=useState('');
const[errorBirthDate,setErrorBirthDate]=useState('');
const[errorTravelEndDate,setErrorTravelEndDate]=useState('');


const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
  if(name==="TCIdentityNumber" && value.length !== 11){
    setErrorTc("T.C Kimlik no en az 11 karakter içermelidir")
  }
  else{
    setErrorTc('');
  }
  if(name==="PhoneNumber" && value.length !== 10){
    setErrorPhone("Telefon numarası en az 10 karakter olmalıdır")
  }
  else{
    setErrorPhone("");
  }
  if(name==="TavelStartDate" && "TravelEndDate"){
  const startDate= new Date(formData.TravelStartDate);
  const endDate= new Date(formData.TravelEndDate);
    
    if(endDate<startDate){
      setErrorTravelEndDate('Bitiş tarihi başlangıç tarihinden önce olamaz.');
    }
    else{
      setErrorTravelEndDate('');
    }
  }
  if(name==="Birth Date"){
    const today=new Date();
    const birthDate=new Date(value);
    today.setHours(0,0,0,0);

    if(birthDate>=today){
      setErrorBirthDate('Lütfen doğru bir doğum tarihi giriniz.');
    }
    else{
      setErrorBirthDate('');
    }
  }
};

const handleAgreementChange = (event) => {
  setAgreement(event.target.checked);
};

const handleTeklifAlClick = async () => {
  if (!formData.TravelStartDate ||
    !formData.TravelEndDate ||
    !formData.Country ||
    !formData.TCIdentityNumber ||
    !formData.PhoneNumber ||
    !formData.BirthDate ||
    !agreement) {
    alert(t('alertBosBirakma'));
    return;
  }
  else{
    history.push('/PageTwo')
    }

  try {
    const response = await fetch('http://localhost:58768/travelform/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
// burada apiye yolluyoz
    if (response.ok) {
      //alert('Form submitted successfully');
      setFormData({
        TravelStartDate: '',
        TravelEndDate: '',
        Country: '',
        TCIdentityNumber: '',
        PhoneNumber: '',
        BirthDate: '',
      });
      setAgreement(false);
      history.push('/sms-dogrulama');
    } else {
      alert('Form submission failed');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred. Please try again later.');
  }
  };

  return (
    <div className="bg-red6 h-screen flex flex-col justify-center items-center">
      <div className="bg-white2 p-8 rounded-lg">
      <div className="bg-white align-middle justify-center gap-5">
          <button className= "text-red6 font-sans rounded-lg  m-3 ml-0 " onClick={() => i18n.changeLanguage('tr')}>{t("turkce")}</button>
          <button className="p-3 text-red6 font-sans rounded-lg  m-3" onClick={() => i18n.changeLanguage('en')}>{t("ingilizce")}</button>
        </div>
        <div className="text-red7 text-3xl font-sans font-bold mb-4">
        {t('seyahatSaglikSigortasi')}
        </div>
        <div className="flex justify-between">
          <div className="mr-4">
            <label
              className="block text-black text-sm font-bold mb-2 font-sans"
              htmlFor="TravelStartDate"
            >
              {t('seyahatBaslangicTarihi')}
            </label>
            <input
              min={new Date().toISOString().split('T')[0]}
              type="date"
              id="TravelStartDate"
              name="TravelStartDate"
              value={formData.TravelStartDate}
              onChange={handleInputChange}
              className="block w-60 px-4 py-2 bg-white border border-gray-300 focus:outline-none focus:border-blue-300 rounded"
            />
          </div>
          <div>
            <label
              className="block text-black text-sm font-bold mb-2 font-sans"
              htmlFor="TravelEndDate"
            >
              {t('seyahatBitisTarihi')}
            </label>
            <input
              min={formData.TravelStartDate}
              type="date"
              id="TravelEndDate"
              name="TravelEndDate"
              value={formData.TravelEndDate}
              onChange={handleInputChange}
              className="block w-60 px-4 py-2 bg-white border border-gray-300 focus:outline-none focus:border-blue-300 rounded"
            />
            {errorTravelEndDate && <p className='errorState'>{errorTravelEndDate}</p>}
          </div>
        </div>
        <div className="flex justify-between pt-8">
          <div className="mr-4">
            <label className="block text-black text-sm font-bold mb-2 font-sans">
            {t('ulke')}
            </label>
            <select
  id="countries"
  name="Country"
  value={formData.Country}
  onChange={handleInputChange}
  className="block w-60 px-4 py-2 bg-white border border-gray-300 focus:outline-none focus:border-blue-300 rounded"
>
  <option value="">Select a country</option>
  {countriesData.map((Country) => (
    <option key={Country.code} value={Country.name}>
      {Country.name}
    </option>
  ))}
</select>
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2 font-sans">
            {t('tcKimlikNumarası')}
            </label>
            <div className="wrapperInput flex justify-center">
              <input
                className="block w-60 px-4 py-2 bg-white border border-gray-300 focus:outline-none focus:border-blue-300 rounded"
                type="tel"
                name="TCIdentityNumber"
                value={formData.TCIdentityNumber}
                onChange={handleInputChange}
                maxLength={11}
                autoComplete="off"
                placeholder="T.C Kimlik No"
              />
            </div>
            {errorTc && <p className="text-red font-bold" style={{fontSize:'11px'}}>{errorTc}</p>}
          </div>
        </div>
        <div className="flex justify-between pt-8">
          <div className="mr-4">
            <label className="block text-black text-sm font-bold mb-2 font-sans">
            {t('cepTelefonu')}
            </label>
            <div className="wrapperInput flex justify-center">
              <input
                className="block w-60 px-4 py-2 bg-white border border-gray-300 focus:outline-none focus:border-blue-300 rounded"
                type="tel"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleInputChange}
                maxLength={10}
                autoComplete="off"
                placeholder="(5xxxxxxxxx)"
              />
            </div>
            {errorPhone && <p className="text-red font-bold " style={{fontSize:'11px'}}>{errorPhone}</p>}
          </div>
          <div>
            <label
              className="block text-black text-sm font-bold mb-2 font-sans"
              htmlFor="BirthDate"
            >
              {t('dogumTarihi')}
            </label>
            <input
              type="date"
              id="BirthDate"
              name="BirthDate"
              value={formData.BirthDate}
              onChange={handleInputChange}
              className="block w-60 px-4 py-2 bg-white border border-gray-300 focus:outline-none focus:border-blue-300 rounded"
            />
            {errorBirthDate && <p className="errorState text-sm">{errorBirthDate}</p>}
          </div>
        </div>

        <div className=" pt-8 flex justify-between items-center">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 mr-2"
            checked={agreement}
            onChange={handleAgreementChange}
          />
          <div className="text-[16px] font-sans text-red7">
            Kişisel Verilerin Korunması Hakkında
            <br />
            Aydınlatma Metni{" "}
            <span className="text-black text-[16px] font-sans">ve</span>{" "}
            Kullanıcı
            <br />
            Sözleşmesini, Seyahat Sağlık Vize
            <br />
            Sigortasına ait Bilgilendirme Formunu
            <br />
            <span className="text-black text-[16px] font-sans">
              okudum, kabul ediyorum
              <br />
              Kişisel verilerimin işlenmesini kabul <br />
              ediyorum.
              <br />
            </span>
            Kampanyalar{" "}
            <span className="text-black text-[16px] font-sans"> ve</span>{" "}
            hizmetler{" "}
            <span className="text-black text-[16px] font-sans"> hakkında</span>
            <br />
            <span className="text-black text-[16px] font-sans">
              bilgi almak istiyorum.
            </span>{" "}
            İzinleri düzenle
          </div>
          <div>
            <button
              className="bg-red7 text-white2 text-[16px] font-sans font-bold w-[150px] h-[70px] rounded-md"
              onClick={handleTeklifAlClick}
            >
              Teklif Al
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageOne;