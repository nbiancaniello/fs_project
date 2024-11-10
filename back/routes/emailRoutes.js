const express = require('express');
const router = express.Router();
const mailsController = require("../controllers/mailsController");

router.post('/sendEmail', mailsController.customerEmail, mailsController.proofEmail);

module.exports = router;