import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testa componente NotFound', () => {
  beforeEach(() => render(<NotFound />));

  it('A página contém um h2 com o texto "Page requested not found 😭"', () => {
    const notFoundText = screen.getByText(/page requested not found/i);
    const emoji = screen.getByLabelText('Crying emoji');
    expect(notFoundText).toBeDefined();
    expect(emoji).toBeDefined();
  });

  it('A página mostra a imagem esperada', () => {
    const image = screen.getByTestId('not-found-image');
    expect(image).toBeDefined();

    const IMG_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.src).toBe(IMG_URL);
  });
});
