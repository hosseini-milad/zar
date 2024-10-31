import { httpWithToken } from "@core/httpService";

const newsList = async () => {
  return await httpWithToken.post("/api/setting/list-news");
};

const readSingleNews = async (data) => {
  return await httpWithToken.post("/api/setting/read-news", {
    newsId: data
  });
};

export { newsList, readSingleNews };
