import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import CreateAccount from './CreateAccount';
import { useNavigate } from 'react-router-dom';

jest.mock("firebase/auth");
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('CreateAccount Component', () => {
  const mockedNavigate = useNavigate;
  const mockedCreateUserWithEmailAndPassword = createUserWithEmailAndPassword;

  beforeEach(() => {
    mockedNavigate.mockImplementation(() => jest.fn());
    mockedCreateUserWithEmailAndPassword.mockClear();
  });

  it('renders email and password input fields and create account button', () => {
    render(<CreateAccount />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
  });

  it('allows entering email and password', () => {
    render(<CreateAccount />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@vanderbilt.edu' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    expect(screen.getByLabelText('Email').value).toBe('test@vanderbilt.edu');
    expect(screen.getByLabelText('Password').value).toBe('password123');
  });

  it('creates an account successfully for Vanderbilt email', async () => {
    mockedCreateUserWithEmailAndPassword.mockResolvedValue({ user: { /* Mock user data */ } });
    render(<CreateAccount />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@vanderbilt.edu' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));
    await waitFor(() => {
      expect(screen.getByText('Created Account Successfully!')).toBeInTheDocument();
      expect(mockedNavigate).toHaveBeenCalledWith('/about');
    });
  });

  it('shows an error for non-Vanderbilt email', async () => {
    render(<CreateAccount />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));
    expect(screen.getByText('Please use a Vanderbilt email')).toBeInTheDocument();
  });

  it('handles account creation failure', async () => {
    mockedCreateUserWithEmailAndPassword.mockRejectedValue(new Error('Firebase error'));
    render(<CreateAccount />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@vanderbilt.edu' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));
    await waitFor(() => {
      expect(screen.getByText('Failed to create account')).toBeInTheDocument();
    });
  });

  // Additional tests for edge cases and error scenarios
});
