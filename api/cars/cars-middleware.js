const Cars = require('../cars/cars-model')
const db = require('../../data/db-config')
const vin = require('vin-validator')

const checkCarId = async (req, res, next) => {
  try {
    const result = await Cars.getById(req.params.id)
    if (!result) {
      res.status(404).json({ message: `car with id ${req.params.id} is not found` })
    } else {
      req.result = result
      next()
    }
  } catch (err) {
    res.status(500).json({ message: 'request crashed' })
  }
}

const checkCarPayload = async (req, res, next) => {
 const { vin, make, model, mileage } = req.body
 if (!vin || !make || !model || !mileage){
   res.status(400).json({ message: "vin, make, model, and mileage are all required fields." })
 } else {
   next()
 }
}

const checkVinNumberValid = (req, res, next) => {
  if(vin.validate(req.body.vin)) {
    next()
  } else {
    next({
      status: 400,
      message: `vin ${req.body.vin} is invalid`
    })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const exists = await db('cars').where('vin', req.body.vin).first()

    if(exists) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}