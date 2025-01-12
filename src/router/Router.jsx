import { createBrowserRouter } from "react-router-dom";
import WebLayout from "../layouts/web/WebLayout";
import Home from "../pages/Home/Home";
import NotFound from "../components/NotFound/NotFound";
import Products from "../pages/Products/Products";
import ProductLists from "../pages/ProductLists/ProductLists";
import PanelLayout from "../layouts/Panel/PanelLayout";
import PanelProfile from "../pages/PanelProfile/PanelProfile";
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
        path: "products/:cat/:product",
        element: <ProductLists />,
      },
    ],
  },
  {
    path: "/Dashboard",
    element: <PanelLayout />,
    children: [
      {
        index: true,
        element: <PanelProfile />,
      },
      {
        path: "Profile",
        element: <PanelProfile />,
      },
      {
        path: "NewProduct",
        element: <PanelProfile />,
      },
      {
        path: "ProductLists",
        element: <PanelProfile />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Router;
