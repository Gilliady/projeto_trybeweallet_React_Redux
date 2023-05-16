import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
  };

  handdleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  onClickLogin = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(login({ email }));
    history.push('/carteira');
  };

  render() {
    const { email, senha } = this.state;
    const minSenha = 6;
    const emailRegexp = /^[\d\w]{1,20}@[\w]{1,10}\.com$/i;
    return (

      <div>
        <form>
          <label htmlFor="email-input">Email</label>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            id="email-input"
            value={ email }
            onChange={ this.handdleChange }
          />
          <label htmlFor="password-input">Senha</label>
          <input
            type="password"
            name="senha"
            id="password-input"
            data-testid="password-input"
            value={ senha }
            onChange={ this.handdleChange }
          />
          <button
            disabled={
              (senha.length < minSenha)
              || !emailRegexp.test(email)
            }
            onClick={ this.onClickLogin }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
