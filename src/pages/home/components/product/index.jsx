import "./product.scss";
//--------------------------
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
//--------------------------
import { useState } from "react";
import TextField from "@mui/material/TextField";
import SingleProduct from "./component/singleProduct";
import Plus from "@/assets/images/icons/plus.svg";

//-----------------------------------
import { moneyFormater } from "@utils/money";
import { addOrder } from "@service/orders.js";
import { useAppContext } from "@/context/App/app-context.jsx";
import { toast } from "react-toastify";
import Empty from "./component/empty";
//-----------------------------------

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  borderRadius: "10px",
  overflow: "hidden",
};
const Product = ({ list, update, countPage, totalPage }) => {
  let { addProductToCard } = useAppContext();
  const [productDetail, setProductDetail] = useState(false);
  const handleOpen = () => setProductDetail(true);
  const handleClose = () => setProductDetail(false);
  const handelCloseDialogProductToBasket = () => {
    setProductDetail(false);
    setProductListDetail({
      count: 1,
    });
  };
  //--------------------------------------------------------
  const [procutToBasket, setProductToBasket] = useState(false);
  let [productInformation, setProductInformation] = useState({
    count: 1,
  });
  let [productListDetail, setProductListDetail] = useState({
    count: 1,
  });
  const handelOpenProductToBasket = () => setProductToBasket(true);
  const handelCloseProductToBasket = () => {
    setProductToBasket(false);
    setProductInformation({
      count: 1,
    });
  };

  const singleProductShowDetail = (currentProduct) => {
    setProductListDetail((productListDetail) => ({
      ...productListDetail,
      ...currentProduct,
    }));
    handleOpen();
  };
  //------------------------------------------------
  //increment or decrement from product details
  const incrementProductCount = () => {
    setProductListDetail((productListDetail) => ({
      ...productListDetail,
      count: productListDetail.count + 1,
    }));
  };

  const decrementProductCount = () => {
    if (productListDetail.count === 1) return;
    setProductListDetail((productListDetail) => ({
      ...productListDetail,
      count: productListDetail.count - 1,
    }));
  };

  const productToBasket = async () => {
    try {
      await addOrder(productListDetail).then((response) => {
        if (response.status === 200) {
          generateModelProductToContextBasket();
          handelCloseDialogProductToBasket();
          showMessage("محصول با موفقیت به سبد خرید اضافه شد !");
        }
      });
    } catch (error) {
      console.log(error.response, "error");
    }
  };

  const generateModelProductToContextBasket = () => {
    const { ItemID, count, price, sku, title } = productListDetail;
    let modelAppProductToContextBasket = {
      ItemID,
      count,
      price,
      sku,
      productDetail: {
        title,
      },
    };
    addProductToCard(modelAppProductToContextBasket);
  };
  //------------------------------------------------
  const addToBasket = (currentProduct) => {
    setProductInformation((productInformation) => ({
      ...productInformation,
      ...currentProduct,
    }));
    handelOpenProductToBasket();
  };

  const handleIncrement = () => {
    setProductInformation((productInformation) => ({
      ...productInformation,
      count: productInformation.count + 1,
    }));
  };

  const handleDecrement = () => {
    if (productInformation.count === 1) return;
    setProductInformation((productInformation) => ({
      ...productInformation,
      count: productInformation.count - 1,
    }));
  };

  const addProductToBasket = async () => {
    try {
      await addOrder(productInformation).then((response) => {
        if (response.status === 200) {
          generateModelAddProductToBasket();
          handelCloseProductToBasket();
          showMessage("محصول با موفقیت به سبد خرید اضافه شد !");
        }
      });
    } catch (error) {}
  };

  const generateModelAddProductToBasket = () => {
    const { ItemID, count, price, sku, title } = productInformation;
    let modelAppProductToContextBasket = {
      ItemID,
      count,
      price,
      sku,
      productDetail: {
        title,
      },
    };
    addProductToCard(modelAppProductToContextBasket);
  };

  const showMessage = (message = "", status = "success") => {
    toast[status](message, {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  //---------------------------------------
  const renderProductCard = () => {
    // eslint-disable-next-line react/prop-types
    return list?.length === 0 ? (
      <Empty />
    ) : (
      list?.map((item, index) => (
        <Grid key={item._id + index * 10} xs={12} sm={12} md={12}>
          <SingleProduct
            {...item}
            showDetail={singleProductShowDetail}
            addBasket={addToBasket}
          />
        </Grid>
      ))
    );
  };

  const changeProductCountInDetail = (event) => {
    setProductListDetail((productListDetail) => ({
      ...productListDetail,
      count: event.target.value,
    }));
  };

  const changeProductCountInBasket = (event) => {
    setProductInformation((productInformation) => ({
      ...productInformation,
      count: event.target.value,
    }));
  };

  //---------------------------------------
  return (
    <section className="holder-products">
      <Box>
        <Grid
          container
          spacing={{ xs: 1, sm: 1, md: 1 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          {renderProductCard()}
        </Grid>
        {list?.length > 0 && totalPage !== countPage && (
          <section onClick={() => update()} className="load-more pointer">
            <span className="message">محصولات بیشتر</span>
          </section>
        )}
      </Box>

      {/* dialog preview single prodcut details */}
      {!0?<><Modal open={productDetail}>
        <Box className="hero-box-product-detail" sx={style}>
          <section className="product-detail">
            <HighlightOffIcon
              onClick={() => handleClose()}
              className="close-product-detail-dialog pointer"
            />
            <section className="product-detail__name">
              {productListDetail.title}
            </section>
            <section className="product-detail__image">
              <img
                className="product-image"
                src={productListDetail.imageUrl}
                alt=""
              />
            </section>
            <section className="product-detail__information">
              {/* product code  */}
              <section className="product-id persian-number">
                کد کالا : {productListDetail.sku}
              </section>
              {/* product attributes */}
              <section className="hero-product">
                <section className="header-title red-text">
                  مشخصات محصول:
                </section>
                <section className="single-attribute">
                  <span className="single-attribute__key black-text">
                    درصد گوشت:
                  </span>
                  <span className="single-attribute__value grey-text">
                    {productListDetail?.meatPercent}
                  </span>
                </section>
                <section className="single-attribute">
                  <span className="single-attribute__key black-text">وزن:</span>
                  <span className="single-attribute__value grey-text persian-number">
                    {productListDetail?.weight}
                  </span>
                </section>
                <section className="single-attribute">
                  <span className="single-attribute__key black-text">
                    ماندگاری:
                  </span>
                  <span className="single-attribute__value grey-text">
                    {productListDetail?.duration}
                  </span>
                </section>
                <section className="single-attribute">
                  <span className="single-attribute__key black-text">
                    ترکیبات:
                  </span>
                  <span className="single-attribute__value grey-text">
                    {productListDetail?.tarkib}
                  </span>
                </section>
                <section className="single-attribute">
                  <span className="single-attribute__key black-text">
                    دمای نگهداری:
                  </span>
                  <span className="single-attribute__value grey-text">
                    {productListDetail?.temp}
                  </span>
                </section>
              </section>
              {/* product units */}
              <section className="product-units">
                <section className="product-units__title black-text">
                  واحد:
                </section>
                <section className="product-units__items">
                  <span className="single-unit">
                    {productListDetail?.unitName}
                  </span>
                </section>
              </section>
              {/* product price equal */}
              <section className="product-price persian-number">
                قیمت براساس واحد: {moneyFormater(productListDetail.price)}
              </section>
              {/* product change count and register */}
              <section className="register-change-counter">
                <section className="change-counter">
                  {productDetail.stepUnit === 1 ? (
                    <>
                      <span
                        className="change-counter__increment pointer"
                        onClick={() => incrementProductCount()}
                      >
                        +
                      </span>
                      <span className="change-counter__count">
                        <TextField
                          value={productListDetail.count}
                          variant="outlined"
                          size="small"
                          className="product-count"
                          type="number"
                          inputProps={{ maxLength: 7 }}
                          onChange={changeProductCountInDetail}
                        />
                      </span>
                      <span
                        className="change-counter__decrement pointer"
                        onClick={() => decrementProductCount()}
                      >
                        -
                      </span>
                    </>
                  ) : (
                    <TextField
                      value={productListDetail.count}
                      variant="outlined"
                      size="small"
                      className="product-count"
                      inputProps={{ maxLength: 7 }}
                      onChange={changeProductCountInDetail}
                    />
                  )}
                </section>
                <section className="register">
                  <Button
                    onClick={() => productToBasket()}
                    className="register__order font-iransans"
                  >
                    ثبت سفارش
                  </Button>
                </section>
              </section>
            </section>
          </section>
        </Box>
      </Modal>

      <Modal open={procutToBasket}>
        <Box className="hero-product-to-basket" sx={style}>
          <section className="product-info">
            <HighlightOffIcon
              onClick={() => handelCloseProductToBasket()}
              className="close-product-to-basket pointer"
            />
            <section className="product-info__image">
              <img
                className="product-large-image"
                src={productInformation.imageUrl}
                alt=""
              />
            </section>
            <section className="product-to-basket-information">
              <section className="product-name grey-dark-text">
                {productInformation.title}
              </section>
              <section className="product-unit-price persian-number red-text">
                قیمت واحد: {moneyFormater(productInformation?.price)}
              </section>
              <section className="changeCount-selectUnit">
                <section className="changeCount">
                  <section className="title-count blue-dark-color">
                    تعداد:
                  </section>
                  <section className="counter">
                    {productInformation.stepUnit === 1 ? (
                      <>
                        <span
                          onClick={() => handleIncrement()}
                          className="increment pointer"
                        >
                          +
                        </span>
                        <span className="count persian-number blue-dark-color">
                          <TextField
                            value={productInformation.count}
                            variant="outlined"
                            size="small"
                            className="product-count"
                            type="number"
                            inputProps={{ maxLength: 7 }}
                            onChange={changeProductCountInBasket}
                          />
                        </span>
                        <span
                          onClick={() => handleDecrement()}
                          className="decrement pointer"
                        >
                          -
                        </span>
                      </>
                    ) : (
                      <TextField
                        value={productInformation.count}
                        variant="outlined"
                        size="small"
                        className="product-count"
                        inputProps={{ maxLength: 7 }}
                        onChange={changeProductCountInBasket}
                      />
                    )}
                  </section>
                </section>
                <section className="selectUnit">
                  <section className="title-unit blue-dark-color">
                    واحد:
                  </section>
                  <FormControl size="small">
                    <Select
                      sx={{
                        height: 43,
                        backgroundColor: "#e0e0e0",
                        fontFamily: "IRANSansX",
                      }}
                      value={1}
                      displayEmpty
                      disabled
                    >
                      <MenuItem value={1}>
                        {productInformation?.unitName}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </section>
              </section>
              <section className="action-to-basket">
                <Button
                  onClick={() => addProductToBasket()}
                  className="add-to-basket btn font-iransans"
                >
                  <img className="icon-to-basket" src={Plus} alt="" />
                  <span className="text">افزودن</span>
                </Button>
              </section>
            </section>
          </section>
        </Box>
      </Modal></>:<></>}
    </section>
  );
};

export default Product;
