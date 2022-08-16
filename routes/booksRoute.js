const express = require('express');
const router = express.Router();
const Books = require('../models/Books')

router.get('/', (req, res) => {
  Books.getAllDocs()
  .then(books => res.status(200).json(books))
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'Server Error'})
  })
})

router.get('/:id', (req, res) => {
  let id = req.params.id;
  Books.getOneDoc(id)
  .then(book => res.status(200).json(book))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})




module.exports = router;
