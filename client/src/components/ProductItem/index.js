import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateCartQuantity, addItemToCart } from "../../actions/productActions";
import { pluralize } from "../../utils/helpers"
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price,
    quantity,
    cart,
    updateCartQuantity,
    addItemToCart
  } = item;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      updateCartQuantity(_id, parseInt(itemInCart.purchaseQuantity) + 1);
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      addItemToCart(item);
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateCartQuantity: (_id, purchaseQuantity) => dispatch(updateCartQuantity(_id, purchaseQuantity)),
  addItemToCart: (item) => dispatch(addItemToCart(item))
});
export default connect(null, mapDispatchToProps)(ProductItem);
