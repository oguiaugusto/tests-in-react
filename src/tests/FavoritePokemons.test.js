import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const FAVORITE_POKEMONS = [
  {
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
    summary: 'This intelligent Pokémon roasts hard berries with electricity...',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary: 'The flame on its tail shows the strength of its life force...',
  },
];

describe('Testa componente Favorite Pokemons', () => {
  it(`"No favorite pokemon found" é exibido se a pessoa não tiver
      pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const noFavoriteText = screen.getByText(/no favorite pokemon found/i);
    const favoritePokemons = screen.queryAllByRole('link', { name: /more details/i });

    expect(noFavoriteText).toBeDefined();
    expect(favoritePokemons).toHaveLength(0);
  });

  it('Todos os cards dos pokémons favoritados são exibidos corretamente', () => {
    renderWithRouter(<FavoritePokemons pokemons={ FAVORITE_POKEMONS } />);
    const noFavoriteText = screen.queryByText(/no favorite pokemon found/i);
    expect(noFavoriteText).toBeNull();

    const favoritePokemons = screen.queryAllByRole('link', { name: /more details/i });
    expect(favoritePokemons).toBeDefined();
    expect(favoritePokemons).toHaveLength(2);
  });
});
