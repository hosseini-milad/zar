import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import router from "./router";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />;
      <ToastContainer rtl />
    </>
  );
};

export default App;
