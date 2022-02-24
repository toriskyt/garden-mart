const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
};
  
const productState = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CATEGORIES":
      return {
        ...state,
        categories: [...action.payload],
      };

    case "UPDATE_CURRENT_CATEGORY":
      return {
        ...state,
        currentCategory: action.payload,
      };
    case "UPDATE_PRODUCTS":
      return {
        ...state,
        products: [...action.payload],
      };
      default:
        return state;
  }
};

export default productState;