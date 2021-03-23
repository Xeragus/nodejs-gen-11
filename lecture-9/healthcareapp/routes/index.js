var express = require('express');
var router = express.Router();

router
    .get('/', (req, res) => {
      res.render('index', { title: 'Express' });
    })
    .get('/doctors', async (req, res) => {
      res.render('doctors/index', { doctors: [] })
    })

module.exports = router;
