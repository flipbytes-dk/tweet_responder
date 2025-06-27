/// <reference types="@testing-library/jest-dom" />

import { render, screen } from '@testing-library/react';
import Logo from './Logo';

describe('Logo', () => {
  it('renders the logo with the letter "T"', () => {
    render(<Logo />);
    const logoElement = screen.getByText('T');
    expect(logoElement).toBeInTheDocument();
  });
});
