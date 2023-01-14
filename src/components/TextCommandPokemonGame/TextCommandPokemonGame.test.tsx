import { act, fireEvent, render } from '@testing-library/react';
import TextCommandPokemonGame from '.';

describe('handleMovement', () => {
  afterAll(() => {
    jest.clearAllTimers()
  });

  it('should correctly update the state on input change', async () => {
    // Arrange
    const { getByTestId, getByText, } = render(<TextCommandPokemonGame />);
    const input = getByTestId('sequence-input');
    const button = getByTestId('move-button');

    // Act
    fireEvent.change(input, { target: { value: 'E' } });
    await act(async () => {
      fireEvent.click(button);
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    // Assert
    expect(getByText('Caught Pokemon: 2')).toBeInTheDocument();
    expect(getByText('Current position: X: 1, Y: 0')).toBeInTheDocument();
  });

  it('should correctly handle multiple directions', async () => {
    // Arrange
    const { getByTestId, getByText } = render(<TextCommandPokemonGame />);
    const input = getByTestId('sequence-input');
    const button = getByTestId('move-button');

    // Act
    fireEvent.change(input, { target: { value: 'NESW' } });
    await act(async () => {
      fireEvent.click(button);
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    // Assert
    expect(getByText('Caught Pokemon: 4')).toBeInTheDocument();
    expect(getByText('Current position: X: 0, Y: 0')).toBeInTheDocument();
  });

  it('should not catch Pokemon if already visited the house', async () => {
    // Arrange
    const { getByText, getByTestId } = render(<TextCommandPokemonGame />);
    const input = getByTestId('sequence-input');
    const button = getByTestId('move-button');

    // Act
    fireEvent.change(input, { target: { value: 'NSNSNSNSNSNS' } });
    await act(async () => {
      fireEvent.click(button);
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    // Assert
    const caughtPokemonValue = getByTestId('caught-pokemons').textContent;
    expect(caughtPokemonValue).toBe('Caught Pokemon: 2');
    expect(getByText('Current position: X: 0, Y: 0')).toBeInTheDocument();
  });

})

export { }
