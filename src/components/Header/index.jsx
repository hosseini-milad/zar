import "./header.scss";
import logo from "@/assets/images/logo.png";
import ContactUs from "./components/ContactUs";
import Notification from "./components/Notification";
import Close from "@/assets/images/icons/close.svg";

//**************************** */
import { Button } from "@mui/base/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUser, clearStorage } from "@core/storageService";
import { changePassword } from "@service/user";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  borderRadius: "10px",
};
const Header = () => {
  const [open, setOpen] = useState(false);
  const [hasChangePassword, setHasChangePassword] = useState(false);
  let [updatePassword, setUpdatePassword] = useState({
    oldpassword: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const currentUser = getUser();

  const goToLoginPage = () => {
    navigate("/login");
  };
  const closeDialogUserProfile = () => {
    if (hasChangePassword) {
      clearStateChangePassword();
    }
    handleClose();
  };
  const clearStateChangePassword = () => {
    setUpdatePassword({ oldpassword: "", password: "" });
    setHasChangePassword(false);
  };
  const renderShowUserName = () => {
    const currentUser = getUser();
    if (currentUser) {
      return (
        <Button
          className="user-name public-btn font-iransans"
          onClick={handleOpen}
        >
          {currentUser.cName?.substring(0, 10)}
        </Button>
      );
    }
  };
  const logOut = () => {
    handleClose();
    clearStorage();
    navigate("/login");
  };
  const goToCompanyWebSite = () => {
    window.open("https://202.ir/", "_blank");
  };
  const setChangePassword = (e) => {
    setUpdatePassword({
      ...updatePassword,
      [e.target.name]: e.target.value,
    });
  };

  const changePasswordAction = async () => {
    try {
      const { password } = updatePassword;
      if (password === "") return;
      setLoading(true);
      await changePassword(updatePassword)
        .then((response) => {
          toast.success("عملیات با موفقیت انجام شد", {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          clearStateChangePassword();
          handleClose();
        })
        .catch((error) => {
          toast.error(error.response.data.error, {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } catch (error) {}
    setLoading(false);
  };

  const renderChnagePassword = () => {
    return (
      hasChangePassword && (
        <>
          {/* <section className="holder-element">
            <span className="label">کلمه عبور قدیم</span>
            <TextField
              value={updatePassword.oldpassword}
              variant="outlined"
              size="small"
              className="d-ltr"
              type="password"
              name="oldpassword"
              onChange={setChangePassword}
            />
          </section> */}
          <section className="holder-element">
            <span className="label">کلمه عبور</span>
            <TextField
              value={updatePassword.password}
              variant="outlined"
              size="small"
              className="d-ltr"
              type="password"
              name="password"
              onChange={setChangePassword}
            />
          </section>
        </>
      )
    );
  };
  return (
    <>
      <section className="header">
        <img
          onClick={() => goToCompanyWebSite()}
          className="logo"
          src={logo}
          alt=""
        />
        <section className="header__user">
          <section className="right-items">{renderShowUserName()}</section>
          <section className="left-items">
            <ContactUs />
            {getUser() && <Notification />}
            {!getUser() && (
              <Button
                className="login font-iransans public-btn"
                onClick={() => goToLoginPage()}
              >
                ورود به حساب
              </Button>
            )}
          </section>
        </section>
      </section>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="wrapper-user-info">
          <section className="profile">
            <img
              onClick={() => closeDialogUserProfile()}
              className="close pointer"
              src={Close}
              alt=""
            />
            {!hasChangePassword && (
              <>
                <section className="holder-element">
                  <span className="label">نام کاربر</span>
                  <TextField
                    value={currentUser?.sName}
                    disabled
                    variant="outlined"
                    size="small"
                  />
                </section>
                <section className="holder-element">
                  <span className="label">ایمیل</span>
                  <TextField
                    value={currentUser?.email}
                    disabled
                    variant="outlined"
                    size="small"
                    className="d-ltr"
                  />
                </section>
                <section className="holder-element">
                  <span className="label">شرکت</span>
                  <TextField
                    value={currentUser?.sName}
                    disabled
                    variant="outlined"
                    size="small"
                  />
                </section>
                <section className="holder-element">
                  <span className="label">شماره موبایل</span>
                  <TextField
                    value={currentUser?.phone}
                    disabled
                    variant="outlined"
                    size="small"
                    className="d-ltr"
                  />
                </section>
                <section className="holder-element">
                  <span className="label">آدرس</span>
                  <TextareaAutosize
                    value={currentUser?.Address}
                    disabled
                    minRows="5"
                  />
                </section>
              </>
            )}

            {renderChnagePassword()}

            <section className="action">
              {!hasChangePassword ? (
                <>
                  <Button onClick={() => logOut()} className="logout btn">
                    خروج از حساب
                  </Button>
                  <Button
                    onClick={() => setHasChangePassword(true)}
                    className="change-password btn"
                  >
                    تغییر رمز عبور
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => changePasswordAction()}
                  className="updatePassword btn"
                  disabled={loading}
                >
                  {loading ? "در حال اعمال تغییرات" : "به روز رسانی کلمه عبور"}
                </Button>
              )}
            </section>
          </section>
        </Box>
      </Modal>
    </>
  );
};

export default Header;
