import { useContext } from "react";
import { createContext, useReducer } from "react";
import { useTranslation } from "react-i18next";
import appReducer from "./app-reducer";

const AppContext = createContext();
const initialState = {
  language: localStorage.getItem("language") || "fa",
  theme: localStorage.getItem("theme") || "light",
  cartItems: [],
  cartDetails: {},
};

const AppProvider = ({ children }) => {
  // const { i18n } = useTranslation();
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addProductToCard = (product) => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: {
        product,
      },
    });
  };

  const initialBasket = (products, details) => {
    dispatch({
      type: "INITIAL_BASKET",
      payload: {
        products,
        details,
      },
    });
  };

  const getBasket = () => {
    dispatch({
      type: "GET_PRODUCTS",
    });
  };

  const clearBasket = () => {
    dispatch({
      type: "CLEAR_CARD",
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        addProductToCard,
        initialBasket,
        getBasket,
        clearBasket,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider };
