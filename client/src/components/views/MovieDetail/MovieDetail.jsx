import React,{ useState, useEffect } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../../Config';
import { withRouter } from 'react-router-dom';
import MainImage from '../commons/MainImage';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
import GridCards from '../commons/GridCards';
import { Row } from 'antd'

function MovieDetail(props) {
  const [movie, setMovie] = useState([]);
  const [casts, setCasts] = useState([]);
  const [actorToggle, setActorToggle] = useState(false);

  let movieId = props.match.params.movieId;
  useEffect(() => {

    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

    fetch(endpointInfo)
      .then(response => response.json())
      .then(response => {
        setMovie(response);
      })

    fetch(endpointCrew)
      .then(response => response.json())
      .then(response => {
        setCasts(response.cast)
      })
  }, [])

  const onClickToggle = () => {
    setActorToggle(prev => !prev);
  }

  return (
    <div>
      {/* header */}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`} 
        title={movie.original_title}
        overview={movie.overview}
      />
      {/* body */}
      <div style={{ width: '85%', margin: '1rem auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <Favorite movieInfo={movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
        </div>
        {/* movie info */}
        <MovieInfo movie={movie} />
        <br />
    
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
          <button onClick={onClickToggle}>Toggle Actor View</button>
        </div>
        {/* Actors grid */}
        {actorToggle &&
        <Row gutter={[16, 16]} >
          {casts && casts.slice(0,4).map((cast, index) => (
              <div key={index}>
                <GridCards
                  image={cast.profile_path ?
                    `${IMAGE_BASE_URL}w400${cast.profile_path}` : null}
                    characterName={cast.character}
                />
              </div>
            ))}
        </Row>
        }
      </div>
    </div>
  )
}

export default withRouter(MovieDetail);
