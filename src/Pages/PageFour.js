import React, { useEffect, useState } from "react";
import "./PageThree.css";
import "./PageFour.css";
import axios from "axios";
import { useTranslation } from "react-i18next"; 

function PageFour() {
  const [travelPrice, setTravelPrice] = useState(0);
  const [latestEntry, setLatestEntry] = useState("");
  const [totalDay, setTotalDay] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [travelEndDate, setTravelEndDate] = useState("");
  const [travelStartDate, setTravelStartDate] = useState("");
  const [tcIdentityNumber, setTcIdentityNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const { t } = useTranslation();

  const [formattedCardNumber, setFormattedCardNumber] = useState("");

  function formatCreditCardNumber(cardNumber) {
    cardNumber = cardNumber.replace(/[\s-]/g, "");
    cardNumber = cardNumber.substring(0, 16);
    const formattedNumber = cardNumber.replace(/(.{4})/g, "$1-");
    return formattedNumber.endsWith("-")
      ? formattedNumber.slice(0, -1)
      : formattedNumber;
  }

  function handleCardNumberChange(event) {
    const inputCardNumber = event.target.value;
    const formattedNumber = formatCreditCardNumber(inputCardNumber);
    setFormattedCardNumber(formattedNumber);
  }
  const [formattedExpiryDate, setFormattedExpiryDate] = useState("");

  function formatExpiryDate(inputDate) {
    // "/" işaretlerini temizle
    inputDate = inputDate.replace(/\//g, "");

    if (inputDate.length > 4) {
      inputDate = inputDate.substring(0, 4);
    }

    // "aa/yy" formatını sağla
    if (inputDate.length > 2) {
      inputDate = `${inputDate.slice(0, 2)}/${inputDate.slice(2)}`;
    }

    return inputDate;
  }

  function handleExpiryDateChange(event) {
    const inputExpiryDate = event.target.value;
    const formattedDate = formatExpiryDate(inputExpiryDate);
    setFormattedExpiryDate(formattedDate);
  }


  function handleCVVChange(event) {
    const inputCVV = event.target.value;

    // Maksimum 3 karakter uzunluğunda sınırla
    if (inputCVV.length <= 3) {
      setCVV(inputCVV);
    }
  }
  useEffect(() => {
    const apiUrl = "http://localhost:58768/travelform/getlatestentry/1";

    axios
      .get(apiUrl)
      .then((response) => {
        setTravelPrice(response.data.price);
        setLatestEntry(response.data);
        const startDate = new Date(response.data.travelStartDate);
        const endDate = new Date(response.data.travelEndDate);
        const timeDiff = endDate - startDate;
        const calculateDay = timeDiff / (1000 * 60 * 60 * 24);
        setTotalDay(calculateDay);
        setSelectedCountry(response.data.country);
        setTcIdentityNumber(response.data.tcIdentityNumber);
        setTravelEndDate(response.data.travelEndDate.split("T")[0]);
        setTravelStartDate(response.data.travelStartDate.split("T")[0]);
        console.log(travelPrice);
        console.log(totalDay);
        console.log(response.data.price);
        console.log(response.data);
        console.log(selectedCountry);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="h-full px-[200px]">
      <div className="row1 flex justify-center py-[20px]">
        <a href="https://www.generali.com.tr/?_gl=1*1m891tg*_gcl_au*MTEwMTkzNDYzMC4xNjkwODkyMjA3">
          <img src="https://teklif.generali.com.tr/Main/TravelHealth/Content/V2/images/logo_hor_r.png?pcid=62a90d9b-cd0c-4907-9d0e-5122e30ae960"></img>
        </a>
      </div>
      <div className="row hp-slides">
        <div className="hp-slide-casco-slide">
          <div className="headerContainer">
            <h1 className="h1">{t("güvenMetni1")}</h1>
            <span className="policeText">{t("güvenMetni2")}</span>
          </div>
        </div>
      </div>
      <div>
        <div className=" bg-white3 mx-auto rounded-xl firstDiv">
          <div className=" w-full bg-gray3 rounded-t-xl font-sans font-bold pl-4 py-4">
            <div className="text-[25px]">{t("policeKapsamı")}</div>
            <div className="flex justify-between py-5">
              <label>{t("sigortaBilgisi")}</label>
              <label className="pr-[450px]">{t("kisiselBilgiler")}</label>
            </div>
          </div>
          <div className="flex justify-between pl-8 py-5">
            <div className="border-2 border-gray3 flex justify-between h-[100px]">
              {t('medical')}<br />
              {t("remains")}<br />
              {t("evacuation")}
              <div className="flex justify-center items-center py-5 pl-[100px] text-red font-sans font-bold">
                30.000 Euro
              </div>
            </div>

            <div className="pl-20 w-1/2 ">
              <span className="text-gray2 text-[20px]">
                {t("policeBaslangic")} <span> {travelStartDate}</span>
              </span>{" "}
              <br />
              <span className="text-gray2 text-[20px]">
                {t("policeBitis")} <span>{travelEndDate}</span>
              </span>{" "}
              <br />
              <span className="text-gray2 text-[10px]">
                {t("bilgilendirme1")}
              </span>{" "}
              <br />
              <span className="text-gray2 text-[10px]">
                {t("bilgilendirme2")}
              </span>{" "}
              <br />
              <span className="text-gray2 text-[20px]">
                {t("seyahatEdilecekUlke")} <span>{selectedCountry}</span>
              </span>{" "}
              <br />
              <span className="text-gray2 text-[20px]">
                {t("kimlikNo")} <span>{tcIdentityNumber}</span>
              </span>{" "}
              <br />
              <span className="text-gray2 text-[20px]">
                {t("adSoyad")} <span>EM****** ER**</span>
              </span>{" "}
              <br />
              <span className="text-gray2 text-[20px]">
                {t("prim")}{" "}
                <span>
                  {travelPrice} - {(travelPrice / 27.5).toFixed(2)}/ €
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="odemeAnaDiv">
          <div className="krediYaziDiv">Kredi Kartı veya ATM Kartı</div>
          <div className="secondMainDiv">
            <div className="inputAlani">
              <input
                className="kartIsimNo"
                placeholder="Kart Üzerindeki İsim"
              />
              <div className="checkAndText">
                <label className="kontrolEdildiMi">
                  <input type="checkbox" /> Sigortalı ile ödeme yapan kişi
                  bilgileri aynıdır.
                </label>
              </div>
              <input
                className="kartIsimNo"
                type="text"
                value={formattedCardNumber}
                onChange={handleCardNumberChange}
                placeholder={t("cardInput")}
              />
              <div className="sktAndCvv">
                <input
                  type="text"
                  value={formattedExpiryDate}
                  onChange={handleExpiryDateChange}
                  className="sonKullanmaTarihi"
                  placeholder={t("expiryInput")}
                />
                <input
                  className="cvv"
                  type="text"
                  value={cvv}
                  onChange={handleCVVChange}
                  placeholder={t("cvvInput")}
                />
              </div>
              <div className="imgAndSecure">
                <span className="imgKey">
                  <img
                    src="https://teklif.generali.com.tr/Main/TravelHealth/Content/V2/images/3d_sec.png?uid=217078760"
                    alt=""
                  />
                </span>
                <p className="ucDText">3D Secure</p>
              </div>
              <input className="telefonNumarasi" placeholder="537-689-33-99" />
              <input className="ePosta" placeholder="E-Posta" />
              <div className="checkSozlesme">
                <input className="checkControl" type="checkbox" />{" "}
                <u>{t('distanceSales')}</u> {t('okudumKabulEdiyorum')}
              </div>
              <button className="btnTamamla">{t("submitButton")}</button>
            </div>

            <div className="imageAndPrice">
              <div className="cardImage">
                <img
                  src="https://teklif.generali.com.tr/Main/TravelHealth/Content/V2/images/kartTH.png?uid=217078760"
                  alt=""
                />
              </div>
              <p className="cardText">
              <p>{t("phoneNumberNote")}</p>
              </p>

              <div className="totalPrice">
                <sub className="toplamTutar">{t("totalPriceLabel")} </sub>
                <div className="totalPriceInt">
                  <p className="spanTlInt">  {travelPrice} </p>
                  <sub className="virgulKisim">,00TL</sub>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="btnGeri">{t("backButton")}</button>
      </div>
    </div>
  );
}
export default PageFour;
