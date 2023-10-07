import React, { useState } from 'react';
import Footer from './Footer';

function Discussion() {
    const [announcements, setAnnouncements] = useState([
        { id: 1, title: 'Welcome to our new website!', content: 'We are excited to unveil our new website. Let us know your thoughts.' },
        { id: 2, title: 'New trainers joining', content: 'We are happy to announce two new trainers joining our team next month.' },
        // Add more announcements as you like
    ]);

    return (
        <div>
            <h2>Discussion Board</h2>
            
            <div className="announcements">
                {announcements.map(announcement => (
                    <div key={announcement.id} className="announcement">
                        <h3>{announcement.title}</h3>
                        <p>{announcement.content}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Discussion;
