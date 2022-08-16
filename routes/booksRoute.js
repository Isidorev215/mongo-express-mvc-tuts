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

module.exports = router;
