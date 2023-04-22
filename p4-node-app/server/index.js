const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const testActivityCreationRouter = require("./routes/testActivityCreationRouter");
const userRouter = require("./routes/userRouter");
const recordRouter = require("./routes/recordRouter");
const summaryRouter = require("./routes/summaryRouter");
const quoteRouter = require("./routes/quoteRouter");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  next();
});

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/add", testActivityCreationRouter); //TODO: for testing only;to be remove before passing

app.use("/record", recordRouter);
app.use("/summary", summaryRouter);
app.use("/quote", quoteRouter);
app.use("/", userRouter);

app.use((req, res) =>
  res.status(404).json({ success: false, message: "Not Found" })
);

const startServer = async () => {
  try {
    // connect to mongoDB
    await mongoose.connect(process.env.MONGO_CONNECT);
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
