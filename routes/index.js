const express = require('express');
const router = express.Router();
const path = require('path');


/* GET Home Page */
router.get('/*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../dist') });
});


module.exports = router;
