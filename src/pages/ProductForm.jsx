import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { getProductById, createProduct, updateProduct } from "../services/api";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      getProductById(id).then((response) => setProduct(response.data));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateProduct(id, product);
    } else {
      await createProduct(product);
    }
    navigate("/");
  };

  return (
    <Card>
      <Card.Header>
        {isEditing ? "Chỉnh sửa Sản phẩm" : "Thêm Sản phẩm mới"}
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Giá (VNĐ)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {isEditing ? "Cập nhật" : "Thêm mới"}
          </Button>
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate("/")}
          >
            Hủy
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProductForm;
