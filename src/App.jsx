import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ErrorPage from "./Pages/ErrorPage";
import Detalis from "./Pages/Detalis";
import MainLayout from "./layout/MainLayout";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      if (!location.pathname.includes("register")) {
        navigate("/login");
      }
    }
  }, [location, navigate]);
  function Ozodbek({ isAuth, children }) {
    if (!isAuth) {
      navigate("/login");
    }

    return children;
  }
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Ozodbek isAuth={!!token}>
              <MainLayout>
                <Home />
              </MainLayout>
            </Ozodbek>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route
          path="/books/:id"
          element={
            <Ozodbek isAuth={!!token}>
              <MainLayout>
                <Detalis />
              </MainLayout>
            </Ozodbek>
          }
        ></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
