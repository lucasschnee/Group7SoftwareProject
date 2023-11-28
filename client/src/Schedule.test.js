import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Schedule from './Schedule';

// Mocking the fetch function
global.fetch = jest.fn();

describe('Schedule component', () => {
  it('fetches and displays trainer information', async () => {
    // Mock the fetch calls
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        name: 'Test Trainer',
        Position: 'Fitness Trainer',
        Hometown: 'Test Town',
        Times: {
          Monday: 'available',
          Tuesday: 'booked',
        },
      }),
    });

    render(
      <Router>
        <Schedule />
      </Router>
    );

    // Wait for the fetch calls to resolve
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Assert that the fetched data is displayed correctly in the component
    expect(screen.getByText('Test Trainer')).toBeInTheDocument();
    expect(screen.getByText('Fitness Trainer')).toBeInTheDocument();
    expect(screen.getByText('Test Town')).toBeInTheDocument();
    expect(screen.getByText('Monday: available')).toBeInTheDocument();
    expect(screen.getByText('Tuesday: booked')).toBeInTheDocument();
  });

  it('filters trainers by search term', async () => {
    // Mock the fetch calls
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        name: 'Test Trainer',
        Position: 'Fitness Trainer',
        Hometown: 'Test Town',
        Times: {
          Monday: 'available',
        },
      }),
    });

    render(
      <Router>
        <Schedule />
      </Router>
    );

    // Simulate user typing in the search bar
    userEvent.type(screen.getByPlaceholderText('Search...'), 'Test Trainer');
    userEvent.click(screen.getByText('Submit'));

    // Wait for the fetch calls to resolve
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Assert that the fetched data is displayed correctly in the component
    expect(screen.getByText('Test Trainer')).toBeInTheDocument();
  });


  it('submits the booking successfully', async () => {
    // Mock the fetch calls
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        name: 'Test Trainer',
        Position: 'Fitness Trainer',
        Hometown: 'Test Town',
        Times: {
          Monday: 'available',
        },
      }),
    });

    render(
      <Router>
        <Schedule />
      </Router>
    );

    // Wait for the fetch calls to resolve
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Simulate user interactions to trigger a booking
    userEvent.click(screen.getByText('Monday: available'));
    userEvent.click(screen.getByText('Submit'));

    // Wait for the fetch calls to resolve
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    // Assert that the booking was successful
    expect(screen.getByText('Booking successful!')).toBeInTheDocument();
  });

  it('displays message when no trainers are found', async () => {
    // Mock the fetch calls to return an empty array
    fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce([]) });

    render(
      <Router>
        <Schedule />
      </Router>
    );

    // Wait for the fetch calls to resolve
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Assert that the "No trainers found" message is displayed
    expect(screen.getByText('No trainers found.')).toBeInTheDocument();
  });

  it('handles error during trainer fetch', async () => {
    // Mock the fetch calls to reject with an error
    fetch.mockRejectedValueOnce(new Error('Fetch error'));

    render(
      <Router>
        <Schedule />
      </Router>
    );

    // Wait for the fetch calls to resolve
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Assert that an error message is displayed
    expect(screen.getByText('Error fetching trainers. Please try again.')).toBeInTheDocument();
  });

  it('handles error during booking submission', async () => {
    // Mock the fetch calls to return trainer data and reject during booking submission
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        name: 'Test Trainer',
        Position: 'Fitness Trainer',
        Hometown: 'Test Town',
        Times: {
          Monday: 'available',
        },
      }),
    });
    fetch.mockRejectedValueOnce(new Error('Booking error'));

    render(
      <Router>
        <Schedule />
      </Router>
    );

    // Wait for the fetch calls to resolve
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Simulate user interactions to trigger a booking
    userEvent.click(screen.getByText('Monday: available'));
    userEvent.click(screen.getByText('Submit'));

    // Wait for the fetch calls to resolve
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    // Assert that the error message is displayed
    expect(screen.getByText('Booking failed. Please try again.')).toBeInTheDocument();
  });
});
