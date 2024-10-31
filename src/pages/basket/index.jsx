import "./basket.scss";
import BasketImage from "@/assets/images/icons/basket.svg";
//--------------------------------------------
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
//--------------------------------------------
import Empty from "./components/empty";
import SingleItem from "./components/singleItem";
import Factor from "./components/factor";
import { useAppContext } from "@/context/App/app-context";
import {
  getOrders,
  payment,
  removeOrder,
  updateProductCount,
} from "@service/orders";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  borderRadius: "10px",
  border: "unset",
  overflow: "hidden",
};

const Basket = () => {
  const { cartItems, cartDetails, initialBasket } = useAppContext();
  let [orderUniqKey, setOrderUniqKey] = useState("");
  let [loadingPayment, setLoadingPayment] = useState(false);
  let [confirmRemoveOrder, setConfirmRemoveOrder] = useState(false);
  let [editProductCount, setProductCount] = useState(false);
  let [changeProductCount, setChangeProductCount] = useState({});
  let [loading, setLoading] = useState(false);
  //----------------------------------------------------------------
  const handelOpenConfirmation = () => setConfirmRemoveOrder(true);
  const handelCloseConfirmation = () => setConfirmRemoveOrder(false);
  //------------------
  const handelOpenEditProductCount = () => setProductCount(true);
  const handelCloseEditProductCount = () => setProductCount(false);
  //----------------------------------------------------------------

  const navigate = useNavigate();
  const getBasket = async () => {
    try {
      await getOrders().then((response) => {
        if (response.status === 200) {
          let { cart, cartDetail } = response.data;
          initialBasket(cart, cartDetail);
        }
      });
    } catch (error) {}
  };
  useEffect(() => {
    getBasket();
  }, []);

  const finalPayment = async () => {
    setLoadingPayment(true);
    await payment()
      .then((response) => {
        showMessage("عملیات با موفقیت انجام شد !");
        getBasket();
        navigate("/order");
      })
      .catch((error) => {
        showMessage(error.response.data.message, "error");
      });
    setLoadingPayment(false);
  };

  const removeSingleOrder = (uniqKey) => {
    setOrderUniqKey(uniqKey);
    handelOpenConfirmation();
  };

  const removeSingleProductFromBasket = async () => {
    let fieldUniqProduct = {
      sku: orderUniqKey,
    };
    await removeOrder(fieldUniqProduct)
      .then((response) => {
        if (response.status === 200) {
          getBasket();
          showMessage("محصول با موفقیت از سبد خرید شما حذف شد");
        }
      })
      .catch((error) => {
        console.log(error, "errro remove order basket");
        showMessage("مشکلی پیش آمده ، لطفا مجددا تلاش نمایید !", "error");
      });
    handelCloseConfirmation();
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

  const changeCountProduct = (information) => {
    setChangeProductCount(information);
    handelOpenEditProductCount();
  };

  const incrementProductCount = () => {
    setChangeProductCount((productListDetail) => ({
      ...productListDetail,
      count: Number(changeProductCount.count) + 1,
    }));
  };

  const decrementProductCount = () => {
    if (changeProductCount.count === 1) return;
    setChangeProductCount((changeProductCount) => ({
      ...changeProductCount,
      count: Number(changeProductCount.count) - 1,
    }));
  };
  console.log(cartItems)
  const renderBasket = () => {
    return cartItems && cartItems.length === 0 ? (
      <Empty />
    ) : (
      <Box>
        <Grid
          container
          spacing={{ xs: 1, sm: 1 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          {cartItems.map((item, index) => (
            <Grid key={item._id} xs={12} sm={12} md={6}>
              <SingleItem
                {...item}
                index={index}
                remove={(sku) => removeSingleOrder(sku)}
                edit={(model) => changeCountProduct(model)}
              />
            </Grid>
          ))}
        </Grid>
        <Factor {...cartDetails} />
        <section className="wrapper-action-order">
          <Button
            onClick={() => finalPayment()}
            disabled={loadingPayment}
            className="register-order font-iransans"
          >
            {loadingPayment ? "در حال انجام عملیات" : " ثبت و ارسال سفارش"}
          </Button>
        </section>
      </Box>
    );
  };

  const resetChangeProductCount = () => {
    setChangeProductCount({});
  };

  const acceptedChangeProductCount = async () => {
    setLoading(true);
    await updateProductCount(changeProductCount)
      .then((response) => {
        handelCloseEditProductCount();
        updateBasket(response.data);
        showMessage("به روز رسانی با موفقیت انجام شد !");
      })
      .catch((error) => {
        showMessage(
          "مشکلی در انجام درخواست به وجود آمده ، مجددا تلاش نمایید !",
          "error"
        );
      });
    resetChangeProductCount();
    setLoading(false);
  };

  const updateBasket = (payload) => {
    const { cart, cartDetail } = payload;
    initialBasket(cart, cartDetail);
  };

  const changeCount = (event) => {
    setChangeProductCount((changeProductCount) => ({
      ...changeProductCount,
      count: event.target.value,
    }));
  };
  return (
    <>
      <section className="basket">
        <section className="basket__header">
          <img className="logo" src={BasketImage} alt="" />
          <span className="title">سبد خرید</span>
        </section>
        <section className="basket__content">{renderBasket()}</section>
      </section>

      <Modal open={confirmRemoveOrder}>
        <Box className="hero-box-remove-product" sx={style}>
          <section className="inner-dialog-confirmation">
            <section className="confirmation-message">
              آیا مطمئن هستید که می خواهید این محصول را حذف کنید ؟
            </section>
            <section className="confirmation-action">
              <Button
                onClick={() => removeSingleProductFromBasket()}
                className="accepted-remove btn-confirmation font-iransans"
              >
                تایید
              </Button>
              <Button
                onClick={() => handelCloseConfirmation()}
                className="close-dialog btn-confirmation font-iransans"
              >
                بستن
              </Button>
            </section>
          </section>
        </Box>
      </Modal>

      <Modal open={editProductCount}>
        <Box className="hero-box-product-edit" sx={style}>
          <section className="inner-dialog-edit-product">
            <span
              className="increment pointer"
              onClick={() => incrementProductCount()}
            >
              <AddIcon />
            </span>
            <span className="counter persian-number">
              <TextField
                value={changeProductCount.count}
                variant="outlined"
                size="small"
                className="product-count basket-count"
                type="number"
                inputProps={{ maxLength: 7 }}
                onChange={changeCount}
              />
            </span>
            <span
              className="decrement pointer"
              onClick={() => decrementProductCount()}
            >
              <RemoveIcon />
            </span>
          </section>
          <section className="wrapper-accepted">
            {loading ? (
              <span>در حال انجام عملیات ...</span>
            ) : (
              <>
                <span
                  onClick={() => acceptedChangeProductCount()}
                  className="accepted action-holder"
                >
                  <DoneIcon />
                </span>
                <span
                  onClick={() => handelCloseEditProductCount()}
                  className="cancell action-holder"
                >
                  <CloseIcon />
                </span>
              </>
            )}
          </section>
        </Box>
      </Modal>
    </>
  );
};

export default Basket;
