const router = require('express').Router()
const imageCtrl  = require('../controllers/imageCtrl')
const auth = require('../middleware/auth')
const admin = require('../middleware/adminAuth')

router.post('/uploadImage',imageCtrl.uploadImage)
router.post('/deleteImage',imageCtrl.deleteImage)

module.exports = router