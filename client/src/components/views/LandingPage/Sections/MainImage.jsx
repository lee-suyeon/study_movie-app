import React, { useState, useEffect } from './node_modules/react'
import { Typography } from './node_modules/antd';

const { Title } = Typography;

function MainImage({ image, title, overview }) {
  return (
    <div>
      <div style={{ position: 'relative', width: '100%', height: '500px',        
                background:`linear-gradient(to bottom, rgba(0,0,0,0) 39%,rgba(0,0,0,0) 41%,rgba(0,0,0,0.65) 100%),
            url('${image}'), #1c1c1c`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%, cover',
            backgroundPosition: 'center, center',
            }}>
        <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem' }} >
          <Title style={{ color: 'white' }} level={2} > {title} </Title>
          <p style={{ color: 'white', fontSize: '1rem' }}  >{overview} </p>
        </div>
      </div>
    </div>
  )
}

export default MainImage
