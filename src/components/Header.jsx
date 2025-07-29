import React from "react";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // navigate('/login') không cần nữa vì App.jsx sẽ tự động xử lý
  };

  return (
    // Bỏ mb-4, thêm shadow để thanh thoát hơn
    <Navbar bg="white" expand="lg" className="border-bottom shadow-sm">
      <Container>
        <Navbar.Brand href="/">
          <strong>Vite CRUD</strong>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Navbar.Text className="me-3">Chào, {user?.name}!</Navbar.Text>
            <Button variant="outline-danger" size="sm" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
