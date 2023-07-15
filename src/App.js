import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { addCartToDb, cartActions } from "./store/cart-slice";
import { uiActions } from "./store/ui-slice";

let initialState = true;

function App() {
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state) => state.ui.isCartVisible);
  const cart = useSelector((state) => state.cart.items);
  const notification = useSelector((state) => state.ui.notification);
  const initialNotification= useSelector((state) => state.cart.initialNotification);
  console.log(notification)
  useEffect(() => {
      if(initialState){
        initialState = false;
        const restoreCart = async () => {
          const cartRes = await fetch("https://myreact-16-redux3-default-rtdb.firebaseio.com/cart.json")
          const data = await cartRes.json();
          if(cartRes.ok && data !== null ){
            
            dispatch(cartActions.onRefresh(data));
          }
          else if(!cart.ok){
            throw new Error('Unable to load cart')
          }
        }
        try {
          restoreCart();
        } catch(error) {
          alert(error);
        }
        return;
      }

    dispatch(addCartToDb(cart));
  }, [cart, dispatch]);

  return (
    <Fragment>
      {initialNotification && notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isCartVisible && <Cart />}
        {!isCartVisible && <Products />}
      </Layout>
    </Fragment>
  );
}

export default App;
