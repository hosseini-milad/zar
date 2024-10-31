import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import notification from "@/assets/images/icons/notification.svg";
import Close from "@/assets/images/icons/close.svg";
import { notifications, updateSingleNotification } from "@service/user";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { toast } from "react-toastify";
import LastNewsCard from "./components/lastNewsCard";
import { GiNewspaper, GiUncertainty } from "react-icons/gi";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { BsFillBasketFill } from "react-icons/bs";
//-------------------------------------------------

const Notification = () => {
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [lastNews, setLastNews] = useState({});
  const [showLastNews, setShowLastNews] = useState(false);

  const getNotifications = async () => {
    await notifications()
      .then((response) => {
        setNotificationList(response.data.unread);
        setLastNews(response.data.popUp);
      })
      .catch((error) => {});
  };
  const renderNotifIconType = (kind) => {
    switch (kind) {
      case "newNews":
        return <GiNewspaper />;
      case "notif":
        return <MdOutlineNotificationsActive />;
      case "regOrder":
        return <BsFillBasketFill />;
      default:
        return <GiUncertainty />;
    }
  };
  const readSingleNotification = async (notifCode) => {
    let modelReadSingleNotification = {
      notifCode,
      status: 0,
    };
    await updateSingleNotification(modelReadSingleNotification)
      .then((response) => {
        showMessage("تغییر وضعیت نوتیفیکیشن با موفقیت انجام شد");
        getNotifications();
      })
      .catch((error) => {
        console.log(error, "e");
      });
  };
  const showMessage = (message = "", status = "success") => {
    toast[status](message, {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  useEffect(() => {
    getNotifications();
  }, []);
  const renderNotifications = () => {
    return notificationList.length === 0 ? (
      <section className="no-notifications">پیامی وجود ندارد</section>
    ) : (
      <section className="wrapper-notifican-children">
        {notificationList.map((item) => (
          <section
            onClick={() => readSingleNotification(item._id)}
            key={item._id}
            className="notifican-item pointer"
          >
            {renderNotifIconType(item.kind)}
            <section className="notifi-info">
              <p className="notif-title persian-number ">{item.title}</p>
              <p className="notif-abstract">{item.abstract}</p>
            </section>
            {item.status && (
              <VerifiedOutlinedIcon className="read-notification " />
            )}
          </section>
        ))}
      </section>
    );
  };
  const renderNotificanCount = () => {
    return (
      notificationList?.length > 0 && (
        <span className="notification__counter persian-number">
          {notificationList?.length}
        </span>
      )
    );
  };
  const closeDialogLastNews = async () => {
    let modelReadSingleNotification = {
      notifCode: lastNews._id,
      status: 0,
    };
    await updateSingleNotification(modelReadSingleNotification)
      .then((response) => {
        setShowLastNews(false);
      })
      .catch((error) => {
        console.log(error, "e");
      });
  };
  useEffect(() => {
    if (lastNews && Object.keys(lastNews).length > 0) {
      setShowLastNews(true);
    }
  }, [lastNews]);
  return (
    <>
      <section
        onClick={() => setOpenNotification(true)}
        className="notification pointer"
      >
        {renderNotificanCount()}
        <img className="notification__icon" src={notification} alt="" />
      </section>
      <Modal open={openNotification}>
        <section className="wrapper-user-notifications">
          <img
            onClick={() => setOpenNotification(false)}
            className="close pointer"
            src={Close}
            alt="close"
          />
          {renderNotifications()}
        </section>
      </Modal>

      <Modal open={showLastNews}>
        <section className="wrapper-last-news-dialog">
          <img
            onClick={() => closeDialogLastNews()}
            className="close pointer"
            src={Close}
            alt="close"
          />
          <LastNewsCard {...lastNews} />
        </section>
      </Modal>
    </>
  );
};
export default Notification;
