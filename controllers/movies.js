const ConflictError = require('../Errors/ConflictError');
const NotFoundError = require('../Errors/NotFoundError');
const Movie = require('../models/movie');

const getAllMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRu,
    nameEn,
  } = req.body;

  const movieOwner = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: movieOwner,
    movieId,
    nameRu,
    nameEn,
  })
    .then((movie) => {
      if (!movie) throw new NotFoundError('Фильм не был добавлен');
      movie
        .populate('owner')
        .then((movieInfo) => res.status(201).send(movieInfo))
        .catch(next);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => next(new NotFoundError('Фильм по указанному id не найден')))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new ConflictError('Вы не можете удалить фильм другого пользователя');
      }
      movie
        .deleteOne()
        .then(() => res.send(movie))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};
