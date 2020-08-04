import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../../Config';
import MainImage from '../commons/MainImage';
import GridCards from '../commons/GridCards'
import { Row } from 'antd'

function LandingPage(props) {

  const [movies, setMovies] = useState([]);
  const [mainMovieImage, setMainMovieImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchMovies = (endpoint) => {
    fetch(endpoint) // 영화 정보를 가져온다. 
    .then(response => response.json())
    .then(response => {
      setMovies([...movies, ...response.results]);
      setMainMovieImage(response.results[0]);
      setCurrentPage(response.page)
    });
  }

  useEffect(() => {
    const endpoint= `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
    }, [])

  const onClickLoadMore = () => {
    const endpoint= `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
    fetchMovies(endpoint);
  }

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
        <Row gutter={[16, 16]} >
          {movies && movies.map((movie, index) => (
            <div key={index}>
              <GridCards
                landingPage
                image={movie.poster_path ?
                  `${IMAGE_BASE_URL}w400${movie.poster_path}` : null}
                movieId={movie.id}
                movieName={movie.original_title}
              />
            </div>
          ))}
        </Row>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={onClickLoadMore}> Load More </button>
      </div>
    </div>
  )
}

export default withRouter(LandingPage)
