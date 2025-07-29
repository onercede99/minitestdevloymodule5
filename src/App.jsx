import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";

function AppLayout() {
  const { isAuthenticated } = useAuth();

  // Trang Login sẽ có layout riêng (căn giữa toàn màn hình)
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Nếu chưa login mà vào trang khác thì đá về login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // Layout chính cho ứng dụng khi đã đăng nhập
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content container">
        {" "}
        {/* Dùng container để giới hạn độ rộng */}
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<ProductForm />} />
            <Route path="/edit/:id" element={<ProductForm />} />
          </Route>
          {/* Nếu đã login mà vào /login thì đá về trang chủ */}
          <Route path="/login" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
