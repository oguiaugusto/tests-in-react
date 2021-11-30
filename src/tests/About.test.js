import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa componente About', () => {
  beforeEach(() => render(<About />));

  it('A página contém um "h2" com o texto "About Pokédex"', () => {
    const title = screen.getByRole('heading', { name: /about pokédex/i }, { level: 2 });
    expect(title).toBeDefined();
    expect(title).toHaveTextContent('About Pokédex');
  });

  it('A página contém dois parágrafos com texto sobre a pokédex', () => {
    const firstParagraph = screen.getByText(/this application simulates/i);
    const secondParagraph = screen.getByText(/one can filter pokémons by type, and see/i);

    expect(firstParagraph).toBeDefined();
    expect(secondParagraph).toBeDefined();
  });

  it('A página contém a imagem esperada de uma pokédex', () => {
    const image = screen.getByRole('img');
    expect(image).toBeDefined();

    const IMG_SRC = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(IMG_SRC);
  });
});
