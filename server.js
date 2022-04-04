const express = require("express");
const db = require("./config/connection");
const routes = require("./routes/index.js");

const PORT = 3001 || process.env.PORT;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API Listening on PORT: ${PORT}`);
  });
});
