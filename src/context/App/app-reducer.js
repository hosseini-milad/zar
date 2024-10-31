const appReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const newItemId = action.payload.product.sku;
      const itemExist = state.cartItems.some((item) => item.sku === newItemId);

      let updatedCartItems = null;

      if (itemExist) {
        updatedCartItems = state.cartItems.map((item) => {
          if (item.sku === newItemId) {
            return {
              ...item,
              count: item.count + 1,
            };
          }
          return item;
        });
      } else {
        updatedCartItems = [...state.cartItems, action.payload.product];
      }

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }
    case "INITIAL_BASKET": {
      let { products, details } = action.payload;
      return {
        ...state,
        cartItems: products,
        cartDetails: details,
      };
    }
    case "GET_PRODUCTS": {
      return {
        ...state,
      };
    }
    case "CLEAR_CARD": {
      return {
        ...state,
        cartItems: [],
        cartDetails: {},
      };
    }
  }
};

export default appReducer;
