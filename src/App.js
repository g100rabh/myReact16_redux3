import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { cartActions } from "./store/cart-slice";
import { uiActions } from "./store/ui-slice";

let initialState = true;

function App() {
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state) => state.ui.isCartVisible);
  const cart = useSelector((state) => state.cart.items);
  const notification = useSelector((state) => state.ui.notification);
  const [initialNotification, setInitialNotification] = useState(false);

  useEffect(() => {
    const addToDb = async () => {
      if(initialState){
        initialState = false;
        const cartRes = await fetch("https://myreact-16-redux3-default-rtdb.firebaseio.com/cart.json")
        
        if(cartRes.ok){
          const data = await cartRes.json();
          dispatch(cartActions.onRefresh(data));
        }
        return;
      }
      if(!initialNotification){
        setInitialNotification(true);
      }
      try {
        
        dispatch(
          uiActions.showNotification({
            status: "pending",
            title: "Sending",
            message: "Sending to cart",
          })
        );
        const res = await fetch(
          "https://myreact-16-redux3-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify(cart),
          }
        );

        if (!res.ok) {
          throw new Error("Unable to add");
        }
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Successfully send to cart",
          })
        );
      } catch (error) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Sending to cart failed",
          })
        );
      }
    };
    addToDb();
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
