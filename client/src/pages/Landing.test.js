import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Landing from './Landing';
import { useNavigate } from "react-router-dom";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Landing Component', () => {
  const mockedNavigate = useNavigate;

  beforeEach(() => {
    mockedNavigate.mockImplementation(() => jest.fn());
  });

  it('renders welcome message', () => {
    render(<Landing />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText("to Vanderbilt's premier lifting mentorship organization")).toBeInTheDocument();
  });

  it('renders join us message', () => {
    render(<Landing />);
    expect(screen.getByText('Join us today.')).toBeInTheDocument();
  });

  it('has a signup button that navigates to create account page', () => {
    render(<Landing />);
    const signUpButton = screen.getByRole('button', { name: 'SIGN UP' });
    fireEvent.click(signUpButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/create-account');
  });

  // Additional tests if there are more interactive elements or dynamic content
});
