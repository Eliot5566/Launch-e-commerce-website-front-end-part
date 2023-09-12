import { createContext, useReducer } from 'react';
export const Store = createContext();

// initialsSte是一個物件，裡面有userInfo和cart兩個屬性
const initialState = {
  selectedBoxSize: null, // 用户选择的盒子大小
  giftBoxPrice: 0, // 禮盒的价格
  giftBoxQuantity: 0, // 禮盒的數量
  selectedProducts: [], // 用户选择的产品
  selectedCard: '', // 用户选择的卡片
  cardContent: '', // 卡片內容
  isConfirmed: false, // 是否已确认卡片內容
  // giftBox: [], // 添加空的 giftBox 属性
  // userInfo是一個物件，裡面有name、email、isAdmin、token四個屬性
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  // cartItems是一個陣列，裡面放的是物件
  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},

    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
    //這段是從CartScreen.js的useEffect裡面來的
    //用來更新Store.js裡的state cart cartItems
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    itemSum: 0,
    itemsPrice: 0,

    // itemsPrice: cartItems.reduce((a, c) => a + c.price * c.qty, 0),
    // shippingPrice: itemsPrice > 100 ? 0 : 10,

   
    // totalPrice: itemsPrice + shippingPrice + giftBoxPrice,
    // totalPrice: itemsPrice,
    // shippingAddress: localStorage.getItem('shippingAddress')
    //   ? JSON.parse(localStorage.getItem('shippingAddress'))
    //   : {},
    // paymentMethod: localStorage.getItem('paymentMethod')
    //   ? localStorage.getItem('paymentMethod')
    //   : '',
    // cartItems: localStorage.getItem('cartItems')
    //   ? JSON.parse(localStorage.getItem('cartItems'))
    //   : [],

    // 請正確設置itemsPrice 確保加入訂單 不會出現NaN

    
    giftBox: {
      name: 'Custom Gift Box',
      image: '',
      price: 0,
      quantity: 0,
      _id:20,
      
    }, // 添加空的 giftBox 属性
  },
};
// reducer是一個函式，裡面有兩個參數，state和action
function reducer(state, action) {
  // 這裡的action是一個物件，裡面有type和payload兩個屬性
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // add to cart
      // newItem是一個物件，裡面有_id、name、image、price、countInStock、qty六個屬性
      //action.payload來自於CartScreen.js的dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, qty } });
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    // case 'USER_SIGNIN':
    //   // 将用户信息和令牌添加到 userInfo 对象中
    //   const { name, email, isAdmin, token } = action.payload;
    //   const userInfo = {
    //     name,
    //     email,
    //     isAdmin,
    //     token,
    //   };

    //   // 将 userInfo 存储到本地存储
    //   localStorage.setItem('userInfo', JSON.stringify(userInfo));

    // return { ...state, userInfo };
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
      };
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    case 'ADD_SELECTED_PRODUCT':
      return {
        ...state,
        selectedProducts: [...state.selectedProducts, action.payload],
      };
    case 'REMOVE_SELECTED_PRODUCT':
      return {
        ...state,
        selectedProducts: state.selectedProducts.filter(
          (product) => product._id !== action.payload._id
        ),
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case 'UPDATE_SELECTED_CARD':
      return {
        ...state,
        selectedCard: action.payload,
      };
    case 'UPDATE_CARD_CONTENT':
      return {
        ...state,
        cardContent: action.payload,
      };
    case 'UPDATE_CONFIRMED':
      return {
        ...state,
        isConfirmed: true,
      };
    case 'UPDATE_GIFT_BOX_PRICE':
      // 更新禮盒價格
      return {
        ...state,
        giftBox: {
          ...state.giftBox,
          price: action.payload,
        },
      };
    case 'UPDATE_GIFT_BOX_QUANTITY':
      return {
        ...state,
        giftBoxQuantity: action.payload,
      };
    case 'ADD_GIFT_BOX':
      return {
        ...state,
        giftBoxQuantity: state.giftBoxQuantity + 1, // 增加禮盒數量
      };
    case 'REMOVE_GIFT_BOX':
      return {
        ...state,
        giftBoxQuantity: state.giftBoxQuantity - 1, // 減少禮盒數量
      };
    case 'UPDATE_CART_GIFT_BOX':
      // 更新購物車中的禮盒信息
      return {
        ...state,
        giftBox: action.payload,
        
      };
      case' SET_SELECTED_BOX_SIZE':
      return { ...state, selectedBoxSize: action.payload };
    default:
      return state;
  }
}
export function StoreProvider(props) {
  //使用 useReducer 鉤子來管理應用程式的狀態。它需要兩個參數，第一個是 reducer 函式（在先前的程式碼中定義），
  //第二個是初始狀態（在先前的程式碼中定義）
  //state 是目前的狀態，而 dispatch 是一個函式，用於派發動作來更新狀態。
  //useReducer 鉤子，將初始狀態 initialState 和 reducer 函式結合起來。
  //useReducer 接受這兩個參數並返回一個陣列，其中的第一個元素是當前的狀態 state，
  //而第二個元素是一個 dispatch 函式。dispatch 函式用於派發動作，以便更新狀態。
  const [state, dispatch] = useReducer(reducer, initialState);

  //將 state 和 dispatch 打包成一個物件，使得這些值能夠被傳遞到 Store.Provider 中，供其子組件使用
  const value = { state, dispatch };

  //回傳一個 Store.Provider 元件，通過 value 屬性傳遞了上面創建的物件值
  //props.children 是指 StoreProvider 的子組件，也就是被包裹在 StoreProvider 中的其他組件。
  //這樣，這些子組件就可以透過 useContext(Store) 來訪問 state 和 dispatch。
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
