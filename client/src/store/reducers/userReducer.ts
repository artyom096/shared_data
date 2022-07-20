type IUserAction = {
  type: string;
  payload?: any;
};

const initialState = {
    isAuth: false,
    currentUser: {}
};

const userReducer = (state = initialState, action: IUserAction) => {
  switch (action.type) {
    case "value":
      return state;
    default:
      return state;
  }
};

export default userReducer;
