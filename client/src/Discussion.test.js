import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Discussion from './Discussion';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';


jest.mock('./firebase', () => ({
  db: {},
  collection: jest.fn(),
  addDoc: jest.fn(),
}));


const addPostToFirestore = async (title, content) => {

  return await addDoc.mockResolvedValue({
    id: 'abc123', 
    title,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

describe('Discussion component', () => {
  it('allows the user to add a post', async () => {
    render(<Discussion />);


    const titleInput = screen.getByPlaceholderText('Title');
    const contentInput = screen.getByPlaceholderText('Content');
    const addButton = screen.getByRole('button', { name: 'Add Post' });


    userEvent.type(titleInput, 'Test Title');
    userEvent.type(contentInput, 'Test Content');


    collection.mockReturnValue({});


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
});
