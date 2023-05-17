import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';
import mockData from './mockData';

beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Header', () => {
  it('Testa a navegação do usuário até adicionar uma despesa', async () => {
    const email = 'user@gmail.com';

    const initialState = {
      user: { email },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'], initialState });
    const btn = screen.getByRole('button', { name: /entrar/i });
    expect(btn).toBeDisabled();
    userEvent.type(screen.getByLabelText(/email/i), email);
    userEvent.type(screen.getByLabelText(/senha/i), '1234567');
    expect(btn).not.toBeDisabled();
    act(() => {
      userEvent.click(btn);
    });
    history.location.pathname = '/carteira';
    screen.getByText(/olá, user@gmail\.com/i);
    screen.getByText(/0\.00/i);
    screen.getByText(/brl/i);
    expect(fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
    userEvent.type(screen.getByLabelText(/value/i), '10');
    const valueInput = screen.getByLabelText(/value/i);
    expect(valueInput.value).toBe('10');
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
    });
    const [newText] = await screen.findAllByText(/47\.53/i);
    expect(newText).toBeInTheDocument();

    expect(valueInput.value).not.toBe('10');

    userEvent.click(await screen.findByRole('button', { name: /editar/i }));
    expect(valueInput.value).toBe('10');

    const descriptionInput = screen.getByLabelText(/Descrição/i);
    userEvent.type(descriptionInput, 'Rosquinhas');
    userEvent.click(screen.getByRole('button', { name: /editar despesa/i }));

    screen.getByRole('cell', { name: /rosquinhas/i });
    act(() => {
      userEvent.click(screen.getAllByRole('button', { name: /excluir/i })[0]);
    });
    expect(newText.textContent).toBe('0.00');
  });
});
