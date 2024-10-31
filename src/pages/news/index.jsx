import "./news.scss";
const url = import.meta.env.VITE_BASE_URL;
import NewsIcon from "@/assets/images/icons/news.svg";
import Close from "@/assets/images/icons/close.svg";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { newsList, readSingleNews } from "@service/news";
import { datePersian } from "@utils/dateTime";
//----------------------------------
import SingleCard from "./components/singleCard";
import LastNewsCard from "./components/lastNewsCard";
import Empty from "./components/empty";

const News = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [singleNewsDetail, setSingleNewsDetail] = useState({});
  const [lastNews, setLastNews] = useState({});
  const [showLastNews, setShowLastNews] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const markup = { __html: singleNewsDetail?.content };

  //---------------------------------------
  const getNewsList = async () => {
    try {
      await newsList().then((response) => {
        console.log(response, "s");
        setList(response.data.filter);
        // setLastNews(response.data.lastShow);
      });
    } catch (error) {}
  };

  // useEffect(() => {
  //   if (Object.keys(lastNews).length > 0) {
  //     setShowLastNews(true);
  //   }
  // }, [lastNews]);

  useEffect(() => {
    getNewsList();
  }, []);

  const handlerSingleNewDetail = (id) => {
    setSingleNewsDetail(list.find((news) => news._id === id));
    handleOpen();
  };

  const renderNewsList = () => {
    return list.length === 0 ? (
      <Empty />
    ) : (
      list.map((item) => (
        <Grid key={item._id} xs={12} sm={12} md={6}>
          <SingleCard {...item} detail={handlerSingleNewDetail} />
        </Grid>
      ))
    );
  };

  //---------------------------------------
  // const closeDialogLastNews = async () => {
  //   await readSingleNews(lastNews._id)
  //     .then((response) => {
  //       console.log(response, "read news");
  //       setShowLastNews(false);
  //     })
  //     .catch((error) => {
  //       console.log(error, "error");
  //     });
  // };
  //---------------------------------------
  return (
    <section className="news">
      <section className="news__header">
        <img className="logo" src={NewsIcon} alt="" />
        <span className="title">اخبار</span>
      </section>
      <section className="news__content">
        <Box>
          <Grid
            container
            spacing={{ xs: 1, sm: 1, md: 1 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            {renderNewsList()}
          </Grid>
        </Box>
      </section>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="wrapper-single-news-details">
          <section className="single-blog">
            <section className="single-blog__image">
              <img
                className="single-news-image"
                src={`${url}${singleNewsDetail.imageUrl}`}
                alt={singleNewsDetail.title}
              />
            </section>
            <section className="single-blog__content">
              <section className="header-news">
                <section className="title">{singleNewsDetail.title}</section>
                <section className="seperator"></section>
                <section className="created-date persian-number">
                  تاریخ انتشار:{datePersian(singleNewsDetail.date, "date")}
                </section>
              </section>
              <section className="description">
                <p dangerouslySetInnerHTML={markup} />
              </section>
            </section>
            <section
              className="single-blog__close pointer"
              onClick={handleClose}
            >
              <section className="seperator"></section>
              <section className="close-title-icon">
                <img className="icon" src={Close} alt="" />
                <span className="title">بستن پنجره</span>
              </section>
            </section>
          </section>
        </Box>
      </Modal>
      {/* 
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
      </Modal> */}
    </section>
  );
};

export default News;
