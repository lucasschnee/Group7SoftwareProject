import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Trainers from './Trainers';

// Mocking Footer
jest.mock('./Footer', () => () => <footer>Mocked Footer</footer>);

describe('Trainers Component', () => {
  beforeEach(() => {
    render(<Trainers />);
  });

  it('renders the Meet the Trainers heading', () => {
    expect(screen.getByText('Meet the Trainers')).toBeInTheDocument();
  });

  // Test for each trainer's information
  const trainers = [
    { name: 'Melanie Leguizamon', position: 'President' },
    { name: 'Henry Jonokuchi', position: 'Vice President' },
    // ... Add all other trainers here
  ];

  trainers.forEach(trainer => {
    it(`renders the trainer ${trainer.name} with correct position`, () => {
      expect(screen.getByText(trainer.name)).toBeInTheDocument();
      expect(screen.getByText(`Position: ${trainer.position}`)).toBeInTheDocument();
      // Add tests for hometown and fun fact if they have static content
    });
  });

  it('renders the Footer component', () => {
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument();
  });

  // Additional tests if there are any dynamic elements or event handlers
});
