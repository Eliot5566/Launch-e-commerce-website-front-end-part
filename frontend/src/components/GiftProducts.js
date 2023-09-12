import Button from 'react-bootstrap/Button';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './product.css';
import './GiftProducts.css';

import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function GiftProducts(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(
      `https://last-hx4j.onrender.com/${item._id}`
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
  if (product._id === 20 || product._id === 21 || product._id === 22) {
    return null;
  }
  return (
    <div className="gift-product">
      <img src={product.gift_product} className="card-img-tops" alt={product.name} />
      <p className="product-name">{product.name}</p>
      <Button onClick={() => addToCartHandler(product)}>+</Button>
    </div>
  );
}

export default GiftProducts;

