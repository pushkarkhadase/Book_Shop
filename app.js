const express = require("express");
const bodyParser = require("body-parser");
const mongoConnect = require("./util/database").mongoConnect;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const shopRoutes = require("./routes/shop");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(shopRoutes);

app.use((req, res, next) => {
  res.render("404.ejs");
});
// app.listen(3000);

mongoConnect(() => {
  app.listen(3000);
});
