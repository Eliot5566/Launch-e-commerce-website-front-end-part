import {
  BrowserRouter,
  Link,
  Route,
  Router,
  Routes,
  Switch,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SignScreen';
import ShippingAddress from './screens/ShippingAddress';
import SignupScreen from './screens/SignUp';
import PaymentMethod from './screens/PaymentMethod';
import PlaceOrder from './screens/PlaceOrder';
import OrderScreen from './screens/OrderScreen';
import CustomizedGiftBox from './screens/CustomizedGiftBox';
import SelectContentFour from './screens/SelectContentFour';
import SelectContentSix from './screens/SelectContentSix';
import SelectContentNine from './screens/SelectContentNine';
import CategoryPage from './screens//categoryPage';
import Product from './screens/Product';
import GiftCard from './screens/GiftCard';
import GiftCard6 from './screens/GiftCard6';
import GiftCard9 from './screens/GiftCard9';
import GiftBoxDetails from './components/GiftBoxDetails.js';
import GiftBoxDetails6 from './components/GiftBoxDetails6.js';
import GiftBoxDetails9 from './components/GiftBoxDetails9.js';
import Sub from './screens/Sub';


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo, giftBoxQuantity } = state;
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // 计算购物车中的物品数量，包括禮盒
    const itemCount =
      cart.cartItems.reduce((count, item) => count + (item.quantity || 0), 0) 
      

    // 更新购物车物品数量状态
    setCartItemCount(itemCount);
  }, [cart, giftBoxQuantity]);
  const signoutHandler = () => {
    //ctxDispatch是Store.js裡的dispatch function
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');

    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header className="mb-5">
          <Navbar bg="" variant="">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand >首頁</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  購物車
                  {cartItemCount > 0 && (
                    <Badge pill bg="danger">
                      {cartItemCount}
                    </Badge>
                  )}
                </Link>
                <Link className="nav-link me-auto" to="giftbox">
                  客製禮盒
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>使用者資料</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>歷史訂單</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />

                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      登出
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    登入
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<CategoryPage />} />
              <Route path="/product/:_id" element={<Product />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/placeorder" element={<PlaceOrder />} />
              <Route path="/order/:id" element={<OrderScreen />} />

              <Route path="/shipping" element={<ShippingAddress />} />
              <Route path="/payment" element={<PaymentMethod />} />
              <Route path="/giftbox" element={<CustomizedGiftBox />} />
              <Route path="/giftcard" element={<GiftCard />} />
              <Route path="/giftcard6" element={<GiftCard6 />} />
              <Route path="/giftcard9" element={<GiftCard9 />} />
              {/* <Route path="/sub" element={<Sub />} /> */}
          
              <Route path="/cardboxdetail" element={<GiftBoxDetails />} />
              <Route path="/cardboxdetail6" element={<GiftBoxDetails6 />} />
              <Route path="/cardboxdetail9" element={<GiftBoxDetails9 />} />

              <Route path="/test" element={<HomeScreen />} />
              <Route
                path="/select-content/four"
                element={<SelectContentFour />}
              />
              <Route
                path="/select-content/six"
                element={<SelectContentSix />}
              />
              <Route
                path="/select-content/nine"
                element={<SelectContentNine />}
              />
            </Routes>
          </Container>
        </main>
        <footer>

        <Sub />
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
export default App;
