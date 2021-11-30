import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa componente App', () => {
  it('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    const aboutLink = screen.getByRole('link', { name: /About/i });
    const favoritePokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(homeLink).toHaveTextContent('Home');
    expect(aboutLink).toHaveTextContent('About');
    expect(favoritePokemonsLink).toHaveTextContent('Favorite Pokémons');
  });

  it(`A aplicação é redirecionada para a página inicial na URL "/" ao clicar
      no link "Home"`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    expect(history.location.pathname).not.toBe('/');

    const homeLink = screen.getByRole('link', { name: /Home/i });
    userEvent.click(homeLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it(`A aplicação é redirecionada para a página "About" na URL "/about" ao
      clicar no link "About"`, () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).not.toBe('/about');

    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it(`A aplicação é redirecionada para a página de pokemóns favoritos na URL
      "/favorites" ao clicar no link "Favorite Pokémons"`, () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).not.toBe('/favorites');

    const favoritePokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoritePokemonsLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  it(`A aplicação é redirecionada para a página "Not Found" ao entrar em uma
      URL desconhecida`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/anything');

    const notFoundText = screen.getByText(/Page requested not found/i);
    expect(notFoundText).toBeDefined();
  });
});
