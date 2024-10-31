const url = import.meta.env.VITE_BASE_URL;
import Grid from "@mui/material/Unstable_Grid2";
import Empty from "./components/empty";

import "./categoryProduct.scss";

const CategoryProduct = ({ list, totalPage, countPage, update }) => {
  console.log(list, "ffff");
  const renderCards = () => {
    return list?.length === 0 ? (
      <Empty />
    ) : (
      list?.map((item) => (
        <Grid key={item._id} xs={6} sm={6}>
          <section className="single-product">
            <section className="image">
              <img
                className="image__product"
                src={`${url}${item.thumbUrl}`}
                alt=""
              />
            </section>
            <section className="title">{item.title.substring(0, 32)}</section>
          </section>
        </Grid>
      ))
    );
  };
  return (
    <section className="wrapper-large-product-card">
      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        {renderCards()}
        {list?.length > 0 && totalPage !== countPage && (
          <section onClick={() => update()} className="load-more pointer">
            <span className="message">محصولات بیشتر</span>
          </section>
        )}
      </Grid>
    </section>
  );
};

export default CategoryProduct;
