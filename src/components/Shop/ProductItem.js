import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  // const { id, title, price, description } = props;

  const dispatch = useDispatch();

  const addCartHandler = (item) => {
    dispatch(cartActions.addCartItem(item));
  };

  return (
    <ul>
      {props.products.map((i) => (
        <li className={classes.item} key={i.id}>
          <Card>
            <header>
              <h3>{i.title}</h3>
              <div className={classes.price}>${i.price}</div>
            </header>
            <p>{i.description}</p>
            <div className={classes.actions}>
              <button onClick={() => addCartHandler(i)}>Add to Cart</button>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default ProductItem;
