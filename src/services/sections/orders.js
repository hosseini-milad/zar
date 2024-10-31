import { httpWithToken } from "@core/httpService";

const getOrders = async () => {
  return await httpWithToken.get("/api/esale/get-cart");
};

const addOrder = async (data) => {
  return await httpWithToken.post("/api/esale/add-cart", data);
};

const removeOrder = async (data) => {
  return await httpWithToken.post("/api/esale/remove-cart-item", data);
};

const payment = async () => {
  return await httpWithToken.get("/api/esale/cart-to-faktor");
};

const factorList = async (search = null) => {
  return await httpWithToken.post("/api/esale/list-faktor", {
    search,
  });
};

const updateProductCount = async (data) => {
  return await httpWithToken.post("/api/esale/update-cart-item", data);
};

const cancelFaktor = async (data) => {
  return await httpWithToken.post("/api/esale/cancel-faktor", {
    faktorNo: data,
  });
};
const completedFactors = async () => {
  return await httpWithToken.post("/api/esale/list-complete-faktor");
};
const orderAccepted = async (orderNo) => {
  return await httpWithToken.post("/api/panel/order/close-order", {
    body: {
      orderNo,
    },
  });
};
export {
  getOrders,
  addOrder,
  removeOrder,
  payment,
  factorList,
  updateProductCount,
  cancelFaktor,
  completedFactors,
  orderAccepted,
};
