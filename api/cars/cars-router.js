// DO YOUR MAGIC
const router = require('express').Router()
const Cars = require('./cars-model')

const {
    checkCarId,
} = require('./cars-middleware')

router.get('/', async (req, res, next) => {
    try {
        const data = await Cars.getAll()
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router;