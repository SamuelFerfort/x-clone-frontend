import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
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
import PostView from "./Pages/PostView";
import Explore from "./Pages/Explore";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<X />}>
          <Route path="home" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          
          <Route path="profile" element={<Profile />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path=":handler/status/:postId" element={<PostView />} />
          <Route path=":handler"  element={<Profile />}/>
        </Route>
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
