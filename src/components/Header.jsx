import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <p data-testid="email-field">{`Olá, ${email}`}</p>
        <p data-testid="total-field">
          <strong>
            {expenses
              .reduce((
                acc,
                { currency, value, exchangeRates },
              ) => acc + Number(value) * Number(exchangeRates[currency].ask), 0)
              .toFixed(2)}
          </strong>
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    reduce: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = ({ user, wallet }) => ({
  ...user,
  ...wallet,
});

export default connect(mapStateToProps)(Header);
