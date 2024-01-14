const express = require("express");
const router = express.Router();


const userRouter = require("./useresRouts");

router.use("/users", userRouter);

module.exports = router;
