// GiftCard.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GiftBoxDetails from '../components/GiftBoxDetails';
import { Store } from '../Store.js';
import { useContext } from 'react';

function ProgressBar() {
  // const { data } = useContext(ProgressContext);
  // const [CurrentStep, setCurrentStep] = useState(1);
  return (
    <>
      <div className="container">
        <ul className="progress bg-body fs-5" style={{ padding: '5rem' }}>
          <li className="done">選擇規格</li>
          <li className="done">選擇商品</li>
          <li className="active">貼心小卡</li>
          <li className="">確認內容</li>
        </ul>
      </div>
    </>
  );
}

const GiftCard9 = () => {
  const { state, dispatch } = useContext(Store); // 使用全局状态和dispatch

  const { selectedCard, cardContent, isConfirmed } = state;

  const [newSelectedCard, setNewSelectedCard] = useState(selectedCard);
  const [newCardContent, setNewCardContent] = useState(cardContent);
  const navigate = useNavigate();

  const handleCardSelect = (card) => {
    setNewSelectedCard(card);
    dispatch({ type: 'UPDATE_SELECTED_CARD', payload: card });
  };

  const handleContentChange = (event) => {
    const content = event.target.value;
    setNewCardContent(content);
    dispatch({ type: 'UPDATE_CARD_CONTENT', payload: content });
  };

  const handleConfirm = () => {


   
    dispatch({ type: 'UPDATE_CONFIRMED' });
  };

  return (
    <div>
      <ProgressBar />
      <div>
        {/* 禮盒卡片选择区域 */}
        <h3>選擇禮盒卡片</h3>
        {/* 在这里显示禮盒卡片选项，您可以使用按钮或其他UI元素 */}
        <button onClick={() => handleCardSelect('Card1')}>卡片1</button>
        <button onClick={() => handleCardSelect('Card2')}>卡片2</button>
     
      </div>

      <div>
        {/* 禮盒卡片內容选择区域 */}
        <h3>填寫禮盒卡片內容</h3>
        {/* 在这里提供一个文本框 */}
        <textarea
          placeholder="輸入禮盒卡片內容"
          value={newCardContent}
          onChange={handleContentChange}
        ></textarea>
      </div>

      <div>
        <h3>確認禮盒卡片內容</h3>
        <p>已選擇的禮盒卡片: {newSelectedCard}</p>
        <p>禮盒卡片內容: {newCardContent}</p>
        {/* 确认按钮 */}
        請確認禮盒卡片內容正確無誤
        <button className='m-3' onClick={handleConfirm}>確定</button>
        {/* 显示确认消息 */}
        {isConfirmed && (
          <Link to="/cardboxdetail9">
            <button>下一步</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default GiftCard9;
