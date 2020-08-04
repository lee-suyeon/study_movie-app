const express = require('express')
const router = express.Router();
const { Favorite } = require('../models/Favorite');


router.post('/favoriteNumber', (req, res) => {
  //req.body -> body파서를 통해 프론트에서 보내준 데이터를 받을 수 있다.
  // mongoDB에서 favorite 숫자를 가져오기
  // Favorite 모델 필드 movieId와 클라이언트에서 보내준 movieId와 같은 정보를 찾아달라는 요청 
  Favorite.find({ 'movieId' : req.body.movieId })
    .exec(( err, info ) => { // info에 찾은 정보가 들어가 있다. 
      if(err) return res.status(400).send(err)
      // 그 다음에 프론트에 다시 숫자 정보를 보내주기
      res.status(200).json({ success: true, favoriteNumber: info.length })
    })
})


router.post('/favorited', (req, res) => {
  // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기
  Favorite.find({ 'movieId' : req.body.movieId, 'userFrom': req.body.userFrom })
    .exec(( err, info ) => {
      if(err) return res.status(400).send(err)
      let result = false; // 아직 favorite 리스트에 영화가 없는 상태
      if(info.length !== 0){ 
        result = true;
      }
      res.status(200).json({ success: true, favorited: result })
    })
})


router.post('/cancelFavorite', (req, res) => {
  Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
    .exec(( err, doc ) => {
      if(err) return res.status(400).send(err)
      res.status(200).json({ success: true, doc });
    })
})


router.post('/addToFavorite', (req, res) => {
  // 클라이언트에서 보내온 정보로 인스턴스를 만들어 준다. 
  const favorite = new Favorite(req.body)

  // favorite document에 저장해준다. 
  favorite.save(( err, doc ) => {
    if(err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  })
});


router.post('/getFavoritedMovie', (req, res) => {
  Favorite.find({ 'userFrom' : req.body.userFrom })
    .exec(( err, favorites ) => {
      if(err) return res.status(400).send(err)
      return res.status(200).json({ success: true, favorites })
    })
})


router.post('/removeFromFavorite', (req, res) => {
  Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
    .exec(( err, result ) => {
      if(err) return res.status(400).send(err)
      return res.status(200).json({ success: true, result });
    })
})


module.exports = router;