const { ObjectId } = require('mongodb');
const { getDb } = require('../config/db');


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
  getOneDoc: (doc_id) => {
    return new Promise(async (resolve, reject) => {
      const db = getDb();
      try {
        if(!ObjectId.isValid(doc_id)) throw 'Not Valid Document';
        let doc = await db.collection('books').findOne({_id: ObjectId(doc_id)});
        if(!doc) throw "Book doesn't exist";
        resolve(doc);
      }catch(error){
        reject(error);
      }
    })
  }
}

