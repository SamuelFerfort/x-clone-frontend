import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import X from "./Pages/X";
import AuthLayout from "./Components/AuthLayout";
import ProtectedLayout from "./Components/ProtectedLayout";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Bookmarks from "./Pages/Bookmarks";
import ErrorBoundary from "./Pages/ErrorBoundary";
import NotFound from "./Pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<ErrorBoundary />}>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<X />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
