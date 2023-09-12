import React, { useContext, useState } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './rabbit.css';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
    selectedProducts,
    selectedCard,
    cardContent,
  } = state;
  const [showProductContent, setShowProductContent] = useState({});

  const toggleProductContent = (itemId) => {
    setShowProductContent((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(
      `https://last-hx4j.onrender.com/api/products/${item._id}`
    );
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    //如果沒有登入，就導向登入頁面 並且把redirect的值設定為shipping
    //三元表達 如果singin是true 就執行signin?redirect=/shipping
    navigate('/signin?redirect=/shipping');
  };

return (
    <div className=''>
      <Helmet>
        <title>購物車內容</title>
      </Helmet>
      <h1>購物車內容</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
          <div className='allForRabbit  '>
            
            <div className="clouds"></div>
<div className='rabbit'></div>
{/* <div className="clouds"></div> */}

{/* <div className='rabbit'></div> */}
{/* <div className="clouds"></div> */}

{/* <div className='rabbit'></div> */}
{/* <div className="clouds"></div> */}
<br/>
            <div className='carp'>購物車目前空空的，快點去挑選喜歡的產品</div>
            </div>

          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                        onClick={() => {
                          if (item.isGiftBox) {
                            toggleProductContent(item._id);
                          }
                        }}
                      />
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>NT$&nbsp;{item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                  {item.isGiftBox && showProductContent[item._id] && (
                    <div>
                      <h4>禮盒內容：</h4>
                      {selectedProducts.map((selectedProduct) => (
                        <div
                          key={selectedProduct._id}
                          className="product-details"
                        >
                          <img
                            src={selectedProduct.image}
                            alt={`selected product ${selectedProduct._id}`}
                          />
                          <h4>{selectedProduct.slug}</h4>
                          {/* <p>介紹：{selectedProduct.description}</p> */}
                        </div>
                      ))}
                      <h4>卡片內容：</h4>
                      <p>{selectedCard}</p>
                      <p>{cardContent}</p>
                    </div>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    商品數量 ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    件) : NT$&nbsp;
                    {cartItems.reduce(
                      (a, c) => a + c.price * c.quantity,
                      0
                    )}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      onClick={checkoutHandler}
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                    >
                      前往結帳
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

