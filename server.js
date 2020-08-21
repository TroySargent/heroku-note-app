const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const app = express()
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(apiRoutes);
app.use(htmlRoutes);

const port = process.env.PORT || 8080;


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})