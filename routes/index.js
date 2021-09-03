/** @format */

const express = require("express");
const router = express.Router();
const PaymentController = require("../controller/payementController");

router.post("/charge", PaymentController.addPayement);

module.exports = router;
