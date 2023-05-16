// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const updateCurrencies = (payload) => ({
  type: UPDATE_CURRENCIES,
  payload,
});

export const fetchCurrencies = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((data) => data.json())
    .then((currencies) => {
      delete currencies.USDT;
      dispatch(updateCurrencies({
        currencies: Object.keys(currencies).map((key) => key),
      }));
    });
};

export const fetchPricesToAddExpense = (expense) => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all').then((data) => data.json())
    .then((currencies) => {
      expense.exchangeRates = { ...currencies };
      dispatch(addExpense(expense));
    });
};
