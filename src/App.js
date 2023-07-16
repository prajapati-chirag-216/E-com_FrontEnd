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
const  Layout = lazy(()=>import( "./components/Dekstop/UI/Layout"))
const SignIn = lazy(()=>import("./pages/SignIn"))
const ProductsController= lazy(()=>import( "./pages/Products/ProductsController"))
const ViewProductsController= lazy(()=>import( "./pages/ProdutsView/ProductsViewController"))
const Signup= lazy(()=>import( "./pages/Signup"))
const Checkout= lazy(()=>import( "./pages/Checkout/Checkout"))
const MyCart= lazy(()=>import( "./components/Cart/MyCart/mycart.component"))
const ContactUs= lazy(()=>import( "./components/ContactUs/contactUs.component"))
const AboutUs= lazy(()=>import( "./components/AboutUs/AboutUs.component"))
const UserProfile= lazy(()=>import( "./components/UserProfile/UserProfile.component"))
const Information = lazy(()=>import( "./components/Checkout/Information/Information"))
const  Shipping =  lazy(()=>import("./components/Checkout/Shipping/Shipping"))
const Payment =  lazy(()=>import("./components/Checkout/Paymet/Payment"))
const  OrderStatus = lazy(()=> import("./components/UserProfile/MyOrders/OrderStatus"))
const Dashboard = lazy(() => import('./pages/Deshboard/Deshboard'))


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Wrapper />} errorElement={<Error />}>
      <Route path="/signup" element={
        <Suspense fallback={<LoadingSpinner />}>
          <Signup />
        </Suspense>
      } action={signupAction} />
      <Route path="/login" element={
        <Suspense fallback={<LoadingSpinner />}>
          <SignIn />
        </Suspense>
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
          <Suspense fallback={<LoadingSpinner />}>
            <Checkout />
          </Suspense>
        }>
          <Route index element={
            <Suspense fallback={<LoadingSpinner />}>
              <Information />
            </Suspense>
          } />
          <Route path="shipping" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Shipping />
            </Suspense>
          } />
          <Route path="payment" element={
            <Suspense fallback={<LoadingSpinner />}>
              <Payment />
            </Suspense>
          } />
        </Route>
      </Route>

      <Route element={
        <Suspense fallback={<LoadingSpinner />}>
          <Layout />
        </Suspense>
      }>
        <Route index element={
          <Suspense fallback={<LoadingSpinner />}>
            <Navigate to="/home" />
          </Suspense>
        } />
        <Route
          action={messageAction}
          path="/contactus"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ContactUs />
            </Suspense>

          }
        />
        <Route path="/aboutus" element={
          <Suspense fallback={<LoadingSpinner />}>
            <AboutUs />
          </Suspense>
        } />

        <Route path="/home" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Dashboard />
          </Suspense>
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
            <Suspense fallback={<LoadingSpinner />}>
              <UserProfile />
            </Suspense>
          } />
        </Route>
        <Route
          path="/product/:id"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProductsController />
            </Suspense>
          }
          loader={productLoader}
        />
        <Route
          path="/viewproduct/:id"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ViewProductsController />
            </Suspense>
          }
          action={reviewAction}
          loader={productViewLoader}
        />
        <Route path="/cart" element={
          <Suspense fallback={<LoadingSpinner />}>
            <MyCart />
          </Suspense>
        } />
        <Route path="/orderStatus/:id" element={
          <Suspense fallback={<LoadingSpinner />}>
            <OrderStatus />
          </Suspense>
        } />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />} >
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App;
