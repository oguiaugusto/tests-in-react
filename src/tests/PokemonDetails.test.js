import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const summaryText1 = 'This intelligent Pokémon roasts hard berries ';
const summaryText2 = 'with electricity to make them tender enough to eat.';

const POKEMON_DATA = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: summaryText1 + summaryText2,
};

const { id, name, summary, foundAt } = POKEMON_DATA;

describe('Testa componente PokemonDetails', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
  });

  it('As informações detalhadas do pokémon selecionado são mostradas na tela', () => {
    const moreDetails = screen.queryByRole('link', { name: /more details/i });
    expect(moreDetails).toBeNull();

    const title = screen.getByRole('heading', { name: `${name} Details` });
    const summaryTitle = screen.getByRole('heading', { name: /summary/i });
    const summaryText = screen.getByText(/this intelligent pokémon/i);

    expect(title).toBeDefined();
    expect(summaryTitle).toBeDefined();
    expect(summaryText.innerHTML).toEqual(summary);
  });

  it('Existe uma seção com os mapas contendo as localizações dos pokémons', () => {
    const locationsTitle = screen.getByRole(
      'heading', { name: `Game Locations of ${name}` },
    );
    expect(locationsTitle).toBeDefined();

    const locationsName = screen.getAllByText(/kanto/i);
    expect(locationsName).toBeDefined();
    expect(locationsName).toHaveLength(2);
    expect(locationsName[0].innerHTML).toEqual(foundAt[0].location);
    expect(locationsName[1].innerHTML).toEqual(foundAt[1].location);

    const locationsImg = screen.getAllByRole('img');
    expect(locationsImg[1].src).toEqual(foundAt[0].map);
    expect(locationsImg[2].src).toEqual(foundAt[1].map);
    expect(locationsImg[1].alt).toEqual(`${name} location`);
    expect(locationsImg[2].alt).toEqual(`${name} location`);
  });

  it('É possível favoritar um pokémon através da página de detalhes', () => {
    const favoriteCheck = screen.getByLabelText(/pokémon favoritado?/i);

    const noFavorites = localStorage.getItem('favoritePokemonIds');
    expect(noFavorites).toBeNull();

    userEvent.click(favoriteCheck);
    const favoriteIds = JSON.parse(localStorage.getItem('favoritePokemonIds'));
    expect(favoriteIds.includes(id)).toBeTruthy();

    userEvent.click(favoriteCheck);
    const noFavorites2 = JSON.parse(localStorage.getItem('favoritePokemonIds'));
    expect(noFavorites2).toEqual([]);
  });
});
