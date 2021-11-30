import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import Pokedex from '../components/Pokedex';

const SEVEN = 7;
const getNextBtn = () => screen.getByTestId('next-pokemon');
const checkAllFilter = () => {
  const nextPokemonBtn = getNextBtn();
  pokemons.forEach((_pokemon, index) => {
    if (index !== pokemons.length - 1) {
      userEvent.click(nextPokemonBtn);
    }
  });
};

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const pokemonTypes = (
  [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))]
);

describe('Testa componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
  });

  it('A página contém um h2 com o texto "Encountered pokémons"', () => {
    const title = screen.getByRole(
      'heading', { name: /encountered pokémons/i }, { level: 2 },
    );

    expect(title).toBeDefined();
  });

  it('Ao clicar no botão "Próximo pokémon", o próximo pokémon da lista é exibido', () => {
    const button = getNextBtn();
    expect(button).toHaveTextContent('Próximo pokémon');

    const pokemonName = screen.getByText(/pikachu/i).innerHTML;
    expect(pokemonName).toEqual(pokemons[0].name);

    userEvent.click(button);
    const nextPokemonName = screen.getByText(/charmander/i).innerHTML;
    expect(nextPokemonName).toEqual(pokemons[1].name);
  });

  it('É exibido apenas um pokémon por vez', () => {
    const moreDetailLinks = screen.getAllByRole('link', { name: /more details/i });
    expect(moreDetailLinks).toBeDefined();
    expect(moreDetailLinks).toHaveLength(1);
  });

  it('A pokedéx tem os botões de filtro e eles funcionam corretamente', () => {
    const allTypeBtns = screen.getAllByTestId('pokemon-type-button');
    expect(allTypeBtns).toHaveLength(SEVEN);

    pokemonTypes.forEach((type) => {
      const filterBtn = screen.getAllByRole('button', { name: type });
      expect(filterBtn).toBeDefined();
      expect(filterBtn).toHaveLength(1);
      expect(filterBtn[0]).toHaveTextContent(type);
    });

    const nextPokemonBtn = getNextBtn();

    const electricBtn = screen.getByRole('button', { name: /electric/i });
    userEvent.click(electricBtn);
    expect(nextPokemonBtn).toBeDisabled();

    const psychicBtn = screen.getByRole('button', { name: /psychic/i });
    userEvent.click(psychicBtn);
    expect(nextPokemonBtn).not.toBeDisabled();

    const pokemonName = screen.getByText(/alakazam/i);
    expect(pokemonName).toBeDefined();

    userEvent.click(nextPokemonBtn);
    const nextPokemonName = screen.getByText(/mew/i);
    expect(nextPokemonName).toBeDefined();

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeDefined();
  });

  it('A pokédex tem um botão para resetar o filtro e ele funciona corretamente', () => {
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeDefined();
    expect(allBtn).toHaveTextContent('All');

    const nextPokemonBtn = getNextBtn();

    const electricBtn = screen.getByRole('button', { name: /electric/i });
    userEvent.click(electricBtn);
    expect(nextPokemonBtn).toBeDisabled();

    userEvent.click(allBtn);
    checkAllFilter();

    const currentPokemonName = screen.getByText(/dragonair/i);
    expect(currentPokemonName).toBeDefined();
  });

  it('Ao carregar a página, o filtro selecionado deve ser o All', () => {
    checkAllFilter();
    const currentPokemonName = screen.getByText(/dragonair/i);
    expect(currentPokemonName).toBeDefined();
  });
});
