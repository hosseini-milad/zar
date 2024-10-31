import "./accountReport.scss";
import News from "@/assets/images/icons/news.svg";
import Download from "@/assets/images/icons/download.svg";
import Button from "@mui/material/Button";
//----------------------------------------------
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useEffect, useState } from "react";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { invoiceReport } from "@service/reports";
import moment from "jalali-moment";
const url = import.meta.env.VITE_BASE_URL;
const AccountReport = () => {
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  let fromDate = "";
  let toDate = "";
  const [downloadLinks, setDownloadLinks] = useState({
    pdfUrl: "",
    xlsUrl: "",
  });
  const selectedFromDate = (date) => {
    let object = { date };
    const dateSelected = new DateObject(object)
      .convert(persian, gregorian_en)
      .format("YYYY/MM/DD");

    let convertToEn = moment
      .from(dateSelected, "fa", "YYYY/MM/DD")
      .locale("en")
      .format("YYYY/MM/DD");
    fromDate = convertToEn;
  };
  const convertDateEnToPe = (date) => {
    let object = { date };
    return new DateObject(object)
      .convert(persian, gregorian_en)
      .format("YYYY/MM/DD");
  };
  const selectedToDate = (date) => {
    let object = { date };
    const dateSelected = new DateObject(object)
      .convert(persian, gregorian_en)
      .format("YYYY/MM/DD");
    let convertToEn = moment
      .from(dateSelected, "fa", "YYYY/MM/DD")
      .locale("en")
      .format("YYYY/MM/DD");
    toDate = convertToEn;
  };

  const clearDownloadLinks = () => {
    setDownloadLinks({
      pdfUrl: "",
      xlsUrl: "",
    });
  };

  const getReport = async () => {
    clearDownloadLinks();
    const model = {
      dateFrom: fromDate,
      dateTo: toDate,
    };
    await invoiceReport(model).then((response) => {
      console.log(response, "response");
      if (response.data !== "not found") setDownloadLinks(response.data);
    });
  };
  const download = (type) => {
    if (type === "excel") window.open(url + downloadLinks.xlsUrl, "_blank");
    else window.open(url + downloadLinks.pdfUrl, "_blank");
    clearDownloadLinks();
  };

  return (
    <section className="accountReport">
      <section className="accountReport__header">
        <img className="logo" src={News} alt="News" />
        <span className="title">گزارش حساب</span>
      </section>
      <section className="accountReport__content">
        <section className="search">
          <section className="from-date">
            <span className="title">از تاریخ:</span>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={dateFrom}
              calendarPosition="bottom-right"
              onChange={selectedFromDate}
            />
          </section>
          <section className="to-date">
            <span className="title">تا تاریخ:</span>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={dateTo}
              calendarPosition="bottom-right"
              onChange={selectedToDate}
            />
          </section>
          <Button className="report" onClick={() => getReport()}>
            گزارش
          </Button>
        </section>
        {downloadLinks.pdfUrl.length > 0 && (
          <section className="result">
            <section className="message">
              گزارش درخواستی شما تولید شد. جهت دریافت، نوع فایل خروجی را انتخاب
              نمایید.
            </section>
            <section className="selected-download-file-type">
              <Button
                onClick={() => download("excel")}
                className="excel-report btn"
              >
                <img className="download-icon" src={Download} alt="" />
                <span className="title">دریافت فایل Excel</span>
              </Button>
              <Button
                onClick={() => download("pdf")}
                className="pdf-report btn"
              >
                <img className="download-icon" src={Download} alt="" />
                <span className="title"> دریافت فایل PDF</span>
              </Button>
            </section>
          </section>
        )}
      </section>
    </section>
  );
};

export default AccountReport;
