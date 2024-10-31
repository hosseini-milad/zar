import "./order.scss";
import MyOrder from "@/assets/images/icons/myOrder.svg";
import Search from "@/assets/images/icons/search.svg";

import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { toast } from "react-toastify";
//--------------------------------------
import SingleCard from "./component/singleCard";
import EmptyCard from "./component/empty";
import { factorList, cancelFaktor } from "@service/orders";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const getFactorList = async () => {
    factorList(search).then((response) => {
      setOrders(response.data.data);
    });
  };
  useEffect(() => {
    getFactorList();
  }, [search]);

  const cancelSingleFactor = async (factorNumber = null) => {
    if (factorNumber) await cancelOrder(factorNumber);
  };

  const cancelOrder = async (faktorNo) => {
    await cancelFaktor(faktorNo)
      .then((response) => {
        showMessage(response.data.message);
        getFactorList();
      })
      .catch((error) => {
        console.log(error, "errr");
      });
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

  const hasReloadOrdersList = async () => {
    getFactorList();
  };

  const renderOrders = () => {
    return orders.length === 0 ? (
      <EmptyCard />
    ) : (
      <section className="wrapper-cards">
        <Box>
          <Grid
            container
            spacing={{ xs: 1, sm: 1 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            {orders.map((item) => (
              <Grid key={item._id} xs={12} sm={12} md={12}>
                <SingleCard
                  {...item}
                  cancelFactor={cancelSingleFactor}
                  updateOrdersList={hasReloadOrdersList}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </section>
    );
  };

  const debouncedSearch = debounce(async (text) => {
    if (text.target.value.length <= 7) setSearch(text.target.value);
  }, 600);
  return (
    <section className="order">
      <section className="order__header">
        <img className="logo" src={MyOrder} alt="" />
        <span className="title">سفارشات من</span>
      </section>
      <section className="order__content">
        <section className="search">
          <OutlinedInput
            sx={{
              backgroundColor: "#e0e0e0",
              width: "100%",
            }}
            size="small"
            className="text-right"
            onChange={debouncedSearch}
            autoFocus={true}
            placeholder="جستجوی سفارش"
            endAdornment={
              <InputAdornment position="end">
                <img src={Search} alt="" />
              </InputAdornment>
            }
          />
        </section>
        {renderOrders()}
      </section>
    </section>
  );
};

export default Order;
