import { fireEvent, render } from '@testing-library/react';
import TextCommandPokemonGame from '.';

describe('handleMovement', () => {
  it('should correctly update the state on input change', () => {
    // Arrange
    const { getByLabelText, getByText,  } = render(<TextCommandPokemonGame />);
    const input = getByLabelText('Sequence of moves:');

    // Act
    fireEvent.change(input, { target: { value: 'E' } });
    fireEvent.click(getByText('Submit'));

    // Assert
    expect(getByText('Caught Pokemon: 2')).toBeInTheDocument();
    expect(getByText('Current position: X: 1, Y: 0')).toBeInTheDocument();
  });

  it('should correctly handle multiple directions', () => {
    // Arrange
    const { getByLabelText, getByText  } = render(<TextCommandPokemonGame />);
    const input = getByLabelText('Sequence of moves:');

    // Act
    fireEvent.change(input, { target: { value: 'NESW' } });
    fireEvent.click(getByText('Submit'));

    // Assert
    expect(getByText('Caught Pokemon: 4')).toBeInTheDocument();
    expect(getByText('Current position: X: 0, Y: 0')).toBeInTheDocument();
  });

  it('should not catch Pokemon if already visited the house', () => {
    // Arrange
    const { getByLabelText, getByText } = render(<TextCommandPokemonGame />);
    const input = getByLabelText('Sequence of moves:');

    // Act
    fireEvent.change(input, { target: { value: 'NSNSNSNSNSNS' } });
    fireEvent.click(getByText('Submit'));

    // Assert
    expect(getByText('Caught Pokemon: 2')).toBeInTheDocument();
    expect(getByText('Current position: X: 0, Y: 0')).toBeInTheDocument();
  });

})

export { }
