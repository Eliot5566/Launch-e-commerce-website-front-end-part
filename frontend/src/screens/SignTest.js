import React, { useState } from 'react';
import './SignTest.css';
import signimg from '../images/sign1.jpg';
import signimg2 from '../images/sign2.jpg';
import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';

export default function SignTest() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmpwd, setConfirmPwd] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (pwd !== confirmpwd) {
      toast.error('密碼不一致');
      return;
    }
    try {
      const { data } = await Axios.post('https://last-hx4j.onrender.com/api/users/signup', {
        name,
        email,
        pwd,
      });

      // 在注册成功后，将用户令牌存储在本地存储中
      localStorage.setItem('userInfo', JSON.stringify(data));

      // ctxDispatch 是 Store.js 中的 dispatch 函数
      // 用来更新 Store.js 中的 state userInfo
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });

      //ctxDispatch是Store.js裡的dispatch function
      //用來更新Store.js裡的state userInfo
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const submitHandlerSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('https://last-hx4j.onrender.com/api/users/signin', {
        email,
        pwd,
      });
      //ctxDispatch是Store.js裡的dispatch function
      //用來更新Store.js裡的state userInfo
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      //為甚麼要存放在localStorage? 因為如果不存放在localStorage userInfo會消失
      //每次重新整理頁面都會導致userInfo消失，因為重新整理頁面會導致 Store.js裡的state重置
      //data 是一個物件，裡面有name、email、isAdmin、token四個屬性 (來自於api/users/signin)

      navigate(redirect || '/');
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      // 如果userInfo有值就導向redirect (redirect是一個字串)
    }
  }, [navigate, redirect, userInfo]);
  return (
    <>
      <div className="signcontainer ">
        <div className="welcome">
          <div
            className="pinkbox"
            style={{
              transform: isSignIn ? 'translateX(0%)' : 'translateX(80%)',
            }}
          >
            {isSignIn ? (
              <div className="signin">
                <h1 className="signh1">登入</h1>
                <form
                  className="more-padding signform"
                  autoComplete="off"
                  onClick={submitHandlerSignIn}
                >
                  <input
                    className="signinput"
                    type="email"
                    required
                    placeholder="帳號"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <input
                    className="signinput"
                    type="password"
                    required
                    onChange={(e) => setPwd(e.target.value)}
                    placeholder="密碼"
                  />
                  {/* <div className="checkbox">
                  <input className="signinput" type="checkbox" id="remember" />
                  <label htmlFor="remember">remember me</label>
                </div> */}
                  <button className="signbutton " type="submit">
                    確認
                  </button>
                </form>
              </div>
            ) : (
              <div className="signup">
                <h1 className="signh1">註冊</h1>
                <form
                  className="signform"
                  autoComplete="off"
                  onSubmit={submitHandler}
                >
                  <input
                    className="signinput"
                    type="text"
                    placeholder="用戶名稱"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="signinput"
                    type="email"
                    placeholder="帳號 (信箱)"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="signinput"
                    type="password"
                    placeholder="密碼"
                    required
                    onChange={(e) => setPwd(e.target.value)}
                  />
                  <input
                    className="signinput"
                    type="password"
                    placeholder="確認密碼"
                    required
                    onChange={(e) => setConfirmPwd(e.target.value)}
                  />
                  <button className="signbutton signsubmit" type="submit">
                    確認
                  </button>
                </form>
              </div>
            )}
          </div>
          <div className="leftbox">
            <h2 className="signtitle">
              <span className="signspan">Japanes</span>&amp;
              <br />
              Sweets
            </h2>
            <p id="signp" className="signdesc">
              Satisfy your <span className="signspan">taste buds</span>
            </p>
            <img
              className="flower smaller"
              src={signimg}
              alt="1357d638624297b"
              border={0}
            />
            <p id="signp" className="signaccount">
              已經有帳號了嗎?
            </p>
            <button className="signbutton" onClick={toggleForm}>
              {isSignIn ? '登入' : '登入'}
            </button>
          </div>
          <div className="rightbox">
            <h2 className="signtitle">
              <span className="signspan">Japanes</span>&amp;
              <br />
              Sweets
            </h2>
            <p id="signp" className="signdesc">
              {' '}
              Satisfy your <span className="signspan">taste buds</span>
            </p>
            <img className="flower" src={signimg2} alt="" />
            <p id="signp" className="signaccount">
              還沒有帳號嗎?
            </p>
            <button className="signbutton" onClick={toggleForm}>
              {isSignIn ? '註冊' : '註冊'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
