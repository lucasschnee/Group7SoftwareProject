import React, { useState, useEffect } from 'react';
import { db } from './firebase'; 
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Footer from './Footer';
import './Discussion.css'; 

function Discussion() {
  const [announcements, setAnnouncements] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');


  const discussionsRef = collection(db, 'discussions');


  const addPost = async () => {
    await addDoc(discussionsRef, {
      title: newTitle,
      content: newContent,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setNewTitle(''); 
    setNewContent(''); 
    fetchPosts(); 
  };

  
  const deletePost = async (id) => {
    const postDoc = doc(db, 'discussions', id);
    await deleteDoc(postDoc);
    fetchPosts(); 
  };


  const fetchPosts = async () => {
    const snapshot = await getDocs(discussionsRef);
    const posts = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toDate() 
    }));
    setAnnouncements(posts.sort((a, b) => b.createdAt - a.createdAt));
  };


  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };


  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="discussion-container">
      <div className="discussion-board">
        <h2>Discussion Board</h2>
        
        <div className="input-group">
          <input
            type="text"
            className="input-title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="input-content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Content"
          />
          <button className="btn-add-post" onClick={addPost}>Add Post</button>
        </div>

        <div className="announcements">
          {announcements.map(announcement => (
            <div key={announcement.id} className="announcement">
              <div className="announcement-header">
                <h3>{announcement.title}</h3>
                <span className="date-posted">{formatDate(announcement.createdAt)}</span>
              </div>
              <p className="announcement-content">{announcement.content}</p>
              <button className="btn-delete-post" onClick={() => deletePost(announcement.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Discussion;
