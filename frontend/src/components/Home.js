// src/components/HomePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import your images
import addStoryImage from '../images/add_story_image.jpg';
import rehabStoriesImage from '../images/rehab_stories_image.jpg';
import mapsImage from '../images/maps_image.jpg';
import headerImage from '../images/bg2.jpeg';

const Home = () => {
  const [userName, setUserName] = useState(localStorage.getItem('user_name') || '');
  const [anonymous, setAnonymous] = useState(false);
  const [storyTitle, setStoryTitle] = useState('');
  const [storyDescription, setStoryDescription] = useState('');
  const [storyImage, setStoryImage] = useState('');

  const handleAnonymousChange = () => {
    setAnonymous((prev) => !prev);
    // Clear the user's name if they choose to be anonymous
    if (anonymous) {
      setUserName('');
    }
  };

  const handleStorySubmit = async (e) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:4000/posts'; // Update with your API endpoint

    const requestBody = {
      title: storyTitle,
      description: storyDescription,
      anonymous,
      image: storyImage,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log('Story submitted successfully!');
        // You can add additional logic here, such as clearing the form
      } else {
        console.error('Failed to submit story:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting story:', error.message);
    }
  };

  return (
    
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <nav style={{ backgroundColor: '#333', padding: '10px', color: 'white', textAlign: 'center' }}>
      <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
        Home
      </Link>
      <Link to="/about" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
        About
      </Link>
      <Link to="/contact" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
        Contact
      </Link>
    </nav>
      {/* Header Image */}
      <img src={headerImage} alt="Header" style={{ width: '100%', borderRadius: '10px' }} />

      {/* Quote Section */}
      <div style={{ marginBottom: '20px', color: '#555', fontStyle: 'italic' }}>
        <blockquote>
          "Recovery is not for people who need it; it's for people who want it."
          <br />- Anonymous
        </blockquote>
      </div>

      {/* Add Your Story Section */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', marginBottom: '40px' }}>
        <h2 style={{ color: '#333' }}>Add Your Story</h2>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', marginRight: '20px' }}>
            <img src={addStoryImage} alt="Add Your Story" style={{ maxWidth: '100%', borderRadius: '10px' }} />
          </div>
          <div style={{ flex: '2', textAlign: 'left' }}>
            <form onSubmit={handleStorySubmit}>
              <label style={{ display: 'block', marginBottom: '10px', color: '#555' }}>
                Story Title:
                <input
                  type="text"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px' }}
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px', color: '#555' }}>
                Your Story:
                <textarea
                  style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px' }}
                  placeholder="Share your journey..."
                  rows="4"
                  cols="50"
                  value={storyDescription}
                  onChange={(e) => setStoryDescription(e.target.value)}
                ></textarea>
              </label>
              <label style={{ display: 'block', marginBottom: '10px', color: '#555' }}>
                Your Name:
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{ marginLeft: '5px', marginRight: '10px' }}
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px', color: '#555' }}>
                Story Image:
                <input
                  type="text"
                  value={storyImage}
                  onChange={(e) => setStoryImage(e.target.value)}
                  style={{ marginLeft: '5px', marginRight: '10px' }}
                />
              </label>
              <label style={{ display: 'block', marginBottom: '10px', color: '#555' }}>
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={handleAnonymousChange}
                  style={{ marginRight: '5px' }}
                />
                Keep it Anonymous
              </label>
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Rehab Stories Section */}
      <div style={{ marginBottom: '40px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', textAlign: 'left' }}>
        <h2 style={{ color: '#333' }}>Rehab Stories</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', marginRight: '20px' }}>
            <img src={rehabStoriesImage} alt="Rehab Stories" style={{ maxWidth: '100%', borderRadius: '10px' }} />
          </div>
          <div style={{ flex: '2' }}>
            {/* Display rehab stories, you can fetch and display data from your backend or use static data */}
            {/* Example: */}
            <div style={{ marginBottom: '20px' }}>
              <p>
                <strong>John's Story:</strong> Overcoming addiction and finding a new purpose in life...
              </p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <p>
                <strong>Amy's Journey:</strong> From struggle to recovery...
              </p>
            </div>
            {/* Add more stories as needed */}
          </div>
        </div>
      </div>

      {/* Maps Page Redirect Section */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ color: '#333' }}>Find Nearest Rehab Centers</h2>
        <img src={mapsImage} alt="Find Nearest Rehab Centers" style={{ maxWidth: '100%', borderRadius: '10px', marginTop: '10px' }} />
        {/* Redirect to the maps page using react-router-dom Link */}
        <Link to="/maps" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Go to Maps
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
