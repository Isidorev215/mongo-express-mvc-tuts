const { ObjectId } = require("mongodb");
const express = require("express");
const { connectToDb, getDb } = require("./db");

// init app and top-level middlewares
const app = express();
app.use(express.json());

// db connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("app Listening on port 3000");
    });
  }
  db = getDb();
});

// routes
app.get("/books", async (req, res) => {
  // cuurent page
  const page = req.query.page || 1;
  const booksPerPage = 3;

  let books = [];
  try {
    await db
      .collection("books")
      .find()
      .sort({ author: 1 })
      .skip(booksPerPage * page - 1)
      .limit(booksPerPage)
      .forEach((book) => {
        books.push(book);
      });
    const totalDocuments = await db.collection('books').estimatedDocumentCount({})
    res.status(200).json({
      total: totalDocuments,
      data: books,
      per_page: booksPerPage
    });
  } catch (error) {
    res.status(500).json({ error: "Could Not fetch documents" });
  }
});

app.get("/books/:id", (req, res) => {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    db.collection("books")
      .findOne({ _id: ObjectId(id) })
      .then((doc) => {
        if (!doc) throw "Book doesnt exist";
        res.status(200).json(doc);
      })
      .catch(() => res.status(500).json({ error: "Could not fetch document" }));
  } else {
    res.status(500).json({ error: "Not valid document" });
  }
});

app.post("/books", (req, res) => {
  const book = req.body;
  db.collection("books")
    .insertOne(book)
    .then((result) => res.status(201).json(result))
    .catch((err) =>
      res.status(500).json({ error: "Could not create a new document" })
    );
});

app.delete("/books/:id", (req, res) => {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    db.collection("books")
      .deleteOne({ _id: ObjectId(id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) =>
        res.status(500).json({ error: "Could not delete document" })
      );
  } else {
    res.status(500).json({ error: "Not valid document" });
  }
});

app.patch("/books/:id", (req, res) => {
  let updates = req.body;
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    db.collection("books")
      .updateOne({ _id: ObjectId(id) }, { $set: updates })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) =>
        res.status(500).json({ error: "Could not make updates to document" })
      );
  } else {
    res.status(500).json({ error: "Not valid document" });
  }
});
