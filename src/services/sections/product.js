import { http } from "@core/httpService";

const productList = async (data) => {
  try {
    return await http.post("/api/esale/list-product", data);
  } catch (error) {}
};

const categories = async () => {
  try {
    return await http.get("/api/esale/list-units");
  } catch (error) {}
};

export { productList, categories };
