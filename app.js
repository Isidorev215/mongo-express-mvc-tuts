const express = require('express');
const { connectToDb } = require('./config/db');


// init app and middleware

const app = express();

// db connection
connectToDb((err) => {
  if(!err){
    app.listen(3000, () => {
      console.log('app Listening on port 3000')
    })
  }
})


// routes
app.use('/books', require('./routes/booksRoute'))

// error handle
// app.use((err, req, res, next) => {
//   res.status(500).send(err);
// })


