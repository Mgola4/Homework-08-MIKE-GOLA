import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Your Unsplash API Access Key
  let ACCESS_KEY = `ml29tyG0VLP8jqHfeNEuzt9x78Lo-P0e6nEpm6Q96s8`; // Replace this with your access key`;

  // Fetch photos from Unsplash API
  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);

    let url = `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&per_page=20&page=1`;
    
    // If a search query exists, add it to the URL
    if (query) {
      url = `https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&query=${query}&per_page=20&page=1`;
    }

    try {
      const response = await axios.get(url);
      //setPhotos(response.data);

      if(response.data.results){
          setPhotos(response.data.results);
      }
      else{
          setPhotos(response.data);
      }
      setLoading(false);
    } catch (err) {
      setError('Error fetching photos.');
      setLoading(false);
    }
  };

  // Fetch photos when component mounts or query changes
  useEffect(() => {
    fetchPhotos();
  }, [query]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Art Gallery</h1>
      
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for photos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Error message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Loading spinner */}
      {loading && <div className="text-center">Loading...</div>}

      {/* Photo grid */}
      <div className="row">
        {photos.map((photo) => (
          <div key={photo.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={photo.urls.small}
                alt={photo.alt_description}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{photo.user.name}</h5>
                <a
                  href={photo.user.portfolio_url}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
