require("dotenv/config");

require("express-async-errors");

const migrationsRun = require('./database/sqlite/migrations');

const AppError = require('./utils/AppError');

const uploadConfig = require("./configs/upload");

const express = require("express");

const routes = require("./routes");

migrationsRun();

const app = express();

const cors = require("cors");

app.use(express.json());

app.use(cors());

app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));

app.use(routes);

app.use(( error, request, response, next ) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

const PORT = process.env.SERVER_PORT || 3300;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));