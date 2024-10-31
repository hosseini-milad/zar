import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
const ContactUs = () => {
  return (
    <a href="tel:02144892106">
      <span className="contact-us pointer">
        <LocalPhoneOutlinedIcon className="contact-us__icon" />
      </span>
    </a>
  );
};

export default ContactUs;
