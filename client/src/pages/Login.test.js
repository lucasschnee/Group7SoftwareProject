import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Login from './Login';
import { useNavigate } from "react-router-dom";

jest.mock("firebase/auth");
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  const mockedNavigate = useNavigate;
  const mockedSignInWithEmailAndPassword = signInWithEmailAndPassword;

  beforeEach(() => {
    mockedNavigate.mockImplementation(() => jest.fn());
    mockedSignInWithEmailAndPassword.mockClear();
  });

  it('renders email and password input fields and login button', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('allows entering email and password', () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    expect(screen.getByLabelText('Email').value).toBe('test@example.com');
    expect(screen.getByLabelText('Password').value).toBe('password123');
  });

  it('handles successful login', async () => {
    mockedSignInWithEmailAndPassword.mockResolvedValue({ user: { /* Mock user data */ } });
    render(<Login />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@domain.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/about');
      expect(screen.getByText('Logging in')).toBeInTheDocument();
    });
  });

  it('displays an error message on login failure', async () => {
    mockedSignInWithEmailAndPassword.mockRejectedValue(new Error('Login failed'));
    render(<Login />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@domain.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    await waitFor(() => {
      expect(screen.getByText('Could not login. Try again.')).toBeInTheDocument();
    });
  });
});

