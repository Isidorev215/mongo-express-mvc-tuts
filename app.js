const express = require('express');
const { connectToDb, getDb } = require('./db')

// init app and middleware

const app = express();

// db connection
let db;
connectToDb((err) => {
  if(!err){
    app.listen(3000, () => {
      console.log('app Listening on port 3000')
    })
  }
  db = getDb();
})


// routes
app.get('/books', (req, res) => {
  let books = [];
  db.collection('books').find().sort({ author: 1 }).forEach(book => {
    books.push(book)
  })
  .then(() => res.status(200).json(books))
  .catch(() => res.status(500).json({error: 'Could Not fetch documents'}))

})
