import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './favorite.css';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../../Config';

function FavoritePage() {

  const [favorites, setFavorites] = useState([]);
  let userId = localStorage.getItem('userId');


  useEffect(() => {
    fetchFavoriteMovie();
  }, [])

  const fetchFavoriteMovie = () => {
    Axios.post('/api/favorite/getFavoritedMovie', { userFrom : userId })
      .then(response => {
        if(response.data.success){
          console.log("favo",response.data.favorites);
          setFavorites(response.data.favorites);
        } else {
          alert('영화 정보를 가져오는데 실패했습니다');
        }
      })
  }

  const onClickRemove = (movieId, userFrom) => {
    const variable = {
      movieId,
      userFrom,
    }

    Axios.post('/api/favorite/cancelFavorite', variable)
      .then(response => {
        if(response.data.success){
          fetchFavoriteMovie();
        }else {
          alert('삭제하는데 실패')
        }
      })
  }

  const renderCards = favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? 
          <img src={`${IMAGE_BASE_URL}w300${favorite.moviePost}`} alt={favorite.movieTitle} /> :
          "no Image"
        }
      </div>
    )

    return <tr key={index}>
      <Popover content={content} title={`${favorite.movieTitle}`}>
        <td>{favorite.movieTitle}</td>
      </Popover>
      <td>{favorite.movieRunTime} mins</td>
      <td><button onClick={() => onClickRemove(favorite.movieId, favorite.userFrom)}>Remove</button></td>
    </tr>
  })

  return (
    <div style={{ width: '85%', margin: '3rem auto'}}>
      <h2>Favorite Movies</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <th>Remove from favorites</th>
          </tr>
        </thead>
        <tbody>
          {renderCards}
        </tbody>
      </table>
    </div>
  )
}

export default FavoritePage
