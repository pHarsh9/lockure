const express = require('express')
const router = express.Router()
const { getPasswords, setPasswords, updatePasswords, deletePasswords } = require('../Controllers/passwordController')
const { protect } = require('../Middlewares/authMiddleware')


router.route('/').get(protect, getPasswords).post(protect, setPasswords)
router.route('/:id').put(protect, updatePasswords).delete(protect, deletePasswords)

module.exports = router