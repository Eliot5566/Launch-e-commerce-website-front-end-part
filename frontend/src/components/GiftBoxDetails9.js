//9格禮盒專用
import React, { useContext, useEffect } from 'react';
import { Store } from '../Store';

export default function GiftBoxDetails9() {
  const { state, dispatch } = useContext(Store);

  const {
    selectedProducts,
    selectedCard,
    cardContent,
    _id,
    cart: { cartItems },
    giftBox, // 添加禮盒訊息
    giftBoxQuantity, // 添加禮盒數量
  } = state;

  
  // 在组件加载时从本地存储中加载之前存放的禮盒資料
  useEffect(() => {
    const storedGiftBox = localStorage.getItem('giftBox');
    const storedGiftBoxQuantity = localStorage.getItem('giftBoxQuantity');

    if (storedGiftBox) {
      // 如果之前存放的禮盒資料存在，則加载到state中
      dispatch({
        type: 'UPDATE_CART_GIFT_BOX',
        payload: JSON.parse(storedGiftBox),
      });
    }

    if (storedGiftBoxQuantity) {
      // 如果之前存放的禮盒數量存在，則加载到state中
      dispatch({
        type: 'UPDATE_GIFT_BOX_QUANTITY',
        payload: parseInt(storedGiftBoxQuantity),
      });
    }
  }, [dispatch]);

  const addToCart = (giftBoxId) => {
    // 根据礼盒 ID 设置礼盒的信息
    let giftBox = {};
    if (giftBoxId === 20) {
      // 设置 4 格礼盒的信息
      giftBox = {
        _id: 20,
        name: '4格禮盒',
        image: '/images/four_gift.png'  ,
        price: 200,
        quantity: 1,
        isGiftBox: true, // 添加一个标志，表示是禮盒产品
      };
    } else if (giftBoxId === 21) {
      // 设置 6 格礼盒的信息
      giftBox = {
        _id: 21,
        name: '6格禮盒',
        image: '路径/到/6格禮盒图片',
        price: 300,
        quantity: 1,
        isGiftBox: true, // 添加一个标志，表示是禮盒产品
      };
    } else if (giftBoxId === 22) {
      // 设置 9 格礼盒的信息
      giftBox = {
        _id: 22,
        name: '9格禮盒',
        image: '/images/nine_gift.png',
        price: 450,
        quantity: 1,
        isGiftBox: true, // 添加一个标志，表示是禮盒产品
      };
    }
  
    // 增加禮盒數量
    dispatch({ type: 'ADD_GIFT_BOX' });
  
    // 更新禮盒資料到本地存儲
    localStorage.setItem('giftBox', JSON.stringify(giftBox));
    localStorage.setItem('giftBoxQuantity', giftBoxQuantity.toString());
  
    // 添加禮盒到購物車，並传递 _id
    dispatch({ type: 'CART_ADD_ITEM', payload: giftBox });
  
    // 更新購物車中的禮盒信息
    dispatch({
      type: 'UPDATE_CART_GIFT_BOX',
      payload: giftBox,
    });
    console.log(giftBox);
  
    // 更新 totalItems 和 cartCount，包括禮盒數量
    const updatedTotalItems =
      cartItems.reduce((acc, item) => {
        const itemQuantity = item.quantity || 0;
        return acc + itemQuantity;
      }, 0) + giftBoxQuantity;
  
    const updatedCartCount = cartItems.length + giftBoxQuantity;
  
    // 更新 totalItems 和 cartCount 的值
    dispatch({
      type: 'UPDATE_TOTAL_ITEMS',
      payload: updatedTotalItems,
    });
  
    dispatch({
      type: 'UPDATE_CART_COUNT',
      payload: updatedCartCount,
    });
  };


  return (
    <div>
      <h3>已選擇的商品</h3>
      <div className="selected-nine-box text-center">
        {/* 渲染选定的产品信息 */}
        {selectedProducts.map((selectedProduct) => (
          <img
            key={selectedProduct._id}
            src={selectedProduct.product_package}
            className="selected-product-image"
            alt={`selected product ${selectedProduct._id}`}
          />
        ))}
      </div>

      <hr />

      <div className=" ">
        {/* 渲染选定的产品信息 */}
        {selectedProducts.map((selectedProduct) => (
          <div key={selectedProduct._id} className="product-details">
            <img
              src={selectedProduct.product_package}
              className="selected-product-image"
              alt={`selected product ${selectedProduct._id}`}
            />
            <h4>{selectedProduct.name}</h4>
            <p>描述：{selectedProduct.description}</p>
          </div>
        ))}
      </div>

      <hr />
      <div>
        {/* 显示用户选择的卡片样式和内容 */}
        <h3>選擇的卡片樣式</h3>
        <p>{selectedCard}</p>

        <h3>卡片內容</h3>
        <p>{cardContent}</p>
      </div>

      {/* 添加禮盒到购物车的按钮 */}
      <button onClick={() => addToCart(22)}>將禮盒添加到購物車</button>
    </div>
  );
}

