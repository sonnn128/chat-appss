import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Register from "./pages/Register"; // Viết hoa chữ 'R' cho nhất quán với file khác
import { ToastContainer } from "react-toastify";
import Settings from "./pages/settings";

function App() {
  const user = null; // Đây có thể là state hoặc lấy từ context

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={!user ? <Main /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/settings"
            element={!user ? <Settings /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
