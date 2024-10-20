import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddItemForSale: React.FC = () => {
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [category, setCategory] = useState(''); 
  const [condition, setCondition] = useState(''); 
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Store uploaded image URLs

  const categories = ['TEXTBOOK', 'ELECTRONICS'];
  const conditions = ['NEW', 'USED', 'LIKE NEW'];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Cloudinary widget setup
  const openWidget = () => {
    // @ts-ignore
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'dujgpi0qi', // Replace with your Cloudinary cloud name
        uploadPreset: 'rm3qgodq', // Replace with your upload preset
        sources: ['local', 'url', 'camera'],
        multiple: true,
        resourceType: 'image',
        folder: 'add-item', // Specify folder in Cloudinary, adjust as needed
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          // Handle successful uploads
          setImageUrls((prevUrls) => [...prevUrls, result.info.secure_url]);
        }
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate inputs before submission
    if (!productName || !description || !category || !condition || imageUrls.length === 0) {
      alert("Please fill in all the fields and upload an image.");
      return;
    }

    // Submit form data (for now, we'll just log it to the console)
    const formData = {
      productName,
      description,
      category,
      condition,
      imageUrls,
    };

    console.log("Form Submitted with the following data:", formData);
    alert("Form Submitted Successfully!");

    // Reset form fields after submission
    setProductName('');
    setDescription('');
    setCategory('');
    setCondition('');
    setImageUrls([]);

    handleClose(); // Close the modal after submission
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Item for Sale
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add an Item for Sale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="productName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="condition">
                  <Form.Label>Condition</Form.Label>
                  <Form.Select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    <option value="">Select Condition</option>
                    {conditions.map((cond, index) => (
                      <option key={index} value={cond}>
                        {cond}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group controlId="imageUpload">
                  <Form.Label>Upload Image Files</Form.Label>
                  <Button variant="primary" onClick={openWidget}>
                    Upload Images
                  </Button>
                </Form.Group>
              </Col>
            </Row>

            {/* Display uploaded images */}
            <Row>
              {imageUrls.map((url, index) => (
                <Col key={index} md={4}>
                  <img src={url} alt={`Uploaded ${index}`} style={{ width: '100%' }} />
                </Col>
              ))}
            </Row>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddItemForSale;
