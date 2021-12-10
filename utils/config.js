require("dotenv").config();

const PORT = process.env.PORT;

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const PASS_SEC = process.env.PASS_SEC;
const JWT_SEC = process.env.JWT_SEC;

module.exports = {
  MONGODB_URI,
  PORT,
  PASS_SEC,
  JWT_SEC,
};
