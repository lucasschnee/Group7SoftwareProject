import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from './Profile';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../App";

jest.mock("react-firebase-hooks/auth");

describe('Profile Component', () => {
    const mockUseAuthState = useAuthState;

    beforeEach(() => {
        mockUseAuthState.mockClear();
    });

    it('renders profile component', () => {
        mockUseAuthState.mockReturnValue([null, false, null]);
        render(<Profile />);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });

    it('displays user UID when logged in', () => {
        const mockUser = { uid: '123456' };
        mockUseAuthState.mockReturnValue([mockUser, false, null]);
        render(<Profile />);
        expect(screen.getByText(mockUser.uid)).toBeInTheDocument();
    });

    it('does not display user UID when not logged in', () => {
        mockUseAuthState.mockReturnValue([null, false, null]);
        render(<Profile />);
        expect(screen.queryByText(/^[0-9a-fA-F]+$/)).not.toBeInTheDocument();
    });

    // Test for loading state
    it('displays loading state appropriately', () => {
        mockUseAuthState.mockReturnValue([null, true, null]);
        render(<Profile />);
        // Render a loading message or indicator when loading is true
        // Expect statement for the loading indicator
    });

    // Test for error state
    it('displays error message when there is an error', () => {
        const mockError = { message: 'Error message' };
        mockUseAuthState.mockReturnValue([null, false, mockError]);
        render(<Profile />);
        // Expect statement to check for the error message
    });

    // Additional tests for any other logic or conditional rendering in your component
});
