import React from 'react'
import { Col } from 'antd';

function GridCards({ landingPage, image, movieId, movieName, characterName }) {
  
  if(landingPage) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative'}}>
          <a href={`/movie/${movieId}`}>
            <img src={image} alt={movieName}/>
          </a>
        </div>
      </Col>
    )
  } else { // cast 부분
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative'}}>
            <img src={image} alt={characterName}/>
        </div>
      </Col>
    )
  }

  
}

export default GridCards
