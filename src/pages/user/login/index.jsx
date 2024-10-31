import "./login.scss";
//--------------------------------
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
//--------------------------------
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { otpLogin, login, loginWithPassword } from "@service/user.js";
import { setToken, setUser } from "@core/storageService";
import { toast } from "react-toastify";
const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    formState: { errors },
  } = useForm();
  //------------------------------------------------------
  const [otp, setOtp] = useState("");
  let [loginState, setLoginState] = useState(false);
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  //------------------------------------------------------
  const navigate = useNavigate();
  //------------------------------------------------------

  const changeStatus = (status) => {
    setLoginState(status);
  };

  const handelFirstStep = async (data) => {
    await otpLogin(data)
      .then((response) => {
        if (response.status === 200) changeStatus(true);
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handelOtpStep = async () => {
    if (otp.length === 4) {
      let modelLoginOtp = {
        username: getValues().username,
        otp,
      };
      try {
        await login(modelLoginOtp).then((response) => {
          const { token, ...userInfo } = response.data;
          setToken(token);
          setUser(userInfo);
          navigate("/");
          toast.success("شما با موفقیت وارد شدید !", {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      } catch (error) {
        toast.error("کد پیامکی معتبر نمی باشد", {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("کد پیامکی را به درستی وارد کنید", {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const autoLogin = async () => {
    if (otp.length === 4) {
      let modelLoginOtp = {
        username: getValues().username,
        otp,
      };
      try {
        await login(modelLoginOtp).then((response) => {
          const { token, ...userInfo } = response.data;
          setToken(token);
          setUser(userInfo);
          navigate("/");
          toast.success("شما با موفقیت وارد شدید !", {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      } catch (error) {
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const editUserName = () => {
    setLoginState(false);
    setOtp("");
  };

  const loginWithUserName = async () => {
    const username = getValues().username;
    if (password === "" || username === "") return;
    setLoading(true);
    let loginModel = {
      username,
      password,
    };
    await loginWithPassword(loginModel)
      .then((response) => {
        const { token, ...userInfo } = response.data;
        setToken(token);
        setUser(userInfo);
        navigate("/");
        toast.success("شما با موفقیت وارد شدید !", {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
    setLoading(false);
  };

  useEffect(() => {
    autoLogin();
  }, [otp]);

  const renderLogin = () => {
    return !loginState ? (
      <form
        className="form-wrapper-login-with-mobile"
        onSubmit={handleSubmit(handelFirstStep)}
      >
        <section className="hero-element">
          <section className="single-field">
            <span className="label">شماره موبایل</span>
            {/* <OutlinedInput
              sx={{
                backgroundColor: "#e0e0e0",
              }}
              size="small"
              type="number"
              name="username"
              className="text-right persian-number"
              {...register("username", {
                required: true,
                minLength: 11,
                maxLength: 11,
                validate: {
                  checkLength: (value) => value.length >= 11,
                  matchPattern: (value) =>
                    /^(00989|\+989|09)(\d{9})$/gm.test(value),
                },
              })}
            /> */}
            <TextField
              size="small"
              {...register("username", {
                required: true,
                minLength: 11,
                maxLength: 11,
                validate: {
                  checkLength: (value) => value.length >= 11,
                  matchPattern: (value) =>
                    /^(00989|\+989|09)(\d{9})$/gm.test(value),
                },
              })}
              type="number"
              name="username"
              placeholder="شماره مویابل"
              className="persian-number"
            />
            {errors.username && errors.username.type === "required" && (
              <p className="user-erorr error"> شماره موبایل اجباری است</p>
            )}
            {errors.username &&
              (errors.username.type === "minLength" ||
                errors.username.type === "maxLength") && (
                <p className="user-erorr error">
                  {" "}
                  شماره موبایل باید 11 رقم باشد
                </p>
              )}
            {errors.username && errors.username.type === "matchPattern" && (
              <p className="user-erorr">شماره موبایل وارد شده معتبر نیست</p>
            )}
          </section>

          <section className="single-field">
            <span className="label">کلمه عبور</span>
            <TextField
              value={password}
              variant="outlined"
              size="small"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </section>

          <section className="hero-action">
            <Button
              disabled={loading}
              onClick={loginWithUserName}
              className="btn login font-iransans"
            >
              {loading ? "لطفا صبور باشید ..." : "ورود"}
            </Button>
            <section className="seperator-auth">یا</section>
            <Button type="submit" className="btn login-with-code font-iransans">
              ورود با کد یکبار مصرف
            </Button>
          </section>
        </section>
      </form>
    ) : (
      <form
        className="form-wrapper-insert-otp"
        onSubmit={handleSubmit(handelOtpStep)}
      >
        <section className="hero-otp">
          <section className="message">
            رمز عبور به شماره همراه شما ارسال شد
          </section>

          <section className="otp">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
              containerStyle="otp-container"
              inputStyle="otp-fields persian-number"
              inputType="number"
              shouldAutoFocus={true}
            />
          </section>
          <section onClick={() => editUserName()} className="edit-user-name">
            ویرایش کد ملی
          </section>

          {/* <section className="login-wrapper">
            <Button
              type="submit"
              className="login-with-recive-code font-iransans"
            >
              ورود با رمز یکبار مصرف
            </Button>
          </section> */}
        </section>
      </form>
    );
  };
  return <section className="login">{renderLogin()}</section>;
};

export default Login;
