import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button } from 'antd';

function Favorite({ movieInfo, movieId, userFrom }) {

  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const movieTitle = movieInfo.title;
  const moviePost = movieInfo.backdrop_path;
  const movieRunTime = movieInfo.runtime;

  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime
  }

  useEffect(() => {
    // 서버에 요청을 해서 DB에 있는 정보를 가져온다. 
    Axios.post('/api/favorite/favoriteNumber', variables)
      .then(response => {
        if(response.data.success){
          setFavoriteNumber(response.data.favoriteNumber);
        } else {
          alert('숫자 정보를 가져오는데 실패했습니다.')
        }
      })

    Axios.post('/api/favorite/favorited', variables)
      .then(response => {
        console.log('result',response.data)
        if(response.data.success){
          setFavorited(response.data.favorited)
        } else {
          alert('정보를 가져오는데 실패했습니다.')
        }
      })
  }, [])

  const onClickFavorite = () => {
    if(favorited){ // 이미 favorite 상태일 때
      Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
          if(response.data.success){
            setFavorited(prev => !prev);
            setFavoriteNumber(prev => prev - 1);
          } else {
            alert('favorite 삭제를 실패했습니다.')
          }
        })
    } else { // favorite 상태가 아닐 때
      Axios.post('/api/favorite/addToFavorite', variables)
        .then(response => {
          if(response.data.success){
            setFavorited(prev => !prev);
            setFavoriteNumber(prev => prev + 1);
          } else {
            alert('favorite 삭제를 실패했습니다.')
          }
        })
    }
  }


  return (
    <div>
      <Button onClick={onClickFavorite}>{favorited ? "Cancel Favorite" : "Add to Favorite"} {favoriteNumber}</Button>
    </div>
  )
}

export default Favorite
