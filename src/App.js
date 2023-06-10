import Dashboard from "./pages/Deshboard/Deshboard";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
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
import ProductsController from "./pages/Products/ProductsController";
import ViewProductsController from "./pages/ProdutsView/ProductsViewController";
import { loader as categoryLoader } from "./components/Dekstop/Category/Categories";
import { loader as productLoader } from "./components/ProductsController/Items/Items";
import { loader as productViewLoader } from "./components/ProductView/ProductView";
import Signup from "./pages/Deshboard/Signup";
import Checkout from "./pages/Checkout/Checkout";
import MyCart from "./components/Cart/MyCart/mycart.component";
import "./App.css";
import ProtectedRoutes, {
  loader as profileLoader,
} from "./routes/ProtectedRoutes";

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
          <ProtectedRoutes message="Access denied! You don't have permissions for this page." />
        }
      >
        <Route path="/success" element={<Success />} />
      </Route>
      <Route
        element={
          <ProtectedRoutes message="Access denied! You don't have permissions for this page." />
        }
        loader={profileLoader}
      >
        <Route path="/checkout" element={<Checkout />} />
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
        <Route path="/cart" element={<MyCart />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
