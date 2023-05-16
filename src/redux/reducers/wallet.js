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
        value: payload.valor,
        currency: payload.moeda,
        method: payload.metodo,
        tag: payload.categoria,
        description: payload.descricao,
        exchangeRates: payload.exchangeRates,
      }] };

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
