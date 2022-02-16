const Cars = require('../cars/cars-model')
const db = require('../../data/db-config')

const checkCarId = async (req, res, next) => {
  try {
    const result = await Cars.getById(req.params.id)
    if (!result) {
      res.status(404).json({ message: `car with id ${result} is not found` })
    } else {
      req.result = result
      next()
    }
  } catch (err) {
    res.status(500).json({ message: 'request crashed' })
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = {
  checkCarId
}