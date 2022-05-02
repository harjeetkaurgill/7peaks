import { render, screen } from '@testing-library/react';
import App from './App';

test('renders APP', () => {
  render(<App />);
  const element = screen.getByTestId('APP');
  expect(element).toBeInTheDocument();
});
