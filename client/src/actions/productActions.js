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
  