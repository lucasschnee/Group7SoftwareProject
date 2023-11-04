import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Make sure this path is correct
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Footer from './Footer';

function Discussion() {
  const [announcements, setAnnouncements] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Reference to the discussions collection in Firestore
  const discussionsRef = collection(db, 'discussions');

  // Function to add a new post to Firestore
  const addPost = async () => {
    await addDoc(discussionsRef, {
      title: newTitle,
      content: newContent,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    fetchPosts(); // Re-fetch posts after adding
  };

  // Function to delete a post from Firestore
  const deletePost = async (id) => {
    const postDoc = doc(db, 'discussions', id);
    await deleteDoc(postDoc);
    fetchPosts(); // Re-fetch posts after deleting
  };

  // Function to fetch posts from Firestore
  const fetchPosts = async () => {
    const snapshot = await getDocs(discussionsRef);
    const posts = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setAnnouncements(posts);
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="discussion-board">
        <h2>Discussion Board</h2>
        
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Content"
        />
        <button onClick={addPost}>Add Post</button>

        <div className="announcements">
          {announcements.map(announcement => (
            <div key={announcement.id} className="announcement">
              <h3>{announcement.title}</h3>
              <p>{announcement.content}</p>
              <button onClick={() => deletePost(announcement.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Discussion;
