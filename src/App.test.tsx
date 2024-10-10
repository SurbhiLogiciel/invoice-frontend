import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  
  // Adjust to find text more flexibly or wait for async rendering
  const linkElement = await screen.findByText(/learn react/i);
  
  expect(linkElement).toBeInTheDocument();
});
