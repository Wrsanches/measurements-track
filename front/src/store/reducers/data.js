const INITIAL_STATE = {
  refresh: false
};

const data = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'REFRESH':
      return { ...state, refresh: action.refresh };

    default:
      return INITIAL_STATE;
  }
};

export default data;
