import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Discussion from './Discussion';
import { db } from './App';
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  db: {},
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(),
  deleteDoc: jest.fn(),
}));

// Mock data for posts
const mockPosts = [
  {
    id: '123',
    title: 'First Post',
    content: 'Content of the first post',
    createdAt: { toDate: () => new Date('2021-04-20T20:20:20Z') },
  },
  {
    id: '456',
    title: 'Second Post',
    content: 'Content of the second post',
    createdAt: { toDate: () => new Date('2021-04-21T20:20:20Z') },
  },
];

// Mock implementation for getting documents from Firestore
getDocs.mockResolvedValue({
  docs: mockPosts.map(post => ({
    id: post.id,
    data: () => post,
  })),
});

describe('Discussion component', () => {
  beforeEach(() => {
    // Reset the mocks before each test
    jest.clearAllMocks();
  });

  it('allows the user to add a post', async () => {
    render(<Discussion />);

    const titleInput = screen.getByPlaceholderText('Title');
    const contentInput = screen.getByPlaceholderText('Content');
    const addButton = screen.getByRole('button', { name: 'Add Post' });

    userEvent.type(titleInput, 'Test Title');
    userEvent.type(contentInput, 'Test Content');

    userEvent.click(addButton);

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledWith(
        expect.anything(),
        {
          title: 'Test Title',
          content: 'Test Content',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }
      );
    });
  });

  it('displays posts from Firestore', async () => {
    render(<Discussion />);

    // Wait for the posts to be fetched and displayed
    await waitFor(() => {
      expect(getDocs).toHaveBeenCalledTimes(1);
      expect(screen.getByText('First Post')).toBeInTheDocument();
      expect(screen.getByText('Content of the first post')).toBeInTheDocument();
      expect(screen.getByText('Second Post')).toBeInTheDocument();
      expect(screen.getByText('Content of the second post')).toBeInTheDocument();
    });
  });

  it('allows the user to delete a post', async () => {
    render(<Discussion />);

    // Wait for the posts to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('First Post')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(deleteDoc).toHaveBeenCalledWith(
        expect.anything() // You would have to check for the correct reference being passed
      );
    });
  });

  // More tests can be added for additional functionalities like error handling, etc.
});
