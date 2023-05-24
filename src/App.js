import Dashboard from "./pages/Deshboard/Deshboard";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Fragment } from "react";
import Layout from "./components/Dekstop/UI/Layout";
import SignIn from "./pages/SignIn";
import { action as signinAction } from "./components/Dekstop/Form/SigninForm";
import { action as signupAction } from "./components/Dekstop/Form/SignupForm";
import { action as reviewAction } from "./components/ProductView/Review";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { action as resetPasswordAction } from "./components/Dekstop/Form/ResetPasswordForm";
import { action as forgotPasswordAction } from "./components/Dekstop/Form/ForgotPasswordForm";
import PrivateRoutes from "./routes/PrivateRoutes";
import Error from "./pages/Error/Error";
import Success from "./pages/Success/Success";
import Wrapper from "./components/Dekstop/UI/Wrapper";
import "./App.css";
import ProductsController from "./pages/Products/ProductsController";
import ViewProductsController from "./pages/ProdutsView/ProductsViewController";
import { loader as categoryLoader } from "./components/Dekstop/Category/Categories";
import { loader as productLoader } from "./components/ProductsController/Items/Items";
import { loader as productViewLoader } from "./components/ProductView/ProductView";
import CheckOut from "./components/CheckOut/checkout.component";
import Signup from "./pages/Deshboard/Signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Wrapper />} errorElement={<Error />}>
      <Route path="/signup" element={<Signup />} action={signupAction} />
      <Route path="/login" element={<SignIn />} action={signinAction} />
      <Route
        path="/forgotPassword"
        element={<ForgotPassword />}
        action={forgotPasswordAction}
      />
      <Route
        path="/resetPassword/:id"
        element={<ResetPassword />}
        action={resetPasswordAction}
      />
      <Route
        element={
          <PrivateRoutes message="Access denied! You don't have permissions for this page." />
        }
      >
        <Route path="/success" element={<Success />} />
      </Route>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home" element={<Dashboard />} loader={categoryLoader} />
        <Route
          path="/product/:id"
          element={<ProductsController />}
          loader={productLoader}
        />
        <Route
          path="/viewproduct/:id"
          element={<ViewProductsController />}
          action={reviewAction}
          loader={productViewLoader}
        />
        <Route path="/checkout" element={<CheckOut />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
