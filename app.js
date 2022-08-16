const { ObjectId } = require('mongodb')
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

app.get('/books/:id', (req, res) => {
  let id = req.params.id;
  if(ObjectId.isValid(id)){
    db.collection('books').findOne({_id: ObjectId(id)})
    .then(doc => {
      if(!doc) throw 'Book doesnt exist';
      res.status(200).json(doc)
    })
    .catch(() => res.status(500).json({error: 'Could not fetch document'}))
  }
  else{
    res.status(500).json({error: 'Not valid document'})
  }

})
