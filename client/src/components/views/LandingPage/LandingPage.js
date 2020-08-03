import React, { useState, useEffect } from './node_modules/react'
import axios from './node_modules/axios';
import { withRouter } from './node_modules/react-router-dom'; 
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../../Config';
import MainImage from './Sections/MainImage';

function LandingPage(props) {

  const [movies, setMovies] = useState([]);
  const [mainMovieImage, setMainMovieImage] = useState(null);

  useEffect(() => {
    const endpoint= `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    
    fetch(endpoint) // 영화 정보를 가져온다. 
      .then(response => response.json())
      .then(response => {
        setMovies([response.results]);
        setMainMovieImage(response.results[0]);
      });
    }, [])

  return (
    <div style={{ width: '100%', margin: '0' }}>
      {mainMovieImage && 
        <MainImage image={`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`} 
          title={mainMovieImage.original_title}
          overview={mainMovieImage.overview}
        />
      }
      <div style={{ width: '85%', margin: '1rem auto' }}>
        <h2>Movies by latest</h2>
        <hr />
        {/* movies grid cards */}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button> Load More </button>
      </div>
    </div>
  )
}

export default withRouter(LandingPage)
