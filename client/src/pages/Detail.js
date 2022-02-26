import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { connect } from "react-redux";
import Cart from '../components/Cart';
import { updateCartQuantity, updateProducts, addItemToCart, removeFromCart } from "../actions/productActions";
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail(props) {
  const { updateProducts, cart, updateCartQuantity, addItemToCart, removeFromCart, products } = props;
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      updateProducts(data.products);
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        updateProducts(indexedProducts);
      });
    }
  }, [products, data, loading, id, updateProducts]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      updateCartQuantity(id, parseInt(itemInCart.purchaseQuantity) + 1);
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      addItemToCart({ ...currentProduct, purchaseQuantity: 1 });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCurrentCart = () => {
    removeFromCart(currentProduct._id);
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCurrentCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
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
  updateProducts: (products) => dispatch(updateProducts(products)),
  updateCartQuantity: (_id, purchaseQuantity) => dispatch(updateCartQuantity(_id, purchaseQuantity)),
  addItemToCart: (item) => dispatch(addItemToCart(item)),
  removeFromCart: (id) => dispatch(removeFromCart(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
