import { createBrowserRouter } from "react-router-dom";
import WebLayout from "../layouts/web/WebLayout";
import Home from "../pages/Home/Home";
import NotFound from "../components/NotFound/NotFound";
import Products from "../pages/Products/Products";
import ProductLists from "../pages/ProductLists/ProductLists";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: ":cat/:product",
        element: <ProductLists />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Router;
