import React from 'react'
import { Col } from 'antd';

function GridCards({ image, movieId, movieName }) {
  return (
    <Col lg={6} md={8} xs={24}>
      <div style={{ position: 'relative'}}>
        <a shref={`/movie/${movieId}`}>
          <img src={image} alt={movieName}/>
        </a>
      </div>
    </Col>
  )
}

export default GridCards
