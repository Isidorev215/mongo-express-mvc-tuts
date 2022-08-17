const express = require('express');
const router = express.Router();
const Books = require('../models/Books');

router.get('/', (req, res, next) => {
  const page = req.query.page;
  Books.getAllDocs({page})
  .then(books => res.status(200).json(books))
  .catch(err => {
    next(err);
  })
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Books.getOneDoc(id)
  .then(book => res.status(200).json(book))
  .catch(err => {
    next(err);
  })
})

router.post('/', (req, res, next) => {
  let book = req.body;
  Books.addOneDoc(book)
  .then(result => res.status(201).json(result))
  .catch(err => {
    next(err);
  })
})

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Books.deleteDoc(id)
  .then(result => res.status(200).json(result))
  .catch(err => {
    next(err);
  })
})

router.patch('/:id', (req, res, next) => {
  let id = req.params.id;
  let updates = req.body;
  Books.updateDoc(id, updates)
  .then(result => res.status(200).json(result))
  .catch(err => {
    next(err);
  })
})

module.exports = router;
