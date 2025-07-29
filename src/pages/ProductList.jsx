import React, { useState, useEffect, useMemo } from "react";
import { Table, Button, Form, InputGroup, Card } from "react-bootstrap";
import { getProducts, deleteProduct } from "../services/api";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data.reverse());
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Quản lý Sản phẩm</h2>
          <Link to="/add">
            <Button variant="primary">Thêm mới</Button>
          </Link>
        </div>
      </Card.Header>
      <Card.Body>
        <InputGroup className="mb-4">
          {" "}
          {/* Tăng khoảng cách dưới ô tìm kiếm */}
          <Form.Control
            placeholder="Tìm kiếm theo tên sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Mô tả</th>
              <th className="text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>
                  {new Intl.NumberFormat("vi-VN").format(product.price)} VNĐ
                </td>
                <td>{product.description}</td>
                <td className="text-center">
                  <Link
                    to={`/edit/${product.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Sửa
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ProductList;
