const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const auth = require('../middleware/auth')
const admin = require('../middleware/adminAuth')

router.route('/payment')
.get(auth,admin,paymentCtrl.getPayment)
.post(auth,paymentCtrl.createPayment)

module.exports = router