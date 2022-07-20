type IFileAction = {
  type: string;
  payload?: any;
};

const initialState = {};

const fileReducer = (state = initialState, action: IFileAction) => {
  switch (action.type) {
    case "value":
      return state;
    default:
      return state;
  }
};

export default fileReducer;
