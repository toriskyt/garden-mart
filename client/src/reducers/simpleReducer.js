const initialState = {
    result: "",
    fruitOne: "",
    fruitTwo: "",
  };
  
const simpleState = (state = initialState, action) => {
  switch (action.type) {
    case "SIMPLE_ACTION":
        return {
          result: action.payload,
        };
      case "SET_FRUIT_ONE":
        return {
          fruitOne: action.payload,
        };
      case "SET_FRUIT_TWO":
        return {
          fruitTwo: action.payload,
        };
      default:
        return state;
  }
};

export default simpleState;