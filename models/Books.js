const { ObjectId } = require('mongodb');
const { getDb } = require('../config/db');


module.exports = {
  getAllDocs: (obj_arg) => {
    return new Promise(async (resolve, reject) => {
      const db = getDb();
      const { page = 1 } = obj_arg;
      const perPage = 3;
      try {
        let books = [];
        await db.collection('books').find().sort({author: 1}).skip(perPage * page - 1).limit(perPage).forEach(book => {
          books.push(book)
        })
        const totalDocuments = await db.collection('books').estimatedDocumentCount({})
        resolve({
          current_page: page,
          total: totalDocuments,
          data: books,
          per_page: perPage
        })
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
  },
  addOneDoc: (doc) => {
    return new Promise(async (resolve, reject) => {
      const db = getDb();
      try {
        let result = await db.collection('books').insertOne(doc)
        resolve(result)
      } catch(error){
        reject(error)
      }
    })
  },
  deleteDoc: (doc_id) => {
    return new Promise(async (resolve, reject) => {
      const db = getDb();
      try {
        if(!ObjectId.isValid(doc_id)) throw 'Not Valid Document';
        let result = await db.collection('books').deleteOne({_id: ObjectId(doc_id)})
        resolve(result)
      }catch(error){
        reject(error);
      }
    });
  },
  updateDoc: (doc_id, updates) => {
    return new Promise(async (resolve, reject) => {
      const db = getDb();
      try {
        if(!ObjectId.isValid(doc_id)) throw 'Not Valid Document';
        let result = await db.collection('books').updateOne({_id: ObjectId(doc_id)}, {$set: updates})
        resolve(result)
      }catch(error){
        reject(error);
      }
    });
  }
}
