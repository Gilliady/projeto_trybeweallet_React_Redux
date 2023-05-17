import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpense, fetchPricesToAddExpense, endEditExpense } from '../redux/actions';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class WalletForm extends Component {
  state = {
    ...initialState,
  };

  componentDidUpdate(prevProps) {
    const { idToEdit, editor, expenses } = this.props;
    const expenseToEdit = expenses.find(({ id }) => Number(id) === Number(idToEdit));
    if (editor && !prevProps.editor) {
      this.setState({
        value: expenseToEdit.value,
        description: expenseToEdit.description,
        currency: expenseToEdit.currency,
        method: expenseToEdit.method,
        tag: expenseToEdit.tag,
      });
    }
    if (!editor && prevProps.editor) {
      this.setState({
        ...initialState,
      });
    }
  }

  handleChange = ({ target: { name, value } }) => this
    .setState({ [name]: value });

  editExpenseClick = () => {
    const { dispatch, expenses, idToEdit } = this.props;
    Object.assign(expenses.find(({ id }) => Number(id) === Number(idToEdit)), this.state);
    dispatch(editExpense(expenses));
    endEditExpense();
  };

  addExpenseClick = () => {
    const { dispatch } = this.props;
    dispatch(fetchPricesToAddExpense(this.state));
    this.setState({
      ...initialState,
    });
  };

  render() {
    const { value,
      description,
      currency,
      method,
      tag } = this.state;
    const { currencies,
      editor,
    } = this.props;

    return (
      <fieldset>
        <h4>
          {editor ? 'Edite a sua despesa' : 'Adicione uma despesa'}
        </h4>
        <label>
          value
          <input
            value={ value }
            type="text"
            data-testid="value-input"
            name="value"
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Descrição
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <select
          data-testid="currency-input"
          selected={ currency }
          onChange={ this.handleChange }
          name="currency"
        >
          {currencies.map((curr) => (
            <option key={ curr } value={ curr }>
              {curr}
            </option>))}
        </select>
        <select
          data-testid="method-input"
          selected={ method }
          onChange={ this.handleChange }
          name="method"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          selected={ tag }
          onChange={ this.handleChange }
          name="tag"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        {editor
          ? (
            <button type="button" onClick={ this.editExpenseClick }>
              Editar despesa

            </button>
          )
          : (
            <button type="button" onClick={ this.addExpenseClick }>
              Adicionar despesa
            </button>
          )}
      </fieldset>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  ...wallet,
});

export default connect(mapStateToProps)(WalletForm);
