const moment = require("moment");
const Product = require("../models/product");
const mongodb = require('mongodb');
const { search } = require("../routes/shop");
const ObjectId = mongodb.ObjectId;

exports.homePage = (req, res, next) => {
  res.render("home_page.ejs");
};

exports.productPage = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("products.ejs", { product_list: products });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addProducts = (req, res, next) => {
 
  res.render("addProducts.ejs", {editing_mode: false });
};

//module for add product logic for post request

exports.postAddProducts = (req, res, next) => {


  //Adding the dynamic date
  const date = moment(new Date()).format("YYYY/MM/DD");
  const price = req.body.bookCost;
  const imagesrc = req.body.bookImage;
  const name = req.body.bookName;
  const bookAuthors = req.body.bookAuthors;
  const bookDescription = req.body.bookDescription;
  const bookTotalPages = req.body.bookTotalPages;
  const publication = req.body.bookPublication;
  const publicationYear = req.body.bookPublicationYear;
  const bookReviews = {
    authorReview: req.body.bookReviews,
  };
  //creating the blue print to store as object
  const genre = {
    genreHorror: 0,
    genreTechnology: 0,
    genreRomance: 0,
    genreThriller: 0,
    genreComedy: 0,
    genreSciFi: 0,
    genreEncyclopedia: 0,
    genreMotivation: 0,
  };
  //as iterator
  let hold_left;
  //logic to make all the present key as 1 and absent key as 0
  for (hold_left in genre) {
    if (hold_left in req.body) {
      genre[hold_left] = 1;
    } else {
      genre[hold_left] = 0;
    }
  }
  product = new Product(
    name,
    imagesrc,
    bookDescription,
    bookAuthors,
    genre,
    bookTotalPages,
    price,
    date,
    bookReviews,
    publication,
    publicationYear
  );
  product
    .save()
    .then((result) => {
      console.log("Product have been created successfully");
      res.redirect("../");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;


  Product.findById(productId)
    .then((result) => {
      console.log("Find by ID");
      console.log(productId);
      res.render("addProducts.ejs", {editing_mode: true , productDetails: result});
      
    })
    .catch((err) => {
      console.log(err);
    });
  
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const productDate = req.body.productDate;
  const price = req.body.bookCost;
  const imagesrc = req.body.bookImage;
  const name = req.body.bookName;
  const bookAuthors = req.body.bookAuthors;
  const bookDescription = req.body.bookDescription;
  const bookTotalPages = req.body.bookTotalPages;
  const publication = req.body.bookPublication;
  const publicationYear = req.body.bookPublicationYear;
  const bookReviews = {
    authorReview: req.body.bookReviews,
  };
  //creating the blue print to store as object
  const genre = {
    genreHorror: 0,
    genreTechnology: 0,
    genreRomance: 0,
    genreThriller: 0,
    genreComedy: 0,
    genreSciFi: 0,
    genreEncyclopedia: 0,
    genreMotivation: 0,
  };
  //as iterator
  let hold_left;
  //logic to make all the present key as 1 and absent key as 0
  for (hold_left in genre) {
    if (hold_left in req.body) {
      genre[hold_left] = 1;
    } else {
      genre[hold_left] = 0;
    }
  }
  console.log('productID type =================================================================');
  console.log(productId);
  

  console.log('Creating the new product ========================================================');
  product = new Product(
    name,
    imagesrc,
    bookDescription,
    bookAuthors,
    genre,
    bookTotalPages,
    price,
    productDate,
    bookReviews,
    publication,
    publicationYear,
    new ObjectId(productId)
  );
 

  product.save().then(result => {
    console.log("Product has been edited successfully");
    res.redirect('/');
  }).catch(err => {
    console.log(err);
  });
}

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productId;
 

  Product.findById(productId)
    .then((result) => {
      let genre_list = [];
      if (result.bookGenre.genreHorror) {
        genre_list.push("Horror");
      }
      if (result.bookGenre.genreTechnology) {
        genre_list.push("Technology");
      }
      if (result.bookGenre.genreRamance) {
        genre_list.push("Romance");
      }
      if (result.bookGenre.genreThriller) {
        genre_list.push("Thriller");
      }
      if (result.bookGenre.genreComedy) {
        genre_list.push("Comedy");
      }
      if (result.bookGenre.genreSciFi) {
        genre_list.push("SciFi");
      }
      if (result.bookGenre.genreEncyclopedia) {
        genre_list.push("Encyclopedia");
      }
      if (result.bookGenre.genreMotivation) {
        genre_list.push("Motivation");
      }
      res.render("productDetails.ejs", {
        productDetails: result,
        genreList: genre_list,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDeleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  console.log(productId);
  Product.deleteProduct(productId);
  res.redirect('/products');
}


