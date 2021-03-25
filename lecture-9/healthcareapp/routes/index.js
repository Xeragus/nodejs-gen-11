var express = require('express');
var router = express.Router();
const Doctor = require('../models/doctor');

router
    .get('/', (req, res) => {
      res.render('index', { title: 'Express' });
    })
    .get('/doctors', async (req, res) => {
      const doctors = await Doctor.find();

      res.render('doctors/index', { doctors: doctors });
    })
    .get('/doctors/create', (req, res) => {
      res.render('doctors/create');
    })
    .get('/doctors/:id', async (req, res) => {
      const doctor = await Doctor.findById(req.params.id)

      res.render('doctors/update', doctor)
    })
    .post('/doctors', async (req, res) => {
      try {
        const doctor = new Doctor(req.body)
        await doctor.save()

        res.redirect('/doctors')
      } catch (error) {
        res.render('doctors/create', {
          ...req.body,
          error: error.message
        })
      }
    })
    .post('/doctors/:id', async (req, res) => {
      try {
        await Doctor.findByIdAndUpdate(req.params.id, req.body)

        res.redirect('/doctors')
      } catch (error) {
        res.render('doctors/update', {
          ...req.body,
          error: error.message
        })
      }
    })

module.exports = router;
