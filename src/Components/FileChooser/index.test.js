import { render, screen, cleanup } from '@testing-library/react';
import FileChooser from './';

test('renders learn react link', () => {
  render(<FileChooser />);
    const linkElement = screen.getByTestId("input-1");
    expect(linkElement).toBeInTheDocument()
});
