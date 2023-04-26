export const initialState = {
  attempts: [],
};
export const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PHONE": {
      return {
        ...state,
        attempts: [...state.attempts, action.data],
      };
    }
  }
};
