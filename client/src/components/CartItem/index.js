import React from 'react';
import { connect } from "react-redux";
import { updateCartQuantity, removeFromCart } from "../../actions/productActions";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item, removeFromCurrentCart, updateCartQuantity }) => {


  const removeFromCart = item => {
    removeFromCurrentCart(item._id);
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      removeFromCart(item._id);
    } else {
      updateCartQuantity(item._id, parseInt(value));
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentCategory: state.productReducer.currentCategory,
    products: state.productReducer.products,
    cart: state.productReducer.cart
  };
};
const mapDispatchToProps = (dispatch) => ({
  updateCartQuantity: (_id, purchaseQuantity) => dispatch(updateCartQuantity(_id, purchaseQuantity)),
  removeFromCurrentCart: (id) => dispatch(removeFromCart(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
