import { httpWithToken } from "@core/httpService";

const invoiceReport = async (data) => {
  return await httpWithToken.post("/api/report/create-invoice", data);
};

export { invoiceReport };
