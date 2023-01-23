const express = require("express");
const { signup, signin } = require("../controllers/adminController");
const auth = require("../middlewares/auth");
const adminRouter = express.Router();

adminRouter.post("/signup",auth,signup);
adminRouter.post("/signin", signin);

module.exports = adminRouter;