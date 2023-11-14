import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';


// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import Login from './Login';
// import { useNavigate } from "react-router-dom";


// Mocking the fetch function
global.fetch = jest.fn();

describe('Header component', () => {
  it('fetches and displays user information', async () => {
    // Mock the fetch calls
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce('User Message'),
    });

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce('Trainer Name'),
    });

    render(
      <Router>
        <Header />
      </Router>
    );

    // Wait for the fetch calls to resolve
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    // Assert that the fetched data is displayed in the component
    expect(screen.getByText('User Message')).toBeInTheDocument();
    expect(screen.getByText('Trainer Name')).toBeInTheDocument();
  });

  it('navigates to the correct routes when links are clicked', async () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    // Simulate user clicks on the navigation links
    userEvent.click(screen.getByText('About'));
    expect(window.location.pathname).toBe('/about');

    userEvent.click(screen.getByText('Meet the Trainers'));
    expect(window.location.pathname).toBe('/trainers');

    userEvent.click(screen.getByText('Schedule'));
    expect(window.location.pathname).toBe('/schedule');

    userEvent.click(screen.getByText('Discussion'));
    expect(window.location.pathname).toBe('/discussion');

    userEvent.click(screen.getByText('Login'));
    expect(window.location.pathname).toBe('/login');

    userEvent.click(screen.getByText('Create Account'));
    expect(window.location.pathname).toBe('/create-account');

    userEvent.click(screen.getByText('Profile'));
    expect(window.location.pathname).toBe('/profile');
  });
});
