import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders without crashing', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  it('displays the correct copyright text', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/© 2023 VandyLifts/i);
    expect(copyrightText).toBeInTheDocument();
  });

  it('contains a link to Anchor Link', () => {
    render(<Footer />);
    const anchorLink = screen.getByText('Anchor Link');
    expect(anchorLink).toBeInTheDocument();
    expect(anchorLink).toHaveAttribute('href', 'https://anchorlink.vanderbilt.edu/organization/vandylifts');
  });

  it('contains a link to Instagram', () => {
    render(<Footer />);
    const instagramLink
