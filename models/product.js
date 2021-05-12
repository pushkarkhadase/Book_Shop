const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;
class Product {
  constructor(
    bookName,
    bookImage,
    bookDescription,
    bookAuthors,
    bookGenre,
    bookTotalPages,
    bookCost,
    bookDate,
    bookReviews,
    bookPublication,
    bookPublicationYear,
    id
  ) {
    this.bookName = bookName;
    this.bookImage = bookImage;
    this.bookGenre = bookGenre;
    this.bookCost = bookCost;
    this.bookDate = bookDate;
    this.bookDescription = bookDescription;
    this.bookAuthors = bookAuthors;
    this.bookTotalPages = bookTotalPages;
    this.bookReviews = bookReviews;
    this.bookPublication = bookPublication;
    this.bookPublicationYear = bookPublicationYear;
    this._id = id;
  }
  save() {
    const db = getDb();
    let dbOp;
    console.log("logging the the object bookCost");
    console.log(this.bookCost);
    if (this._id) {
      // Logic to update the product
      console.log("--------------------------------------------------------");
      console.log(this._id);
      console.log("alreadying existing id's if loop is working");
      dbOp = db
        .collection("book")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      console.log(
        "-------------------------------entered into the creating the new products---------------"
      );
      //Logic to save or add new product
      dbOp = db.collection("book").insertOne(this);
    }
    return dbOp
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();

    return db
      .collection("book")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(productId) {
    const db = getDb();

    return db
      .collection("book")
      .find({ _id: new mongodb.ObjectId(productId) })
      .next()
      .then((product) => {
        console.log("The find By Id value=>>>");
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteProduct(productId) {
    const db = getDb();

    return db
      .collection("book")
      .deleteOne({ _id: new mongodb.ObjectId(productId) })
      .then((result) => {
        console.log("Product has been deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = Product;
