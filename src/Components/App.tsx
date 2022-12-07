import Home from "./pages/Home/Home";
import NavBar from "./NavBar/NavBar";
import { useEffect } from "react";
import "./style/App.css";
import ErrorBoundary from "./BaseComponents/ErrorBoundary";
import auth from "../lib/auth";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search";
import { userSlice } from "../store/reducers/UserSlice";
import UserData from "../Types/userData";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { setUser } = userSlice.actions;

  useEffect(() => {
    auth.getUserUid((newUser: UserData | null | undefined) =>
      dispatch(setUser(newUser))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ErrorBoundary>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/profile/:profileUid" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

export default App;
