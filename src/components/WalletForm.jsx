import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPricesToAddExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valor: '',
    descricao: '',
    moeda: 'USD',
    metodo: 'Dinheiro',
    categoria: 'Alimentação',
  };

  handleChange = ({ target: { name, value } }) => this
    .setState({ [name]: value });

  addExpenseClick = () => {
    const { dispatch } = this.props;
    dispatch(fetchPricesToAddExpense(this.state));
    this.setState({
      valor: '',
      descricao: '',
      moeda: 'USD',
      metodo: 'Dinheiro',
      categoria: 'Alimentação',
    });
  };

  render() {
    const { valor, descricao, moeda, metodo, categoria } = this.state;
    const { currencies } = this.props;
    return (
      <fieldset>
        <label>
          Valor
          <input
            value={ valor }
            type="text"
            data-testid="value-input"
            name="valor"
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Descrição
          <input
            type="text"
            data-testid="description-input"
            name="descricao"
            value={ descricao }
            onChange={ this.handleChange }
          />
        </label>
        <select
          data-testid="currency-input"
          selected={ moeda }
          onChange={ this.handleChange }
          name="moeda"
        >
          {currencies.map((currency) => (
            <option key={ currency } value={ currency }>
              {currency}
            </option>))}
        </select>
        <select
          data-testid="method-input"
          selected={ metodo }
          onChange={ this.handleChange }
          name="metodo"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          selected={ categoria }
          onChange={ this.handleChange }
          name="categoria"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="button" onClick={ this.addExpenseClick }>Adicionar despesa</button>
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
