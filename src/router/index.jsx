import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainLayout/main-layout";
import UnhandledException from "@/pages/unhandledException";
import NotFound from "@/pages/notFound/index";

//-------------------------------------------------- */
//Pages
import Home from "@/pages/home";
import Invoice from "@/pages/invoice";
import RepresentationRequest from "@/pages/representationRequest";
import AccountReport from "@/pages/accountReport";
import News from "@/pages/news";
import Basket from "@/pages/basket";
import Login from "@/pages/user/login";
import Order from "@/pages/user/order";
import ProductDetail from "@/pages/productDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <UnhandledException />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },
      {
        path: "representation-request",
        element: <RepresentationRequest />,
      },
      {
        path: "account-report",
        element: <AccountReport />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "gallery",
        element: <NotFound />,
      },
      {
        path: "basket",
        element: <Basket />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "order",
        element: <Order />,
      },
      
    ],
  },
  {
    path: "/product-detail/:productId",
    element: <ProductDetail />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  
]);

export default router;
