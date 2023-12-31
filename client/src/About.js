import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Footer from './Footer';

function About() {
  return (
    <div>
      <div className="info">

      <h3>Our Vision</h3>
<p>
To inspire and educate the Vanderbilt community on the fundamentals of fitness and nutrition. We believe that with the right guidance, everyone can unlock their potential, achieve their fitness goals, and lead a healthier, happier life.
</p>
<p>
Our goal goes beyond physical strength or endurance. It's about building a community that values well-being, education, and spreading happiness. We want to instill the importance of fitness and nutrition in every Vanderbilt student's life, helping them make informed and beneficial choices.
</p>


<h3>How It Works</h3>
<p>
Vandylifts is more than just a fitness club. It's a platform where seasoned trainers volunteer their time and expertise to train fellow students for free. Each trainee is paired with a dedicated trainer over multiple sessions, ensuring continuity and personalized attention.
</p>
<p>
Whether you are a fitness novice or just looking for guidance to fine-tune your workouts, we're here for you. Please use our <Link to="/schedule">scheduling feature</Link> to match with a trainer, or our <Link to="/discussion">discussion page</Link> to view new announcements.
</p>
</div>
      <p>Founded in 2022 by Melanie Leguizamon.</p>
      
      <Footer />
    </div>
  );
}

export default About;
