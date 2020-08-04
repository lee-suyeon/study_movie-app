import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Favorite({ movieInfo, movieId, userFrom }) {

  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const movieTitle = movieInfo.title;
  const moviePost = movieInfo.backdrop_path;
  const movieRunTime = movieInfo.runtime;

  useEffect(() => {
    console.log('userFrom', userFrom);
    let variables = {
      userFrom: userFrom,
      movieId: movieId,
    }

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


  return (
    <div>
      <button>{favorited ? "Not Favorite" : "Add to Favorite"} {favoriteNumber}</button>
    </div>
  )
}

export default Favorite
