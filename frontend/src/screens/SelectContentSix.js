// 导入其他必要的模块
import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logger from '../logger.js';
import GiftProducts from '../components/GiftProducts';
import { useReducer } from 'react';
import { useParams } from 'react-router-dom';
import transparent from '../images/transparent.png';
import GiftBoxDetails from '../components/GiftBoxDetails';
import { Store } from '../Store';
import { useContext } from 'react';

import 'animate.css';

function ProgressBar() {
  // const { data } = useContext(ProgressContext);
  // const [CurrentStep, setCurrentStep] = useState(1);
  return (
    <>
      <div className="container">
        <ul className="progress bg-body fs-5" style={{ padding: '5rem' }}>
          <li className="done">選擇規格</li>
          <li className="active">選擇商品</li>
          <li className="">貼心小卡</li>
          <li className="">確認內容</li>
        </ul>
      </div>
    </>
  );
}

export default function SelectContentSix() {
  const { state, dispatch } = useContext(Store);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { boxType } = useParams();
  const [isNextButtonVisible, setNextButtonVisible] = useState(false);
  const navigate = useNavigate();

  // 定义一个状态来存储产品数据
  const [products, setProducts] = useState([]);

  // 使用axios从API获取产品数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          'https://last-hx4j.onrender.com/api/products'
        );
        setProducts(result.data);
      } catch (err) {
        console.error('获取产品数据时出错：', err);
      }
    };
    fetchData();
  }, []);

  const handleProductSelect = (product) => {
    if (state.selectedProducts.length >= 6) {
      // 已选择的产品数量达到4个，显示错误提示
      alert('數量已達到上限！');
      return;
    }

    // 使用dispatch将产品添加到全局状态中
    dispatch({ type: 'ADD_SELECTED_PRODUCT', payload: { ...product, qty: 1 } });

    if (state.selectedProducts.length === 5) {
      setNextButtonVisible(true);
    }
  };

  const handleProductRemove = (product) => {
    // 使用dispatch将产品从全局状态中移除
    dispatch({ type: 'REMOVE_SELECTED_PRODUCT', payload: product });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleNextButtonClick = () => {
    const userResponse = window.confirm('是否需要加入禮盒卡片？');

    if (userResponse) {
      navigate(`/giftcard6`);
    } else {
      navigate(`/cardboxdetail6`);
    }
  };

  useEffect(() => {
    const selectedProductsTotalPrice = state.selectedProducts.reduce(
      (totalPrice, product) => {
        return totalPrice + product.price * product.qty;
      },
      0
    );

    // 更新禮盒價格到全局状态
    dispatch({
      type: 'UPDATE_GIFT_BOX_PRICE',
      payload: selectedProductsTotalPrice,
    });
  }, [state.selectedProducts, dispatch]);

  return (
    <div>
      <Row>
        <Col md={12}>
          <ProgressBar />
        </Col>
      </Row>
      <div className="selected-products ">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="next-button">
            {/* 導航回“giftbox”頁面 */}
            <Link to={`/giftbox`} className="btn-color">
              上一步
            </Link>
          </div>
          <div className="next-button">
            {isNextButtonVisible && (
              // 顯示“下一步”按鈕，點擊時觸發 handleNextButtonClick 函數
              <Button className="btn-color" onClick={handleNextButtonClick}>
                下一步
              </Button>
            )}
          </div>
        </div>
        <p>*點選商品添加至格子中</p>
        {/* <div className="selected-four-box d-flex justify-content-center"> */}
        <div className="selected-six-box">
          {Array.from({ length: 2 }).map((_, rowIndex) => (
            <div key={rowIndex} className="image-row">
              {[0, 1,2].map((colIndex) => {
                const selectedProduct =
                  state.selectedProducts[rowIndex * 3 + colIndex];
                return (
                  <img
                    key={colIndex}
                    src={selectedProduct?.product_package || transparent}
                    className="selected-product-image"
                    alt={`selected product ${rowIndex * 3 + colIndex}`}
                    onClick={() => handleProductRemove(selectedProduct)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="category-buttons m-3 text-center">
        <button
          className={
            selectedCategory === '全部'
              ? 'btn-color me-2'
              : 'btn-cat-color me-2'
          }
          onClick={() => handleCategoryChange('all')}
        >
          所有商品
        </button>
        <button
          className={
            selectedCategory === '銅鑼燒'
              ? 'btn-color me-2'
              : 'btn-cat-color me-2'
          }
          onClick={() => handleCategoryChange('銅鑼燒')}
        >
          銅鑼燒
        </button>
        <button
          className={
            selectedCategory === '饅頭'
              ? 'btn-color me-2'
              : 'btn-cat-color me-2'
          }
          onClick={() => handleCategoryChange('饅頭')}
        >
          饅頭
        </button>
        <button
          className={
            selectedCategory === '大福'
              ? 'btn-color me-2'
              : 'btn-cat-color me-2'
          }
          onClick={() => handleCategoryChange('大福')}
        >
          大福
        </button>
        <button
          className={
            selectedCategory === '羊羹'
              ? 'btn-color me-2'
              : 'btn-cat-color me-2'
          }
          onClick={() => handleCategoryChange('羊羹')}
        >
          羊羹
        </button>
        <button
          className={
            selectedCategory === '水饅頭'
              ? 'btn-color me-2'
              : 'btn-cat-color me-2'
          }
          onClick={() => handleCategoryChange('水饅頭')}
        >
          水饅頭
        </button>
      </div>
      <Row>
        {products
          .filter((product) =>
            selectedCategory === 'all'
              ? true
              : product.category === selectedCategory
          )
          .map((product) => (
            <Col
              key={product.slug}
              sm={6}
              md={4}
              lg={3}
              className="mb-3 giftPitcure"
              onClick={() => handleProductSelect(product)}
            >
              <GiftProducts product={product} />
            </Col>
          ))}
      </Row>
    </div>
  );
}
