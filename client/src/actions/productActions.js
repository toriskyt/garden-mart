export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";

  
  export const updateCategories = (categories) => (dispatch) => {
    dispatch({
      type: "UPDATE_CATEGORIES",
      payload: categories,
    });
  };
  
  export const updateCurrentCategory = (currentCategory) => (dispatch) => {
    dispatch({
      type: "UPDATE_CURRENT_CATEGORY",
      payload: currentCategory,
    });
  };

  export const updateProducts = (products) => (dispatch) => {
    dispatch({
      type: "UPDATE_PRODUCTS",
      payload: products,
    });
  };

  export const updateCartQuantity = (_id, purchaseQuantity) => (dispatch) => {
    dispatch({
      type: "UPDATE_CART_QUANTITY",
      _id: _id,
      purchaseQuantity
    });
  }
  
 export const addItemToCart = (item) => (dispatch) => {
  dispatch({
    type: "ADD_TO_CART",
    product: { ...item, purchaseQuantity: 1 }
  });
 }

 export const toggleCart = () => (dispatch) => {
   dispatch({ type: "TOGGLE_CART"});
 }
 export const addMultipleToCart = (Products) => (dispatch) => {
  dispatch({ type: "ADD_MULTIPLE_TO_CART", products: Products });
 }

 export const removeFromCart = (id) => dispatch => {
  dispatch({
    type: "REMOVE_FROM_CART",
    _id: id,
  });
 }