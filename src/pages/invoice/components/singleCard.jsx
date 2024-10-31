import Button from "@mui/material/Button";
import { onlyDatePersian } from "@utils/dateTime";
const SingleCard = ({ rahId, initDate, faktorUrl }) => {
  const downloadFile = () => {
    window.open(faktorUrl, "_blank");
  };
  return (
    <section className="single-invoice">
      <section className="children persian-number">{rahId}</section>
      <section className="children persian-number">
        {onlyDatePersian(initDate)}
      </section>
      <section className="children">
        <Button onClick={downloadFile} className="download-file">
          دریافت فایل
        </Button>
      </section>
    </section>
  );
};

export default SingleCard;
