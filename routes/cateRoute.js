const router = require('express').Router()
const cateCtrl = require('../controllers/cateCtrl')
const auth = require('../middleware/auth')
const admin = require('../middleware/adminAuth')


router.route('/category')
    .get(cateCtrl.getCategories)
    .post(auth,admin,cateCtrl.createCategory)

router.route('/category/:id')
    .delete(auth,admin,cateCtrl.deleteCategory)
    .put(auth,admin,cateCtrl.updateCategory)

module.exports = router