import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

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
  summary: 'This intelligent Pokémon roasts hard berries...',
};

const renderPokemon = () => (
  renderWithRouter(<Pokemon pokemon={ POKEMON_DATA } isFavorite />)
);

describe('Testa componente Pokemon', () => {
  it('As informações de determinado pokémon são exibidas corretamente', () => {
    renderPokemon();
    const name = screen.getByText(/pikachu/i).innerHTML;
    const type = screen.getByText(/electric/i).innerHTML;
    const averageWeight = screen.getByText(/average weight:/i).innerHTML;
    const image = screen.getAllByRole('img')[0];

    const {
      name: pokemonName,
      type: pokemonType,
      image: pokemonImage,
      averageWeight: { value, measurementUnit },
    } = POKEMON_DATA;
    const averageWeightFormat = `Average weight: ${value} ${measurementUnit}`;
    const altFormat = `${pokemonName} sprite`;

    expect(name).toEqual(pokemonName);
    expect(type).toEqual(pokemonType);
    expect(averageWeight).toEqual(averageWeightFormat);
    expect(image.src).toEqual(pokemonImage);
    expect(image.alt).toEqual(altFormat);
  });

  it('O card possui um link de navegação para a página de detalhes do pokémon', () => {
    renderPokemon();
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeDefined();

    const domain = moreDetailsLink.href.split('/pokemons/')[0];
    const { id } = POKEMON_DATA;
    const hrefFormat = `${domain}/pokemons/${id}`;
    expect(moreDetailsLink.href).toEqual(hrefFormat);
  });

  it('Ao clicar no link de navegação do pokémon, é exibida a página de detalhes', () => {
    const { history } = renderPokemon();
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const { id } = POKEMON_DATA;

    const { location: { pathname } } = history;
    const pathnameFormat = `/pokemons/${id}`;
    expect(pathname).toBe(pathnameFormat);
  });

  it('Existe um ícone de estrela nos pokémons favoritados', () => {
    renderPokemon();
    const starImg = screen.getAllByRole('img')[1];
    expect(starImg).toBeDefined();

    const { name } = POKEMON_DATA;
    const domain = starImg.src.split('/star-icon.svg')[0];
    expect(starImg.src).toEqual(`${domain}/star-icon.svg`);
    expect(starImg.alt).toEqual(`${name} is marked as favorite`);
  });
});
