import React, { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { useButton } from 'react-aria';
import userEvent from '@testing-library/user-event';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


export const Button = (props: { onPress: () => void; children: React.ReactChild }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const { children } = props;

  return (
      <button {...buttonProps} ref={ref}>
        {children}
      </button>
  );
};

describe('Atoms/Button', () => {
  const handleOnClick = jest.fn();

  it('should execute the callback function onClick', () => {
    render(<Button onPress={handleOnClick}>test me</Button>);

    const testButton = screen.getByRole('button');
    expect(testButton).toBeInTheDocument();
    expect(testButton).toHaveTextContent('test me');

    userEvent.click(testButton);

    expect(handleOnClick).toHaveBeenCalledTimes(1);
  });
});
