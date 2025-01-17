const { Router } = require('express');
const getMovies = require('../../controllers/movie-controller/getMovies');
const getById = require('../../controllers/movie-controller/getMoviesById');
const postMovies = require('../../controllers/movie-controller/postMovies');
const putMovies = require('../../controllers/movie-controller/putMovies');
const deleteMovies = require('../../controllers/movie-controller/deleteMovies');
const tokenVerify = require('../../middlewars/tokenAuth')

const router = Router()

router.get('/', getMovies)
router.get('/:id', getById)
router.post('/createMovie', tokenVerify, postMovies)
router.delete('/deleteMovie/:id', deleteMovies)
router.put('/editMovie/:id', putMovies)

// router.get('/', getMovies)
// router.get('/:id', getById)
// router.post('/createMovie', postMovies)
// router.delete('/deleteMovie/:id', deleteMovies)
// router.put('/editMovie/:id', putMovies)

module.exports = router