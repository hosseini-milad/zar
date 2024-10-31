import { http } from "@core/httpService";

const sliders = async () => {
  return await http.get("/api/esale/sliders");
};

export { sliders };
