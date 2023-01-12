import { fireEvent, render } from '@testing-library/react';
import PokemonGame from '.';

describe('handleMovement', () => {
  it('should correctly update the state on input change', () => {
    const { getByLabelText, getByText, getByAltText } = render(<PokemonGame />);
    const input = getByLabelText('Sequence of moves:');
    fireEvent.change(input, { target: { value: 'E' } });
    fireEvent.click(getByAltText('Submit'));
    expect(getByText('Caught Pokemon: 2')).toBeInTheDocument();
    expect(getByText('Current position: X: 1, Y: 0')).toBeInTheDocument();
  });

  it('should correctly handle multiple directions', () => {
    const { getByLabelText, getByText, getByAltText } = render(<PokemonGame />);
    const input = getByLabelText('Sequence of moves:');
    fireEvent.change(input, { target: { value: 'NESW' } });
    fireEvent.click(getByAltText('Submit'));
    expect(getByText('Caught Pokemon: 4')).toBeInTheDocument();
    expect(getByText('Current position: X: 0, Y: 0')).toBeInTheDocument();
  });

  it('should not catch Pokemon if already visited the house', () => {
    const { getByLabelText, getByText, getByAltText } = render(<PokemonGame />);
    const input = getByLabelText('Sequence of moves:');
    fireEvent.change(input, { target: { value: 'EEN' } });
    fireEvent.click(getByAltText('Submit'));
    expect(getByText('Caught Pokemon: 4')).toBeInTheDocument();
    expect(getByText('Current position: X: 2, Y: -1')).toBeInTheDocument();
  });

})

export { }
