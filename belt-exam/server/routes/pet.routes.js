const petController = require('../controllers/pet.controller');
const router = require('express').Router();

//    /resource/:id   => after index.js it goes to /books/:id
// and /api/books/:id

module.exports = router
  .get('/', petController.index)
  .get('/:pet_id', petController.show)
  .post('/', petController.create)
  .put('/:pet_id', petController.update)
  .put('/:pet_id/like', petController.like)
  .delete('/:pet_id', petController.destroy)
