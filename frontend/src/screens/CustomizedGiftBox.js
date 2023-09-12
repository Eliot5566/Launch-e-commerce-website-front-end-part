import React, { useEffect } from 'react';
import { Row, Col, Card, ListGroup, Form } from 'react-bootstrap';
import fourBoxImage from '../images/four_boxBodyIn_0.png';
import sixBoxImage from '../images/six_boxBodyIn_0.png';
import nineBoxImage from '../images/nine_boxBodyIn_0.png';
import { useState } from 'react';
import { useContext } from 'react';
import { Store } from '../Store';
import { Link } from 'react-router-dom';

import 'animate.css';

function ProgressBar() {
  // const { data } = useContext(ProgressContext);
  // const [CurrentStep, setCurrentStep] = useState(1);
  return (
    <>
      <div className="container">
        <ul
          className="progress bg-body "
          style={{ padding: '5rem', fontSize: '1em' }}
        >
          <li className="active">選擇規格</li>
          <li className="">選擇商品</li>
          <li className="">貼心小卡</li>
          <li className="">確認內容</li>
        </ul>
      </div>
    </>
  );
}

export default function CustomizedGiftBox() {
  const { state, dispatch } = useContext(Store);


  const [selectedBox, setSelectedBox] = useState('null');
  const [showNextButton, setShowNextButton] = useState(false);
  const handleBoxChange = (option) => {
    setSelectedBox(option);
    setShowNextButton(true);
    console.log(selectedBox);
    // 點選禮盒後 添加 動畫
  };

  useEffect(() => {
    dispatch({ type: 'SET_SELECTED_BOX_SIZE', payload: selectedBox });
  }, [dispatch, selectedBox]);

  return (
    <div>
      <Row>
        <Col md={12}>
          <ProgressBar />
          <Row>
            {/* //新增區域 放置下一步按鈕 */}
            <Col className="text-center mb-3" style={{ minHeight: '55px' }}>
              {showNextButton && (
                <div
                  className="d-flex justify-content-end align-items-center"
                  style={{ height: '100%' }}
                >
                  <button className="btn-color">
                    <Link
                      to={`/select-content/${selectedBox}`}
                      className="btn-color"
                    >
                      下一步
                    </Link>
                  </button>
                </div>
              )}
            </Col>
          </Row>

          <Row>
            <Col className="text-center mb-3">
              <p>四格小資組合</p>
              <p>NT$480</p>
              <label>
                <div className="d-flex flex-column align-items-center mt-3">
                  <img
                    src={fourBoxImage}
                    alt="四格小資組合"
                    height="200vh"
                    onClick={() => handleBoxChange('four')}
                    className={`box-image ${
                      selectedBox === 'four'
                        ? 'animate__animated animate__pulse animate__infinite infinite'
                        : ''
                    }`}
                  />
                  <Form.Check
                    type="radio"
                    label="四格小資組合  NT$480"
                    price="480"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    style={{ display: 'none' }}
                  />
                </div>
              </label>
            </Col>
            <Col className="text-center mb-3">
              <p>六格家庭組合</p>
              <p>NT$680</p>
              <label>
                <div className="d-flex flex-column align-items-center mt-3">
                  <img
                    src={sixBoxImage}
                    alt="六格家庭組合"
                    height="200vh"
                    onClick={() => handleBoxChange('six')}
                    className={`box-image ${
                      selectedBox === 'six'
                        ? 'animate__animated animate__pulse animate__infinite infinite'
                        : ''
                    }`}
                  />

                  <Form.Check
                    type="radio"
                    label="六格家庭組合  NT$680"
                    price="680"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    style={{ display: 'none' }}
                  />
                </div>
              </label>
            </Col>
            <Col className="text-center mb-3">
              <p>九格派對組合</p>
              <p>NT$980</p>
              <label>
                <div className="d-flex flex-column align-items-center mt-3">
                  <img
                    src={nineBoxImage}
                    alt="九格派對組合"
                    height="270vh"
                    onClick={() => handleBoxChange('nine')}
                    className={`box-image ${
                      selectedBox === 'nine'
                        ? 'animate__animated animate__pulse animate__infinite infinite'
                        : ''
                    }`}
                  />

                  <Form.Check
                    type="radio"
                    label="九格派對組合  NT$980"
                    price="980"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    style={{ display: 'none' }}
                  />
                </div>
              </label>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
