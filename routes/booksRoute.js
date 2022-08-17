const express = require('express');
const router = express.Router();
const Books = require('../models/Books');

router.get('/', (req, res) => {
  const page = req.query.page;
  Books.getAllDocs({page})
  .then(books => res.status(200).json(books))
  .catch(err => {
    res.status(500).json({error: err.message})
  })
})

router.get('/:id', (req, res) => {
  let id = req.params.id;
  Books.getOneDoc(id)
  .then(book => res.status(200).json(book))
  .catch(err => {
    res.status(500).json({error: err.message});
  })
})

router.post('/', (req, res) => {
  let book = req.body;
  Books.addOneDoc(book)
  .then(result => res.status(201).json(result))
  .catch(err => {
    res.status(500).json({error: err.message})
  })
})

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  Books.deleteDoc(id)
  .then(result => res.status(200).json(result))
  .catch(err => {
    res.status(500).json({error: err.message})
  })
})

router.patch('/:id', (req, res) => {
  let id = req.params.id;
  let updates = req.body;
  Books.updateDoc(id, updates)
  .then(result => res.status(200).json(result))
  .catch(err => {
    res.status(500).json({error: err.message})
  })
})

module.exports = router;
