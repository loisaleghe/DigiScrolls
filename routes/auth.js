const express = require("express");

const { authorize } = require("../middleware");

const { login, register, currentUser } = require("../controllers/auth");

const router = express.Router();

// import controller methods

router.get("/currentUser", authorize, currentUser);

router.post("/register", register);

router.post("/login", login);

module.exports = router;
