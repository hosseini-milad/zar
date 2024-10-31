import { http, httpWithToken } from "@core/httpService";

const otpLogin = async (data) => {
  return await http.post("/api/auth/customer-otp", data);
};

const login = async (data) => {
  return await http.post("/api/auth/login-otp", data);
};

const loginWithPassword = async (data) => {
  return await http.post("/api/auth/login-customer", data);
};

const changePassword = async (data) => {
  return await httpWithToken.post("/api/auth/password", data);
}

const notifications = async () => {
  return await httpWithToken.get("/api/setting/list-notif");
}

const updateSingleNotification = async (data) => {
  return await httpWithToken.post("/api/setting/update-notif", data);
}

export { otpLogin, login, loginWithPassword, changePassword, notifications, updateSingleNotification };
