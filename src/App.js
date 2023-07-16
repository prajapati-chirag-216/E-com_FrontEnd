// import Dashboard from "./pages/Deshboard/Deshboard";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { action as signinAction } from "./components/Dekstop/Form/SigninForm";
import { action as signupAction } from "./components/Dekstop/Form/SignupForm";
import { action as reviewAction } from "./components/ProductView/Review";
import { action as resetPasswordAction } from "./components/Dekstop/Form/ResetPasswordForm";
import { action as forgotPasswordAction } from "./components/Dekstop/Form/ForgotPasswordForm";
import { action as messageAction } from "./components/ContactUs/contactUs.component";
import { loader as categoryLoader } from "./components/Dekstop/Category/Categories";
import { loader as productLoader } from "./components/ProductsController/Items/Items";
import { loader as productViewLoader } from "./components/ProductView/ProductView";
import ProtectedRoutes, {
  loader as profileLoader,
} from "./routes/ProtectedRoutes";
import LoadingSpinner from "./components/Dekstop/UI/LoadingSpinner";
import "./App.css";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoutes from "./routes/PrivateRoutes";
import Error from "./pages/Error/Error";
import Success from "./pages/Success/Success";
import Wrapper from "./components/Dekstop/UI/Wrapper";
// const  Layout = lazy(()=>import( "./components/Dekstop/UI/Layout"))
// const SignIn = lazy(()=>import("./pages/SignIn"))
// const ProductsController= lazy(()=>import( "./pages/Products/ProductsController"))
// const ViewProductsController= lazy(()=>import( "./pages/ProdutsView/ProductsViewController"))
// const Signup= lazy(()=>import( "./pages/Signup"))
// const Checkout= lazy(()=>import( "./pages/Checkout/Checkout"))
// const MyCart= lazy(()=>import( "./components/Cart/MyCart/mycart.component"))
// const ContactUs= lazy(()=>import( "./components/ContactUs/contactUs.component"))
// const AboutUs= lazy(()=>import( "./components/AboutUs/AboutUs.component"))
// const UserProfile= lazy(()=>import( "./components/UserProfile/UserProfile.component"))
// const Information = lazy(()=>import( "./components/Checkout/Information/Information"))
// const  Shipping =  lazy(()=>import("./components/Checkout/Shipping/Shipping"))
// const Payment =  lazy(()=>import("./components/Checkout/Paymet/Payment"))
// const  OrderStatus = lazy(()=> import("./components/UserProfile/MyOrders/OrderStatus"))
// const Dashboard = lazy(() => import('./pages/Deshboard/Deshboard'))
import  Layout from  "./components/Dekstop/UI/Layout"
import SignIn  from "./pages/SignIn"
import ProductsController from "./pages/Products/ProductsController"
import ViewProductsController from  "./pages/ProdutsView/ProductsViewController"
import Signup  from "./pages/Signup"
import Checkout from "./pages/Checkout/Checkout"
import MyCart from "./components/Cart/MyCart/mycart.component"
import ContactUs from "./components/ContactUs/contactUs.component"
import AboutUs from "./components/AboutUs/AboutUs.component"
import UserProfile from "./components/UserProfile/UserProfile.component"
import Information from  "./components/Checkout/Information/Information"
import  Shipping from"./components/Checkout/Shipping/Shipping"
import Payment from "./components/Checkout/Paymet/Payment"
import  OrderStatus from "./components/UserProfile/MyOrders/OrderStatus"
import Dashboard from './pages/Deshboard/Deshboard'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Wrapper />} errorElement={<Error />}>
      <Route path="/signup" element={
        // <Suspense fallback={<LoadingSpinner />}>
        // </Suspense>
          <Signup />
      } action={signupAction} />
      <Route path="/login" element={
        // <Suspense fallback={<LoadingSpinner />}>
        // </Suspense>
          <SignIn />
      } action={signinAction} />
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
        <Route path="/success" element={<Success forPasswordReset={true} />} />
      </Route>
      <Route
        element={
          <ProtectedRoutes message="Access denied! You don't have permissions for this page." />
        }
        loader={profileLoader}
      >
        <Route path="/checkout/" element={
          // <Suspense fallback={<LoadingSpinner />}>
          // </Suspense>
            <Checkout />
        }>
          <Route index element={
            // <Suspense fallback={<LoadingSpinner />}>
            // </Suspense>
              <Information />
          } />
          <Route path="shipping" element={
            // <Suspense fallback={<LoadingSpinner />}>
            // </Suspense>
              <Shipping />
          } />
          <Route path="payment" element={
            // <Suspense fallback={<LoadingSpinner />}>
            // </Suspense>
              <Payment />
          } />
        </Route>
      </Route>

      <Route element={
        // <Suspense fallback={<LoadingSpinner />}>
        // </Suspense>
          <Layout />
      }>
        <Route index element={
          // <Suspense fallback={<LoadingSpinner />}>
          // </Suspense>
            <Navigate to="/home" />
        } />
        <Route
          action={messageAction}
          path="/contactus"
          element={
            // <Suspense fallback={<LoadingSpinner />}>
            // </Suspense>
              <ContactUs />

          }
        />
        <Route path="/aboutus" element={
          // <Suspense fallback={<LoadingSpinner />}>
          // </Suspense>
            <AboutUs />
        } />

        <Route path="/home" element={
          // <Suspense fallback={<LoadingSpinner />}>
          // </Suspense>
            <Dashboard />
        } loader={categoryLoader} />

        <Route
          element={
            <ProtectedRoutes
              isProfilePage={true}
              message="Access denied! You don't have permissions for this page."
            />
          }
          loader={profileLoader}
        >
          <Route path="/myProfile" element={
            // <Suspense fallback={<LoadingSpinner />}>
            // </Suspense>
              <UserProfile />
          } />
        </Route>
        <Route
          path="/product/:id"
          element={
            // <Suspense fallback={<LoadingSpinner />}>
            // </Suspense>
              <ProductsController />
          }
          loader={productLoader}
        />
        <Route
          path="/viewproduct/:id"
          element={
            // <Suspense fallback={<LoadingSpinner />}>
            // </Suspense>
              <ViewProductsController />
          }
          action={reviewAction}
          loader={productViewLoader}
        />
        <Route path="/cart" element={
          // <Suspense fallback={<LoadingSpinner />}>
          // </Suspense>
            <MyCart />
        } />
        <Route path="/orderStatus/:id" element={
          // <Suspense fallback={<LoadingSpinner />}>
          // </Suspense>
            <OrderStatus />
        } />
      </Route>
    </Route>
  )
);

function App() {
  return (
    // <Suspense fallback={<LoadingSpinner />} >
      <RouterProvider router={router} />
    // </Suspense>
  )
}

export default App;
