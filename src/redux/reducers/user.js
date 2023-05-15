// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
  senha: '',

};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
