// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        value: payload.value,
        currency: payload.currency,
        method: payload.method,
        tag: payload.tag,
        description: payload.description,
        exchangeRates: payload.exchangeRates,
      }] };

  case 'START_EDIT_EXPENSE':
    return { ...state, editor: true, idToEdit: payload };

  case 'EDIT_EXPENSE':
    return { ...state, editor: false, expenses: payload };

  case 'REMOVE_EXPENSE':
    return { ...state,
      expenses: payload,
    };

  case 'UPDATE_CURRENCIES':
    return { ...state, ...action.payload };

  default:
    return state;
  }
};

export default walletReducer;
