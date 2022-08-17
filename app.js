const express = require('express');
const { connectToDb } = require('./config/db');


// init app and middleware
const app = express();
app.use(express.json());


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
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500).send({
    error: {
      statusCode: err.statusCode || 500,
      message: err.message || 'Internal Server Error'
    }
  })
})

// catch 404 error
app.use((req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Not Found'
  })
})



