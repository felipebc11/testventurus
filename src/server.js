const app = require('./app');
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "./config/.env")
});
const port = process.env.PORT;


app.listen(parseInt(port), () => console.info(`Server is running on port ${process.env.PORT}`));