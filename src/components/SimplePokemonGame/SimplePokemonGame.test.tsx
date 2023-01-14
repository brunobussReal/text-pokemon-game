import { render, fireEvent, act } from '@testing-library/react';
import SimplePokemonGame from '.';

// jest.mock('../../hooks/usePokemon', () => ({
//   catchMultipleRandomPokemons: jest.fn(() => Promise.resolve([])),
// }));

describe('<SimplePokemonGame />', () => {
  afterAll(() => {
    jest.clearAllTimers()
  });

  it('should handle movement correctly', async () => {
    // Arrange
    const sequence = 'NSEW';
    const { getByTestId } = render(<SimplePokemonGame />);
    const input = getByTestId('sequence-input');
    const button = getByTestId('move-button');

    // Act
    fireEvent.change(input, { target: { value: sequence } });
    await act(async () => {
      fireEvent.click(button);
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    // Assert
    const charPosition = getByTestId('char-position').textContent;
    expect(charPosition).toBe('Current position: X: 100, Y: 100');
  });

  it('display the correct amount of caught pokemons', async () => {
    // Arrange
    const sequence = 'NESW';
    const { getByTestId } = render(<SimplePokemonGame />);
    const input = getByTestId('sequence-input');
    const button = getByTestId('move-button');

    // Act
    fireEvent.change(input, { target: { value: sequence } });
    await act(async () => {
      fireEvent.click(button);
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    // Assert
    const caughtPokemonValue = getByTestId('caught-pokemons').textContent;
    expect(caughtPokemonValue).toBe('Caught Pokemon: 4');
  });
});