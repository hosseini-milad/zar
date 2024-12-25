import { createBrowserRouter } from "react-router-dom";
import WebLayout from "../layouts/web/WebLayout";
import Home from "../pages/Home/Home";
import NotFound from "../components/NotFound/NotFound";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: "invoice",
      //   element: <Invoice />,
      // },
      
    ],
  },
  
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Router;
