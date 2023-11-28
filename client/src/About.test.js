import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import About from './About';

describe('About Component', () => {
  test('renders the vision and how it works sections with text content', () => {
    render(
      <Router>
        <About />
      </Router>
    );

    // Check for the Our Vision section
    expect(screen.getByText('Our Vision')).toBeInTheDocument();
    expect(screen.getByText(/inspire and educate the Vanderbilt community/)).toBeInTheDocument();
    expect(screen.getByText(/building a community that values well-being/)).toBeInTheDocument();

    // Check for the How It Works section
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText(/Vandylifts is more than just a fitness club/)).toBeInTheDocument();
    expect(screen.getByText(/Whether you are a fitness novice/)).toBeInTheDocument();

    // Check for the founder information
    expect(screen.getByText('Founded in 2022 by Melanie Leguizamon.')).toBeInTheDocument();

    // Check that the links are present
    expect(screen.getByRole('link', { name: /scheduling feature/i })).toHaveAttribute('href', '/schedule');
    expect(screen.getByRole('link', { name: /discussion page/i })).toHaveAttribute('href', '/discussion');
  });

  // More tests can be added to cover additional functionalities or elements
});
