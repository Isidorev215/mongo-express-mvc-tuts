const { getDb } = require('../config/db')

module.exports = {
  getAllDocs: () => {
    return new Promise(async (resolve, reject) => {
      const db = getDb();
      try {
        let books = [];
        await db.collection('books').find().sort({author: 1}).forEach(book => {
          books.push(book)
        })
        resolve(books)
      }catch(error) {
        reject(error)
      }
    })
  },
  // getOneDoc
}


